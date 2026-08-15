import { useEffect, useRef, useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Aspect-ratio utility, e.g. "aspect-[16/9]". Prevents layout shift. */
  aspect?: string;
  /** Skip lazy loading for above-the-fold hero images. */
  eager?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * Image with native lazy-loading, async decoding, a loading shimmer and a
 * graceful fallback so a missing Unsplash asset never leaves a broken image.
 */
export function SmartImage({
  src,
  alt,
  className = "",
  // Matches the typical publisher image ratio and prevents layout shift.
  aspect = "aspect-[950/756]",
  eager = false,
  sizes,
  width = 950,
  height = 756,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${aspect} ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden="true" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        sizes={sizes}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setFailed(true);
          setLoaded(true);
        }}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded && !failed ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
