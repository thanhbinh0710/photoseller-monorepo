"use client";
export default function QuoteSection() {
  return (
    <section className="py-[132px] md:py-[164px] bg-primary text-background overflow-hidden relative my-12 md:my-20 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      <div className="px-8 md:px-16 flex flex-col justify-center">
        <blockquote className="font-newsreader text-4xl md:text-7xl italic leading-tight tracking-tight text-balanced">
          "Photography is not about documenting the world, but about capturing
          the way it feels when the light hits it just right."
        </blockquote>
      </div>
      <div className="relative min-h-[300px] md:min-h-full order-first md:order-last">
        <img
          src="/quote-bg.PNG"
          alt="Quote section background"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
