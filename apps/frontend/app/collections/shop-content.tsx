"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

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
    <div className="min-h-screen bg-neutral-950 pt-[70px]">
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

      {/* Main Content - Sidebar + Grid */}
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-56 flex-shrink-0">
            <div className="sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
                <h2 className="text-xs font-semibold tracking-widest text-white uppercase">
                  FILTERS
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
                >
                  Reset all
                </button>
              </div>

              {/* Collection Filter */}
              <div className="mb-8 pb-8 border-b border-neutral-800">
                <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
                  COLLECTION
                </h3>
                <div className="space-y-3">
                  {collections.map((collection) => (
                    <label
                      key={collection}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isFilterSelected("collections", collection)}
                        onChange={() => toggleFilter("collections", collection)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-900 accent-neutral-400 cursor-pointer"
                      />
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">
                        {collection}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Tone Filter */}
              <div className="mb-8 pb-8 border-b border-neutral-800">
                <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
                  COLOR TONE
                </h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleFilter("colorTone", color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
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

              {/* Orientation Filter */}
              <div className="mb-8 pb-8 border-b border-neutral-800">
                <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
                  ORIENTATION
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleFilter("orientation", "portrait")}
                    className={`flex-1 aspect-[3/4] border-2 rounded transition-all cursor-pointer ${
                      isFilterSelected("orientation", "portrait")
                        ? "border-neutral-200 bg-neutral-800"
                        : "border-neutral-700 hover:border-neutral-600"
                    }`}
                    title="Portrait"
                  />
                  <button
                    onClick={() => toggleFilter("orientation", "landscape")}
                    className={`flex-1 aspect-[4/3] border-2 rounded transition-all cursor-pointer ${
                      isFilterSelected("orientation", "landscape")
                        ? "border-neutral-200 bg-neutral-800"
                        : "border-neutral-700 hover:border-neutral-600"
                    }`}
                    title="Landscape"
                  />
                  <button
                    onClick={() => toggleFilter("orientation", "square")}
                    className={`flex-1 aspect-square border-2 rounded transition-all cursor-pointer ${
                      isFilterSelected("orientation", "square")
                        ? "border-neutral-200 bg-neutral-800"
                        : "border-neutral-700 hover:border-neutral-600"
                    }`}
                    title="Square"
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8 pb-8 border-b border-neutral-800">
                <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
                  PRICE
                </h3>
                <input
                  type="range"
                  min="20"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-400"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-3">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
                  SIZE
                </h3>
                <div className="space-y-3">
                  {sizes.map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isFilterSelected("size", size)}
                        onChange={() => toggleFilter("size", size)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-900 accent-neutral-400 cursor-pointer"
                      />
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar with Sort */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
              <span className="text-xs text-neutral-400 tracking-wide">
                {products.length} products
              </span>

              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-200 tracking-wide transition-colors cursor-pointer"
                >
                  Sort by
                  <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {sortOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-neutral-900 border border-neutral-700 shadow-lg py-1 min-w-[160px] z-20">
                    <button className="w-full px-4 py-2 text-left text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition-colors cursor-pointer">
                      Featured
                    </button>
                    <button className="w-full px-4 py-2 text-left text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition-colors cursor-pointer">
                      Newest
                    </button>
                    <button className="w-full px-4 py-2 text-left text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition-colors cursor-pointer">
                      Price: Low to High
                    </button>
                    <button className="w-full px-4 py-2 text-left text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition-colors cursor-pointer">
                      Price: High to Low
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
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
