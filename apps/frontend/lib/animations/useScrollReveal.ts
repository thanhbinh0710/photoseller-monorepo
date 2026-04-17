/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealOptions {
  selector: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  triggerStart?: string;
}

/**
 * Hook for scroll-triggered fade-in animations
 * Reveals elements as they enter the viewport
 */
export function useScrollReveal({
  selector,
  stagger = 0.2,
  duration = 1,
  delay = 0,
  ease = "power3.out",
  triggerStart = "top 80%",
}: UseScrollRevealOptions) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const animations = gsap.from(elements, {
      y: 50,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: containerRef.current,
        start: triggerStart,
        toggleActions: "play none none none",
      },
    });

    return () => {
      animations.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector, stagger, duration, delay, ease, triggerStart]);

  return containerRef;
}
