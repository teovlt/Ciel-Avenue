import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

    // Anchor links such as "/#faq": scroll to the section once it is rendered
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior }));
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior });
  }, [pathname, hash]);

  return null;
}
