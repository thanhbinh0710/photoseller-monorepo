"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    id: 1,
    src: "/vintage-portrait-photography-black-and-white-woman.jpg",
    title: "Portrait in Light",
    titleVi: "Chân Dung Trong Ánh Sáng",
    price: "$250",
    category: "Portraits",
    categoryVi: "Chân Dung",
  },
  {
    id: 2,
    src: "/vintage-landscape-photography-mountains-sepia-tone.jpg",
    title: "Mountain Solitude",
    titleVi: "Cô Độc Núi Rừng",
    price: "$320",
    category: "Landscapes",
    categoryVi: "Phong Cảnh",
  },
  {
    id: 3,
    src: "/vintage-street-photography-urban-noir-film-grain.jpg",
    title: "Urban Shadows",
    titleVi: "Bóng Tối Đô Thị",
    price: "$280",
    category: "Street",
    categoryVi: "Đường Phố",
  },
  {
    id: 4,
    src: "/vintage-still-life-photography-flowers-dark-moody.jpg",
    title: "Fading Blooms",
    titleVi: "Hoa Tàn Phai",
    price: "$195",
    category: "Still Life",
    categoryVi: "Tĩnh Vật",
  },
  {
    id: 5,
    src: "/vintage-architecture-photography-building-classica.jpg",
    title: "Classical Lines",
    titleVi: "Đường Nét Cổ Điển",
    price: "$350",
    category: "Architecture",
    categoryVi: "Kiến Trúc",
  },
  {
    id: 6,
    src: "/vintage-nature-photography-forest-misty-atmospheri.jpg",
    title: "Misty Forest",
    titleVi: "Rừng Sương Mù",
    price: "$290",
    category: "Nature",
    categoryVi: "Thiên Nhiên",
  },
  {
    id: 7,
    src: "/vintage-ocean-photography-waves-dramatic-black-whi.jpg",
    title: "Eternal Waves",
    titleVi: "Sóng Vĩnh Cửu",
    price: "$310",
    category: "Nature",
    categoryVi: "Thiên Nhiên",
  },
  {
    id: 8,
    src: "/vintage-cafe-photography-interior-moody-film.jpg",
    title: "Parisian Cafe",
    titleVi: "Quán Cà Phê Paris",
    price: "$275",
    category: "Street",
    categoryVi: "Đường Phố",
  },
];

export function FeaturedGallery() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      checkScroll();
      slider.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        slider.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#05090c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest text-muted-foreground mb-4 uppercase">
            {t.gallery.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            {t.gallery.title1} {t.gallery.title2}
          </h2>
        </div>
      </div>

      <div className="relative group/slider">
        {/* Navigation Buttons - Minimal style */}
        {canScrollLeft && (
          <Button
            onClick={() => scroll("left")}
            variant="outline"
            size="icon"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
        {canScrollRight && (
          <Button
            onClick={() => scroll("right")}
            variant="outline"
            size="icon"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {/* Horizontal Slider */}
        <div
          ref={sliderRef}
          className="flex gap-16 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryImages.map((image) => (
            <Link
              key={image.id}
              href={`/products/${image.id}`}
              className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer snap-center"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={language === "vi" ? image.titleVi : image.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Info - Only show price */}
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{image.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mt-12">
          <Link href="/collections">
            <Button variant="outline" size="lg">
              {language === "vi" ? "Xem tất cả" : "View All"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
