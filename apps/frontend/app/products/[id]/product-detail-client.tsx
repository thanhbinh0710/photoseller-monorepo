"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { FeaturedGallery } from "@/components/featured-gallery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  {
    id: 1,
    name: "Solitude",
    artist: "Minh Nguyen",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
    description:
      "A powerful black and white portrait capturing the essence of solitude. This fine art print showcases the beauty of minimalism and introspection.",
    details: [
      "Dimensions: 30cm x 40cm",
      "Frame: Optional",
      "Material: Premium Paper",
      "Edition: Limited",
    ],
  },
  {
    id: 2,
    name: "Mountain Dawn",
    artist: "Hoang Tran",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
    description:
      "Sepia-toned landscape capturing the serene beauty of mountain vistas at dawn. A timeless piece that brings nature into your space.",
    details: [
      "Dimensions: 30cm x 40cm",
      "Frame: Optional",
      "Material: Premium Paper",
      "Edition: Limited",
    ],
  },
  {
    id: 3,
    name: "Urban Echo",
    artist: "Minh Nguyen",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
    description:
      "An urban noir street photograph with classic film grain. Capturing the pulse of the city through a lens of nostalgia.",
    details: [
      "Dimensions: 30cm x 40cm",
      "Frame: Optional",
      "Material: Premium Paper",
      "Edition: Limited",
    ],
  },
  {
    id: 4,
    name: "Fading Blooms",
    artist: "Lan Pham",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
    description:
      "A moody still life study of flowers in their final moments. Dark and atmospheric, this piece speaks to the beauty of impermanence.",
    details: [
      "Dimensions: 30cm x 40cm",
      "Frame: Optional",
      "Material: Premium Paper",
      "Edition: Limited",
    ],
  },
  {
    id: 5,
    name: "Grand Facade",
    artist: "Hoang Tran",
    price: 38,
    originalPrice: 55,
    discount: 30,
    image: "/about_banner.jpg",
    description:
      "Classic architecture photography showcasing the grandeur of historical buildings. Perfect for those who appreciate timeless design.",
    details: [
      "Dimensions: 30cm x 40cm",
      "Frame: Optional",
      "Material: Premium Paper",
      "Edition: Limited",
    ],
  },
  {
    id: 6,
    name: "Misty Forest",
    artist: "Lan Pham",
    price: 42,
    originalPrice: 60,
    discount: 30,
    image: "/about_banner.jpg",
    description:
      "An atmospheric nature study enveloped in mist. The ethereal quality captures the mysterious beauty of forests.",
    details: [
      "Dimensions: 30cm x 40cm",
      "Frame: Optional",
      "Material: Premium Paper",
      "Edition: Limited",
    ],
  },
  {
    id: 7,
    name: "Ocean Waves",
    artist: "Minh Nguyen",
    price: 36,
    originalPrice: 52,
    discount: 30,
    image: "/about_banner.jpg",
    description:
      "Dramatic black and white ocean photography capturing the raw power of nature. A dynamic piece that commands attention.",
    details: [
      "Dimensions: 30cm x 40cm",
      "Frame: Optional",
      "Material: Premium Paper",
      "Edition: Limited",
    ],
  },
  {
    id: 8,
    name: "Café Noir",
    artist: "Hoang Tran",
    price: 34,
    originalPrice: 49,
    discount: 30,
    image: "/about_banner.jpg",
    description:
      "Intimate interior photography of a café captured in moody film tones. An inviting piece that tells stories of quiet moments.",
    details: [
      "Dimensions: 30cm x 40cm",
      "Frame: Optional",
      "Material: Premium Paper",
      "Edition: Limited",
    ],
  },
];

interface Product {
  id: number;
  name: string;
  artist: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  description: string;
  details: string[];
}

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { t } = useLanguage();
  const [selectedFrame, setSelectedFrame] = useState<
    "none" | "black" | "white"
  >("none");
  const [selectedSize, setSelectedSize] = useState<string>("medium");
  const [quantity, setQuantity] = useState(1);

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
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="px-4 py-3 mt-[65px] ml-12">
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/"
            className="text-accent-foreground hover:underline text-sm cursor-pointer"
          >
            HOME
          </Link>
          <span className="text-accent-foreground">/</span>
          <Link
            href="/collections"
            className="text-accent-foreground hover:underline text-sm cursor-pointer"
          >
            COLLECTIONS
          </Link>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-[1200px] mx-auto px-4 pb-20 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-30 lg:gap-x-30">
          {/* Product Image */}
          <div className="flex flex-col max-w-[600px]">
            <div
              className={`relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-8 ${getFrameStyles()} transition-all duration-500`}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start">
            {/* Title and Artist */}
            <div className="mb-8">
              <h1 className="text-3xl font-light tracking-wide text-neutral-900 mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-neutral-500 tracking-wide">
                by {product.artist}
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-neutral-200">
              <span className="text-2xl font-light text-neutral-900">
                ${product.price}
              </span>
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded">
                {product.discount}% {t.shop.badges.discount}
              </span>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-widest text-neutral-900 uppercase mb-4">
                {t.shop.filters.size}
              </h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full px-4 py-2 border border-neutral-200 bg-white text-sm text-neutral-900 text-left hover:border-neutral-900 transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    {t.shop.sizeOptions.small}
                  </SelectItem>
                  <SelectItem value="medium">
                    {t.shop.sizeOptions.medium}
                  </SelectItem>
                  <SelectItem value="large">
                    {t.shop.sizeOptions.large}
                  </SelectItem>
                  <SelectItem value="xlarge">
                    {t.shop.sizeOptions.xlarge}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Frame Selection */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-widest text-neutral-900 uppercase mb-4">
                {t.shop.framing}
              </h3>
              <div className="flex gap-3 text-neutral-900">
                <button
                  onClick={() => setSelectedFrame("none")}
                  className={`flex items-center gap-2 px-4 py-2 border text-xs transition-all cursor-pointer ${
                    selectedFrame === "none"
                      ? "border-neutral-900"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-neutral-50 border border-neutral-200" />
                  No frame
                </button>
                <button
                  onClick={() => setSelectedFrame("black")}
                  className={`flex items-center gap-2 px-4 py-2 border text-xs transition-all cursor-pointer ${
                    selectedFrame === "black"
                      ? "border-neutral-900"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-neutral-900" />
                  Black
                </button>
                <button
                  onClick={() => setSelectedFrame("white")}
                  className={`flex items-center gap-2 px-4 py-2 border text-xs transition-all cursor-pointer ${
                    selectedFrame === "white"
                      ? "border-neutral-900"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white border border-neutral-400" />
                  White
                </button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-neutral-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-accent-foreground/10 transition-colors cursor-pointer"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-accent-foreground/10 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-neutral-900 text-white text-xs text-semibold tracking-widest py-3 hover:bg-foreground transition-colors hover:text-accent-foreground hover:border hover:border-accent-foreground uppercase cursor-pointer">
                {t.shop.addToCart}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Gallery Section */}
      <FeaturedGallery />
    </div>
  );
}
