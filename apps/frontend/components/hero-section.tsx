"use client";

import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-start pt-40 md:pt-48 px-6 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero-background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto">
        {/* Text content - Left aligned */}
        <div className="max-w-2xl text-left ml-12 md:ml-20 lg:ml-32">
          <h1 className="font-newsreader text-4xl md:text-6xl lg:text-8xl font-extralight leading-tight mb-8 tracking-tight text-foreground italic">
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h1>

          <p className="text-base md:text-lg text-foreground/70 font-extralight mb-12 leading-relaxed">
            {t.hero.description}
          </p>

          <div>
            <Link href="/collections">
              <Button variant="primary" size="lg" className="font-semibold">
                SHOP THE COLLECTION
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ArrowDown
          className="text-muted-foreground-white animate-bounce"
          size={20}
        />
      </div>
    </section>
  );
}
