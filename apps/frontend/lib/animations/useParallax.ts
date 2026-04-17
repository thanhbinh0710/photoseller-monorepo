/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxOptions {
  selector: string;
  offset?: number; // pixels to move
  scrub?: boolean | number; // smooth scrub value
  triggerElement?: string;
}

/**
 * Hook for parallax scroll effects
 * Moves elements at a different rate than scroll
 */
export function useParallax({
  selector,
  offset = 200,
  scrub = true,
  triggerElement,
}: UseParallaxOptions) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current.querySelector(selector) as HTMLElement;
    if (!element) return;

    const trigger = triggerElement
      ? containerRef.current.querySelector(triggerElement)
      : containerRef.current;

    if (!trigger) return;

    const animation = gsap.to(element, {
      y: offset,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top top",
        end: "bottom top",
        scrub: scrub === true ? 1 : scrub,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [selector, offset, scrub, triggerElement]);

  return containerRef;
}
