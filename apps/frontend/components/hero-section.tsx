"use client";

import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-32 px-6 overflow-hidden">
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
            <Link
              href="/collections"
              className="inline-block border border-foreground bg-foreground px-8 py-3 text-sm tracking-widest text-background hover:bg-background hover:text-foreground transition-all duration-300 uppercase"
            >
              SHOP THE COLLECTION
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
