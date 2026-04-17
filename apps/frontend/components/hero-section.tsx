"use client";

import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate hero title spans with stagger
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Animate hero description
      gsap.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });

      // Animate CTA button
      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });

      // Parallax effect for video background
      gsap.to(".hero-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        ease: "none",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_2fr] md:pt-17.5 min-h-screen"
    >
      {/* Text content - Left column (1/3) */}
      <div className="flex flex-col justify-center p-8 md:p-24 bg-background order-1 md:order-1 min-h-screen md:min-h-[calc(100vh-70px)]">
        <div className="max-w-2xl text-left">
          <h1 className="hero-title font-newsreader text-6xl md:text-6xl lg:text-[86px] font-normal leading-tight mb-8 tracking-tight text-foreground overflow-hidden">
            <span className="block">{t.hero.titleBefore}</span>
            <span className="block text-secondary italic">
              {t.hero.titleHighlight}
            </span>
            <span className="block">{t.hero.titleAfter}</span>
          </h1>

          <p className="hero-description text-base md:text-lg text-foreground/70 font-extralight mb-12 leading-relaxed">
            {t.hero.description}
          </p>

          <div className="hero-cta">
            <Link href="/collections">
              <Button variant="primary" size="lg" className="font-semibold">
                {t.hero.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Background - Right column (2/3) */}
      <div className="relative min-h-[60vh] md:h-[calc(100vh-85px)] order-2 md:order-2 rounded-lg overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-image w-full h-full object-cover"
        >
          <source src="/video/hero-background.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
