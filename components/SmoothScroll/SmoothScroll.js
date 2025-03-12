"use client";
import { Lenis, ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

function SmoothScroll({ children }) {
  const lenisRef = useRef();
  const pathname = usePathname();
  const isLightBoxOpen = useSelector((state) => state.common.isLightBoxOpen);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);

      if (typeof window !== "undefined" && window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }

      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.05, smoothTouch: true }}
      autoRaf={!isLightBoxOpen}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
