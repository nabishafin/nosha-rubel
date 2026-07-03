import { useEffect, useRef, useState } from "react";
import { fallbackImage } from "~/lib/images";

interface SmartImageProps {
  src: string;
  alt: string;
  /** Seed for the deterministic fallback if the primary image fails. */
  fallbackSeed: string;
  className?: string;
  /** Aspect-ratio utility, e.g. "aspect-[16/9]". Prevents layout shift. */
  aspect?: string;
  /** Skip lazy loading for above-the-fold hero images. */
  eager?: boolean;
  sizes?: string;
}

/**
 * Image with native lazy-loading, async decoding, a loading shimmer and a
 * graceful fallback so a missing Unsplash asset never leaves a broken image.
 */
export function SmartImage({
  src,
  alt,
  fallbackSeed,
  className = "",
  // Matches the ratio of the shared common.jpeg (950×756) so cards fill with
  // no crop and no empty bars.
  aspect = "aspect-[950/756]",
  eager = false,
  sizes,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const finalSrc = failed ? fallbackImage(fallbackSeed) : src;

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [finalSrc]);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${aspect} ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden="true" />}
      <img
        ref={imgRef}
        src={finalSrc}
        alt={alt}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) setFailed(true);
          else setLoaded(true);
        }}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
