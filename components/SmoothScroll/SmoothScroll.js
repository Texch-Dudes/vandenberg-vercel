"use client";
import { Lenis, ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

function SmoothScroll({ children }) {
  const lenisRef = useRef();
  const pathname = usePathname();
  const isLightBoxOpen = useSelector((state) => state.common.isLightBoxOpen);
  const prevPathRef = useRef(pathname);

  // ✅ Properly handling page transitions with smooth reset
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      requestAnimationFrame(() => {
        lenisRef.current?.lenis?.scrollTo(0, { duration: 0.6, easing: (t) => t * (2 - t) });
      });

      if (typeof window !== "undefined" && window.ScrollTrigger) {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }

      prevPathRef.current = pathname;
    }
  }, [pathname]);

  // ✅ Ensuring Lenis is properly started
  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.start();
    }
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,       // ✅ Smoothness level (higher = smoother)
        smooth: true,     // ✅ Enable smooth scrolling
        smoothTouch: 0.1, // ✅ Smooth scrolling on touch devices
      }}
      autoRaf={true} // ✅ Let Lenis handle its own animation frame
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
