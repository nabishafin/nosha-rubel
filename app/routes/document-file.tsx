import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { DOCUMENTS } from "~/components/DocumentArchive";
import { isLanguageCode } from "~/lib/languages";
import type { Route } from "./+types/document-file";

export async function loader({ params }: Route.LoaderArgs) {
  if (!isLanguageCode(params.lang)) throw new Response("Not Found", { status: 404 });
  const document = DOCUMENTS.find((item) => item.id === params.docId);
  if (!document) throw new Response("Document Not Found", { status: 404 });

  const documentRoot = resolve(process.cwd(), "storage", "documents");
  const filePath = resolve(documentRoot, document.filename);
  if (!filePath.startsWith(`${documentRoot}${sep}`)) throw new Response("Invalid document path", { status: 400 });

  let body: Uint8Array;
  try {
    body = await readFile(filePath);
  } catch {
    throw new Response("Document Not Found", { status: 404 });
  }

  const responseBody = new Uint8Array(body.byteLength);
  responseBody.set(body);
  return new Response(responseBody.buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(document.filename)}`,
      "Content-Length": String(body.byteLength),
      "Cache-Control": "public, max-age=86400",
      "X-Robots-Tag": "noindex, noarchive",
    },
  });
}
