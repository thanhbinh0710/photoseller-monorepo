"use client";

import { useLanguage } from "@/lib/language-context";

const collections = [
  {
    id: 1,
    nameKey: "portraits",
    count: 24,
    image: "/vintage-portrait-photography-collection-dark-artis.jpg",
  },
  {
    id: 2,
    nameKey: "landscapes",
    count: 18,
    image: "/vintage-landscape-photography-nature-sepia-atmosph.jpg",
  },
  {
    id: 3,
    nameKey: "street",
    count: 32,
    image: "/vintage-street-photography-urban-noir-film.jpg",
  },
  {
    id: 4,
    nameKey: "stillLife",
    count: 15,
    image: "/vintage-still-life-photography-objects-moody-dark.jpg",
  },
];

export function CollectionsSection() {
  const { t } = useLanguage();

  return (
    <section id="collections" className="py-28 md:py-36 px-6 my-12 md:my-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest text-muted-foreground mb-4 uppercase">
            {t.collections.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            {t.collections.title1} {t.collections.title2}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((collection) => {
            const name =
              t.collections.categories[
                collection.nameKey as keyof typeof t.collections.categories
              ];
            return (
              <a
                key={collection.id}
                href={`#${collection.nameKey.toLowerCase()}`}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-xl font-light tracking-wide mb-1">
                    {name}
                  </h3>
                  <p className="text-xs opacity-80">
                    {collection.count} {t.collections.prints}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
