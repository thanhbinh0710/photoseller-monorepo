"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger, Draggable);

const galleryImages = [
  {
    id: 1,
    src: "/feature-img-1.jpg",
    title: "Featured Work 1",
    titleVi: "Tác Phẩm Nổi Bật 1",
    price: "$250",
    width: 1280,
    height: 960,
  },
  {
    id: 2,
    src: "/feature-img-2.jpg",
    title: "Featured Work 2",
    titleVi: "Tác Phẩm Nổi Bật 2",
    price: "$320",
    width: 1280,
    height: 960,
  },
  {
    id: 3,
    src: "/feature-img-3.jpg",
    title: "Featured Work 3",
    titleVi: "Tác Phẩm Nổi Bật 3",
    price: "$280",
    width: 1280,
    height: 960,
  },
  {
    id: 4,
    src: "/feature-img-4.jpg",
    title: "Featured Work 4",
    titleVi: "Tác Phẩm Nổi Bật 4",
    price: "$195",
    width: 854,
    height: 1280,
  },
  {
    id: 5,
    src: "/feature-img-5.jpg",
    title: "Featured Work 5",
    titleVi: "Tác Phẩm Nổi Bật 5",
    price: "$350",
    width: 1280,
    height: 854,
  },
  {
    id: 6,
    src: "/feature-img-6.jpg",
    title: "Featured Work 6",
    titleVi: "Tác Phẩm Nổi Bật 6",
    price: "$290",
    width: 1280,
    height: 720,
  },
  {
    id: 7,
    src: "/feature-img-7.jpg",
    title: "Featured Work 7",
    titleVi: "Tác Phẩm Nổi Bật 7",
    price: "$310",
    width: 1280,
    height: 960,
  },
  {
    id: 8,
    src: "/feature-img-8.jpg",
    title: "Featured Work 8",
    titleVi: "Tác Phẩm Nổi Bật 8",
    price: "$275",
    width: 1280,
    height: 960,
  },
];

export function FeaturedGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryInnerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const gallery = galleryInnerRef.current;
    if (!gallery) return;

    const currentX = gsap.getProperty(gallery, "x") as number;
    setCanScrollLeft(currentX < 0);
    setCanScrollRight(
      currentX > -(gallery.scrollWidth - window.innerWidth) + 50,
    );
  };

  const handlePrev = () => {
    const gallery = galleryInnerRef.current;
    if (!gallery) return;

    const currentX = gsap.getProperty(gallery, "x") as number;
    const itemWidth = gallery.children[0]?.getBoundingClientRect().width || 500;
    const gap = 24;
    const targetX = currentX + itemWidth + gap;

    gsap.to(gallery, {
      x: Math.min(targetX, 0),
      duration: 0.6,
      ease: "power2.out",
      onComplete: updateScrollButtons,
    });
  };

  const handleNext = () => {
    const gallery = galleryInnerRef.current;
    if (!gallery) return;

    const currentX = gsap.getProperty(gallery, "x") as number;
    const itemWidth = gallery.children[0]?.getBoundingClientRect().width || 500;
    const gap = 24;
    const maxScroll = -(gallery.scrollWidth - window.innerWidth);
    const targetX = currentX - itemWidth - gap;

    gsap.to(gallery, {
      x: Math.max(targetX, maxScroll),
      duration: 0.6,
      ease: "power2.out",
      onComplete: updateScrollButtons,
    });
  };

  useGSAP(
    () => {
      const gallery = galleryInnerRef.current;
      if (!gallery) return;

      const container = gallery.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const scrollWidth = gallery.scrollWidth;
      const maxScroll = scrollWidth - containerWidth;

      Draggable.create(gallery, {
        type: "x",
        inertia: true,
        edgeResistance: 0.75,
        activeCursor: "grabbing",
        bounds: { minX: -maxScroll, maxX: 0 },
        onDragEnd: updateScrollButtons,
      });

      updateScrollButtons();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-20 md:py-24 bg-background overflow-hidden"
    >
      {/* Title Section */}
      <div className="max-w-6xl mx-auto px-6 mb-12 justify-center text-center">
        <h2 className="text-2xl md:text-3xl font-light font-newsreader tracking-tight px-4 py-2 text-background bg-foreground inline-block">
          {t.gallery.title1} {t.gallery.title2}
        </h2>
      </div>

      {/* Gallery with Navigation */}
      <div className="relative flex items-center justify-center gap-4 px-6">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={!canScrollLeft}
          className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
            canScrollLeft
              ? "bg-foreground text-background hover:bg-secondary cursor-pointer"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          }`}
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Gallery Container */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing flex-1">
          <div
            ref={galleryInnerRef}
            className="flex gap-6 md:gap-8 px-6 md:px-12 w-max"
            style={{ willChange: "transform" }}
          >
            {galleryImages.map((image) => (
              <Link
                key={image.id}
                href={`/products/${image.id}`}
                className="group relative flex-shrink-0 h-[500px] md:h-[600px] overflow-hidden bg-muted"
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={language === "vi" ? image.titleVi : image.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {hoveredId === image.id && (
                  <div className="absolute bottom-4 left-4 z-10">
                    <p className="text-white text-sm md:text-base font-semibold bg-black/60 px-3 py-2 rounded">
                      {image.price}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!canScrollRight}
          className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
            canScrollRight
              ? "bg-foreground text-background hover:bg-secondary cursor-pointer"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          }`}
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* View All Button */}
      <div className="max-w-6xl mx-auto px-6 mt-12 text-center">
        <Link href="/collections">
          <Button variant="outline" size="lg">
            {language === "vi" ? "Xem tất cả" : "View All"}
          </Button>
        </Link>
      </div>
    </section>
  );
}
