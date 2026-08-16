import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

/** Restores a meaningful focus target and announces enhanced route changes. */
export function RouteAccessibility() {
  const location = useLocation();
  const previousKey = useRef(location.key);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (previousKey.current === location.key) return;
    previousKey.current = location.key;

    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
    setAnnouncement(document.title);
  }, [location.key]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {announcement}
    </div>
  );
}
