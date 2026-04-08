"use client";

import { useLanguage } from "@/lib/language-context";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-24 md:py-32 px-6 bg-[#05090c]"
    >
      <div className="max-w-[110rem] mx-auto w-full">
        {/* Section Title */}
        <div className="mb-16 border border-foreground w-fit px-6 py-3 bg-foreground">
          <h2 className="font-newsreader text-4xl md:text-5xl font-light tracking-tight text-background">
            {t.about.sectionTitle}
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Image - 60% width (3 columns) */}
          <div className="relative md:col-span-3">
            <img
              src="./about_banner.jpg"
              alt="The artist"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Content - 40% width (2 columns) */}
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest text-muted-foreground mb-4 uppercase">
              {t.about.subtitle}
            </p>
            <h2 className="font-newsreader text-5xl md:text-[45px] font-light mb-8 tracking-tight italic">
              {t.about.title1}&nbsp;{t.about.title2}
              <br />
              {t.about.title3}
            </h2>
            <div className="space-y-5 leading-relaxed text-[20px] italic text-[#a2a8af]">
              <p>{t.about.p1}</p>

              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="mt-10 flex gap-12">
              <div>
                <p className="font-newsreader text-xl font-light italic ">
                  — Nguyễn Lê Trung Kiên
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
