import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offsetTop = 120): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length) return;

    const handler = () => {
      const scrollPos = window.scrollY + offsetTop;
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (scrollPos >= top) current = id;
      }

      setActive(current ?? ids[0]);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids, offsetTop]);

  return active;
}
