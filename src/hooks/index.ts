import { useState, useEffect, useRef } from "react";

const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);
  const isManualScroll = useRef(false);

  useEffect(() => {
    if (sectionIds.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -35% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const handleScroll = () => {
      if (isManualScroll.current) return;

      const NAVBAR_HEIGHT = 90;
      let closestId = sectionIds[0];
      let closestDistance = Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distanceFromTop = Math.abs(rect.top - NAVBAR_HEIGHT);
        if (rect.top <= NAVBAR_HEIGHT + 10 && distanceFromTop < closestDistance) {
          closestDistance = distanceFromTop;
          closestId = id;
        }
      });

      setActiveSection(closestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
};

const useScrollY = (): number => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollY;
};

export { useActiveSection, useScrollY };