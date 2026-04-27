/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that enables smooth scroll via GSAP ScrollSmoother
 * Applies to all pages except auth pages (login, register, profile)
 */
export function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Disable smooth scroll on auth pages and dashboard
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/dashboard");

  useGSAP(
    () => {
      // Only initialize ScrollSmoother on non-auth pages
      if (!isAuthPage) {
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1,
          effects: true,
        });

        // Nav animation - slide down and fade in
        gsap.from("nav", {
          y: -100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5,
        });

        return () => {
          smoother.kill();
        };
      }
    },
    { scope: containerRef, dependencies: [isAuthPage] },
  );

  // On auth pages, render without smooth scroll
  if (isAuthPage) {
    return <>{children}</>;
  }

  // On other pages, wrap with smooth scroll structure
  return (
    <div id="smooth-wrapper" ref={containerRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
