"use client";
export default function SecondaryHero() {
  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 my-12 md:my-20">
      <div className="relative min-h-[50vh] md:min-h-screen order-1 md:order-1 bg-accent/20">
        <img
          alt="Secondary hero background"
          className="w-full h-full object-cover"
          src="/second-hero-bg.PNG"
        />
        <div className="absolute inset-0 bg-accent/10 pointer-events-none"></div>
      </div>
      <div className="flex flex-col justify-center p-8 md:p-24 bg-background order-2 md:order-2">
        <h1 className="font-newsreader text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-primary-text text-balance italic">
          "The earth has music for those who listen, and colors for those who
          dare to see."
        </h1>
      </div>
    </section>
  );
}
