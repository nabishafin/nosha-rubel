import { PassThrough } from "node:stream";
import { randomBytes } from "node:crypto";
import { createReadableStreamFromReadable } from "@react-router/node";
import type { EntryContext, RouterContextProvider } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";

export const streamTimeout = 5_000;

function applySecurityPolicy(request: Request, headers: Headers, nonce: string) {
  const policy = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: https:",
    "media-src 'self'",
    "connect-src 'self'",
    "frame-src https://www.youtube-nocookie.com",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
  ].join("; ");

  headers.set("Content-Security-Policy", policy);
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("Permissions-Policy", "camera=(), geolocation=(), microphone=(), payment=(), usb=(), browsing-topics=()");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  headers.set("Origin-Agent-Cluster", "?1");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");

  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",", 1)[0]?.trim();
  if (new URL(request.url).protocol === "https:" || forwardedProtocol === "https") {
    headers.set("Strict-Transport-Security", "max-age=31536000");
  }
}

function applyResponsePolicy(status: number, headers: Headers) {
  if (status >= 400) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
    headers.set("Cache-Control", "private, no-store");
  } else if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=86400");
  }
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: RouterContextProvider,
) {
  const nonce = randomBytes(18).toString("base64");
  const url = new URL(request.url);
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    const redirectHeaders = new Headers({
      Location: `${url.pathname}${url.search}`,
      "Cache-Control": "public, max-age=3600",
    });
    applySecurityPolicy(request, redirectHeaders, nonce);
    return new Response(null, {
      status: 301,
      headers: redirectHeaders,
    });
  }

  applyResponsePolicy(responseStatusCode, responseHeaders);
  applySecurityPolicy(request, responseHeaders, nonce);

  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, { status: responseStatusCode, headers: responseHeaders });
  }

  return new Promise<Response>((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");
    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId: ReturnType<typeof setTimeout> | undefined = setTimeout(
      () => abort(),
      streamTimeout + 1000,
    );

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} nonce={nonce} />,
      {
        nonce,
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = undefined;
              callback();
            },
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html; charset=utf-8");
          applyResponsePolicy(responseStatusCode, responseHeaders);
          pipe(body);
          resolve(new Response(stream, { headers: responseHeaders, status: responseStatusCode }));
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          applyResponsePolicy(responseStatusCode, responseHeaders);
          if (shellRendered) console.error(error);
        },
      },
    );
  });
}
