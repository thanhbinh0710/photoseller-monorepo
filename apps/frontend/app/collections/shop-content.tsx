"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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

const filterOptions = ["categories", "size", "orientation"] as const;

export default function ShopContent() {
  const { t } = useLanguage();
  const [selectedFrame, setSelectedFrame] = useState<
    "none" | "black" | "white"
  >("none");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: string[];
    size: string[];
    orientation: string[];
  }>({
    categories: [],
    size: [],
    orientation: [],
  });

  const filterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const sortRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside all filter dropdowns
      const isOutsideFilters = Object.values(filterRefs.current).every(
        (ref) => ref && !ref.contains(event.target as Node),
      );
      if (isOutsideFilters && openFilter) {
        setOpenFilter(null);
      }

      // Check if click is outside sort dropdown
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter]);

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

  const getFrameStyles = () => {
    switch (selectedFrame) {
      case "none":
        return "";
      case "black":
        return "ring-1 ring-neutral-800";
      case "white":
        return "ring-1 ring-neutral-300";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Pre-filter banner/title content */}
      <div className="pt-[calc(81px+3rem)] pb-12 md:pt-[calc(81px+5rem)] md:pb-20 px-4 text-center bg-neutral-50">
        <h1 className="text-3xl md:text-4xl font-light tracking-widest text-neutral-900 uppercase">
          {t.nav.collections || "COLLECTIONS"}
        </h1>
        <p className="text-neutral-500 mt-4 text-sm tracking-wide">
          Explore our exclusive art prints
        </p>
      </div>

      {/* Filters - Clean & Minimal (isolated in its own sticky div) */}
      <div
        className="bg-white border-b border-neutral-100 py-4 px-4 sticky top-[70px]"
        style={{ zIndex: 49 }}
      >
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between">
            {/* Left: Product count & Filters */}
            <div className="flex items-center gap-6">
              <span className="text-xs text-neutral-400 tracking-wide">
                {products.length} {t.shop.productsCount}
              </span>

              <div className="h-4 w-px bg-neutral-200" />

              <div className="flex items-center gap-1">
                {filterOptions.map((filter) => (
                  <div
                    key={filter}
                    className="relative"
                    ref={(el) => {
                      filterRefs.current[filter] = el;
                    }}
                  >
                    <button
                      onClick={() =>
                        setOpenFilter(openFilter === filter ? null : filter)
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wide transition-colors cursor-pointer ${
                        openFilter === filter
                          ? "text-neutral-900"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {t.shop.filters[filter]}
                      <ChevronDown
                        size={12}
                        strokeWidth={1.5}
                        className={`transition-transform ${
                          openFilter === filter ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openFilter === filter && (
                      <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-200 shadow-sm py-2 min-w-[180px] z-20">
                        {filter === "categories" && (
                          <>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors ">
                              <input
                                type="checkbox"
                                checked={isFilterSelected(
                                  "categories",
                                  "botanical",
                                )}
                                onChange={() =>
                                  toggleFilter("categories", "botanical")
                                }
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.styleOptions.botanical}</span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected(
                                  "categories",
                                  "stillLife",
                                )}
                                onChange={() =>
                                  toggleFilter("categories", "stillLife")
                                }
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.styleOptions.stillLife}</span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected(
                                  "categories",
                                  "portrait",
                                )}
                                onChange={() =>
                                  toggleFilter("categories", "portrait")
                                }
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.styleOptions.portrait}</span>
                            </label>
                          </>
                        )}

                        {filter === "size" && (
                          <>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected("size", "small")}
                                onChange={() => toggleFilter("size", "small")}
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.sizeOptions.small}</span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected("size", "medium")}
                                onChange={() => toggleFilter("size", "medium")}
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.sizeOptions.medium}</span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected("size", "large")}
                                onChange={() => toggleFilter("size", "large")}
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.sizeOptions.large}</span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected("size", "xlarge")}
                                onChange={() => toggleFilter("size", "xlarge")}
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.sizeOptions.xlarge}</span>
                            </label>
                          </>
                        )}
                        {filter === "orientation" && (
                          <>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected(
                                  "orientation",
                                  "portrait",
                                )}
                                onChange={() =>
                                  toggleFilter("orientation", "portrait")
                                }
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.orientationOptions.portrait}</span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected(
                                  "orientation",
                                  "landscape",
                                )}
                                onChange={() =>
                                  toggleFilter("orientation", "landscape")
                                }
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.orientationOptions.landscape}</span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={isFilterSelected(
                                  "orientation",
                                  "square",
                                )}
                                onChange={() =>
                                  toggleFilter("orientation", "square")
                                }
                                className="w-4 h-4 rounded border-neutral-300 bg-white accent-neutral-900 focus:ring-neutral-900 cursor-pointer"
                              />
                              <span>{t.shop.orientationOptions.square}</span>
                            </label>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Frame options & Sort */}
            <div className="flex items-center gap-6">
              {/* Framing Options - Minimal */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400 tracking-wide ">
                  {t.shop.framing}
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSelectedFrame("none")}
                    className={`w-6 h-6 rounded-full border-2 bg-neutral-50 transition-all ${
                      selectedFrame === "none"
                        ? "border-neutral-900"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                    title="No frame"
                  />
                  <button
                    onClick={() => setSelectedFrame("black")}
                    className={`w-6 h-6 rounded-full bg-neutral-900 border-2 transition-all ${
                      selectedFrame === "black"
                        ? "border-neutral-900 ring-2 ring-neutral-300"
                        : "border-neutral-900"
                    }`}
                    title="Black frame"
                  />
                  <button
                    onClick={() => setSelectedFrame("white")}
                    className={`w-6 h-6 rounded-full bg-white border-2 transition-all ${
                      selectedFrame === "white"
                        ? "border-neutral-400 ring-2 ring-neutral-300"
                        : "border-neutral-200"
                    }`}
                    title="White frame"
                  />
                </div>
              </div>

              <div className="h-4 w-px bg-neutral-200" />

              {/* Sort - Minimal */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 tracking-wide transition-colors cursor-pointer"
                >
                  {t.shop.sort}
                  <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    className={`transition-transform ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {sortOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-neutral-200 shadow-sm py-1 min-w-[160px] z-20 ">
                    <button className="w-full px-4 py-2 text-left text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer">
                      {t.shop.sortOptions.featured}
                    </button>
                    <button className="w-full px-4 py-2 text-left text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer">
                      {t.shop.sortOptions.newest}
                    </button>
                    <button className="w-full px-4 py-2 text-left text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer">
                      {t.shop.sortOptions.priceLow}
                    </button>
                    <button className="w-full px-4 py-2 text-left text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer">
                      {t.shop.sortOptions.priceHigh}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid - 4 columns, clean spacing */}
      <div className="max-w-[1800px] mx-auto px-3 pb-16 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-12">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="cursor-pointer"
            >
              {/* Product Image - Clean, minimal */}
              <div className="relative mb-5">
                <div
                  className={`relative aspect-[3/4] overflow-hidden bg-neutral-100 ${getFrameStyles()} transition-all duration-500`}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Product Info - Price only */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-neutral-900">
                    ${product.price}
                  </span>
                  <span className="text-xs text-neutral-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Load More - Minimal button */}
      <div className="text-center pb-16">
        <button className="text-xs tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors border-b border-neutral-300 hover:border-neutral-900 pb-1">
          Load more
        </button>
      </div>

      {/* Click outside to close dropdowns */}
      {(openFilter || sortOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setOpenFilter(null);
            setSortOpen(false);
          }}
        />
      )}
    </div>
  );
}
