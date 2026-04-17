/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseHorizontalScrollOptions {
  containerSelector: string;
  contentSelector: string;
  scrub?: number;
}

/**
 * Hook for horizontal scroll animation
 * Pins container and scrolls content horizontally
 */
export function useHorizontalScroll({
  containerSelector,
  contentSelector,
  scrub = 1,
}: UseHorizontalScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current.querySelector(
      containerSelector,
    ) as HTMLElement;
    const content = containerRef.current.querySelector(
      contentSelector,
    ) as HTMLElement;

    if (!container || !content) return;

    const animation = gsap.to(content, {
      x: () => -(content.scrollWidth - window.innerWidth) || 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${content.scrollWidth - window.innerWidth}`,
        scrub,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [containerSelector, contentSelector, scrub]);

  return containerRef;
}
