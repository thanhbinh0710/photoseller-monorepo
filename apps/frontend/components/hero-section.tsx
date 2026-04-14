"use client";

import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-[1fr_2fr] pt-[70px] pb-12 md:pb-20">
      {/* Text content - Left column (1/3) */}
      <div className="flex flex-col justify-center p-8 md:p-24 bg-background order-1 md:order-1 min-h-screen md:min-h-[calc(100vh-70px)]">
        <div className="max-w-2xl text-left">
          <h1 className="font-newsreader text-6xl md:text-6xl lg:text-[86px] font-normal leading-tight mb-8 tracking-tight text-foreground ">
            <span>{t.hero.titleBefore}</span>
            <span className="text-secondary italic">
              {t.hero.titleHighlight}
            </span>
            <br />
            <span>{t.hero.titleAfter}</span>
          </h1>

          <p className="text-base md:text-lg text-foreground/70 font-extralight mb-12 leading-relaxed">
            {t.hero.description}
          </p>

          <div>
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
          className="w-full h-full object-cover"
        >
          <source src="/video/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ArrowDown
          className="text-muted-foreground-white animate-bounce"
          size={20}
        />
      </div>
    </section>
  );
}
