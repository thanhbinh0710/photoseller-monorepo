"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Solitude",
    artist: "Minh Nguyen",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
  },
  {
    id: 2,
    name: "Mountain Dawn",
    artist: "Hoang Tran",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
  },
  {
    id: 3,
    name: "Urban Echo",
    artist: "Minh Nguyen",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
  },
  {
    id: 4,
    name: "Fading Blooms",
    artist: "Lan Pham",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
  },
  {
    id: 5,
    name: "Grand Facade",
    artist: "Hoang Tran",
    price: 38,
    originalPrice: 55,
    discount: 30,
    image: "/about_banner.jpg",
  },
  {
    id: 6,
    name: "Misty Forest",
    artist: "Lan Pham",
    price: 42,
    originalPrice: 60,
    discount: 30,
    image: "/about_banner.jpg",
  },
  {
    id: 7,
    name: "Ocean Waves",
    artist: "Minh Nguyen",
    price: 36,
    originalPrice: 52,
    discount: 30,
    image: "/about_banner.jpg",
  },
  {
    id: 8,
    name: "Café Noir",
    artist: "Hoang Tran",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
  },
];

const colors = [
  { name: "warm", color: "#e8cbc0" },
  { name: "neutral", color: "#a89e90" },
  { name: "cool", color: "#8b9db0" },
  { name: "dark", color: "#3d3d3d" },
  { name: "sepia", color: "#c9a876" },
  { name: "muted", color: "#9b9b9b" },
  { name: "light", color: "#d4d4d4" },
];

export default function ShopContent() {
  const { t } = useLanguage();
  const [sortOpen, setSortOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    collections: string[];
    colorTone: string[];
    orientation: string[];
    size: string[];
  }>({
    collections: [],
    colorTone: [],
    orientation: [],
    size: [],
  });
  const [priceRange, setPriceRange] = useState([20, 500]);
  const sortRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate product grid items on scroll
      gsap.from(".product-item", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: gridRef },
  );

  const collections = [
    "All Collections",
    "Landscape",
    "Portrait",
    "Abstract",
    "Architecture",
    "Nature",
    "Street",
  ];
  const orientations = ["All", "Portrait", "Landscape", "Square"];
  const sizes = ["All Sizes", "30x40 cm", "40x50 cm", "50x70 cm", "60x80 cm"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFilter = (
    filterType: keyof typeof selectedFilters,
    value: string,
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const isFilterSelected = (
    filterType: keyof typeof selectedFilters,
    value: string,
  ) => {
    return selectedFilters[filterType].includes(value);
  };

  const resetFilters = () => {
    setSelectedFilters({
      collections: [],
      colorTone: [],
      orientation: [],
      size: [],
    });
    setPriceRange([20, 500]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-neutral-800 px-4 py-12 md:py-16">
        <div className="max-w-[1800px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest text-white uppercase">
            PRINTS
          </h1>
          <p className="text-neutral-400 mt-4 text-sm tracking-wide">
            Museum-quality fine art prints on premium archival paper.
          </p>
        </div>
      </div>

      {/* Horizontal Filters */}
      <div className="sticky top-[70px] border-b border-primary-900 bg-background/80 backdrop-blur-lg px-4 py-3 z-30">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {/* Product Count */}
            <span className="text-xs text-neutral-400 tracking-wide mr-4">
              {products.length} products
            </span>

            {/* Category/Collection Filter */}
            <div className="relative group">
              <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer border border-primary-500 px-3 py-1 rounded-2xl">
                Category
                <ChevronDown size={14} strokeWidth={1.5} />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-700 rounded shadow-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => toggleFilter("collections", collection)}
                    className={`w-full px-4 py-2 text-left text-xs transition-colors ${
                      isFilterSelected("collections", collection)
                        ? "text-white bg-neutral-800"
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Tone Filter */}
            <div className="relative group">
              <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer border border-primary-500 px-3 py-1 rounded-2xl">
                Color tone
                <ChevronDown size={14} strokeWidth={1.5} />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-700 rounded shadow-lg py-3 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 w-48">
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleFilter("colorTone", color.name)}
                      className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                        isFilterSelected("colorTone", color.name)
                          ? "border-neutral-200 ring-2 ring-neutral-600"
                          : "border-neutral-700 hover:border-neutral-600"
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Orientation Filter */}
            <div className="relative group">
              <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer border border-primary-500 px-3 py-1 rounded-2xl">
                Orientation
                <ChevronDown size={14} strokeWidth={1.5} />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-700 rounded shadow-lg py-3 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 w-40">
                <div className="flex gap-3">
                  {["Portrait", "Landscape", "Square"].map((orientation) => (
                    <button
                      key={orientation}
                      onClick={() =>
                        toggleFilter("orientation", orientation.toLowerCase())
                      }
                      className={`flex-1 h-12 border-2 rounded transition-all cursor-pointer text-xs ${
                        isFilterSelected(
                          "orientation",
                          orientation.toLowerCase(),
                        )
                          ? "border-neutral-200 bg-neutral-800"
                          : "border-neutral-700 hover:border-neutral-600"
                      }`}
                      title={orientation}
                    >
                      {orientation}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Size Filter */}
            <div className="relative group">
              <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer border border-primary-500 px-3 py-1 rounded-2xl">
                Size
                <ChevronDown size={14} strokeWidth={1.5} />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-700 rounded shadow-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleFilter("size", size)}
                    className={`w-full px-4 py-2 text-left text-xs transition-colors ${
                      isFilterSelected("size", size)
                        ? "text-white bg-neutral-800"
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="relative group">
              <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer border border-primary-500 px-3 py-1 rounded-2xl">
                Sort by: Newest
                <ChevronDown size={14} strokeWidth={1.5} />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-neutral-900 border border-neutral-700 rounded shadow-lg py-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {[
                  "Featured",
                  "Newest",
                  "Price: Low to High",
                  "Price: High to Low",
                ].map((sort) => (
                  <button
                    key={sort}
                    className="w-full px-4 py-2 text-left text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition-colors cursor-pointer"
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width Grid */}
      <div className="max-w-[1800px] mx-auto px-4 py-12">
        <div ref={gridRef}>
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-32">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-item group cursor-pointer"
              >
                <Link href={`/products/${product.id}`} className="block">
                  {/* Product Image with Hover Heart */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-4 group">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-black/60">
                      <Heart
                        size={16}
                        className="text-white"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-sm text-white font-light">
                        ${product.price}
                      </span>
                      <span className="text-xs text-neutral-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">{product.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 pt-8 border-t border-neutral-800 flex items-center justify-center gap-2">
            <button className="w-10 h-10 rounded border border-neutral-700 text-neutral-400 hover:border-neutral-300 hover:text-white transition-colors text-sm cursor-pointer">
              {"<"}
            </button>
            <button className="w-10 h-10 rounded border border-neutral-300 bg-neutral-800 text-white font-light text-sm cursor-pointer">
              1
            </button>
            <button className="w-10 h-10 rounded border border-neutral-700 text-neutral-400 hover:border-neutral-300 hover:text-white transition-colors text-sm cursor-pointer">
              2
            </button>
            <button className="w-10 h-10 rounded border border-neutral-700 text-neutral-400 hover:border-neutral-300 hover:text-white transition-colors text-sm cursor-pointer">
              3
            </button>
            <span className="text-neutral-500 text-sm">...</span>
            <button className="w-10 h-10 rounded border border-neutral-700 text-neutral-400 hover:border-neutral-300 hover:text-white transition-colors text-sm cursor-pointer">
              8
            </button>
            <button className="w-10 h-10 rounded border border-neutral-700 text-neutral-400 hover:border-neutral-300 hover:text-white transition-colors text-sm cursor-pointer">
              {">"}
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {sortOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setSortOpen(false);
          }}
        />
      )}
    </div>
  );
}
