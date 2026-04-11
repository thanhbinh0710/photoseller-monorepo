"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Heart, ZoomIn, Eye, Maximize2, ChevronDown } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Solitude",
    artist: "Minh Nguyen",
    price: 120,
    originalPrice: 150,
    discount: 20,
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
    price: 120,
    originalPrice: 150,
    discount: 20,
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
    price: 120,
    originalPrice: 150,
    discount: 20,
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
    price: 120,
    originalPrice: 150,
    discount: 20,
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
    price: 120,
    originalPrice: 150,
    discount: 20,
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
    price: 120,
    originalPrice: 150,
    discount: 20,
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
    price: 120,
    originalPrice: 150,
    discount: 20,
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
    price: 120,
    originalPrice: 150,
    discount: 20,
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

const backgroundColors = [
  { name: "Dark", color: "#3d3d3d" },
  { name: "Gray", color: "#808080" },
  { name: "Cream", color: "#f5e6d3" },
];

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { t } = useLanguage();
  const [selectedFrame, setSelectedFrame] = useState<
    "none" | "black" | "white" | "wood"
  >("none");
  const [selectedSize, setSelectedSize] = useState<string>("30x40");
  const [selectedBg, setSelectedBg] = useState<string>("Dark");
  const [quantity, setQuantity] = useState(1);
  const [showFramePreview, setShowFramePreview] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const sizes = ["30x40 cm", "40x50 cm", "50x70 cm", "60x90 cm"];

  const toggleLike = () => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(product.id.toString())) {
      newLiked.delete(product.id.toString());
    } else {
      newLiked.add(product.id.toString());
    }
    setLikedItems(newLiked);
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-[70px] text-white">
      {/* Breadcrumb */}
      <div className="px-4 py-3 ml-12 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Link href="/" className="hover:text-white text-sm cursor-pointer">
            HOME
          </Link>
          <span>/</span>
          <Link
            href="/collections"
            className="hover:text-white text-sm cursor-pointer"
          >
            COLLECTIONS
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Image with Thumbnails */}
          <div className="lg:col-span-2">
            {/* Thumbnails */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-16 border border-neutral-700 rounded overflow-hidden cursor-pointer hover:border-neutral-500 transition-colors"
                >
                  <Image
                    src={product.image}
                    alt={`View ${i}`}
                    width={48}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-6 rounded">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Toolbar at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4 flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="text-white hover:bg-white/20 p-2 rounded transition-colors cursor-pointer">
                    <ZoomIn size={18} />
                  </button>
                  <button className="text-white hover:bg-white/20 p-2 rounded transition-colors cursor-pointer">
                    <Eye size={18} />
                  </button>
                  <button className="text-white hover:bg-white/20 p-2 rounded transition-colors cursor-pointer">
                    <Maximize2 size={18} />
                  </button>
                </div>
                <div className="flex gap-2 text-xs text-neutral-300">
                  <span>100%</span>
                  <span>×</span>
                </div>
              </div>
            </div>

            {/* Preview Background Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-4">
                PREVIEW BACKGROUND
              </h3>
              <div className="flex gap-3">
                {backgroundColors.map((bg) => (
                  <button
                    key={bg.name}
                    onClick={() => setSelectedBg(bg.name)}
                    className={`w-12 h-12 rounded-full border-2 transition-all cursor-pointer ${
                      selectedBg === bg.name
                        ? "border-white ring-2 ring-neutral-600"
                        : "border-neutral-700 hover:border-neutral-500"
                    }`}
                    style={{ backgroundColor: bg.color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Product ID and Title */}
            <div className="mb-8">
              <h2 className="text-xs text-neutral-400 tracking-widest mb-2">
                #0{product.id}
              </h2>
              <h1 className="text-3xl font-light tracking-wide mb-2">
                ${product.price}
              </h1>
              <p className="text-sm text-neutral-400">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-8 pb-8 border-b border-neutral-800">
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-4">
                SIZE
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-xs border rounded transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Selection */}
            <div className="mb-8 pb-8 border-b border-neutral-800">
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-4">
                FRAME
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { id: "none", label: "No Frame" },
                  { id: "black", label: "Black" },
                  { id: "white", label: "White" },
                  { id: "wood", label: "Wood" },
                ].map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame.id as any)}
                    className={`flex flex-col items-center gap-2 p-3 text-center text-xs border rounded transition-all cursor-pointer ${
                      selectedFrame === frame.id
                        ? "border-white bg-neutral-900"
                        : "border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    <div className="w-10 h-10 border rounded">
                      {frame.id === "none" && (
                        <div className="w-full h-full bg-neutral-700 border border-neutral-500" />
                      )}
                      {frame.id === "black" && (
                        <div className="w-full h-full p-1 bg-gray-900 flex items-center justify-center">
                          <div className="w-full h-full bg-gray-600" />
                        </div>
                      )}
                      {frame.id === "white" && (
                        <div className="w-full h-full p-1 bg-white flex items-center justify-center">
                          <div className="w-full h-full bg-gray-400" />
                        </div>
                      )}
                      {frame.id === "wood" && (
                        <div className="w-full h-full p-1 bg-amber-800 flex items-center justify-center">
                          <div className="w-full h-full bg-amber-600" />
                        </div>
                      )}
                    </div>
                    <span>{frame.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-amber-100 text-black font-semibold py-4 rounded mb-4 hover:bg-amber-200 transition-colors cursor-pointer text-sm tracking-wide flex items-center justify-center gap-2">
              <span>🛒</span>
              Add to Cart
            </button>

            <p className="text-xs text-neutral-500 text-center">
              Free shipping on orders over $200
            </p>

            {/* Benefits */}
            <div className="mt-8 pt-8 border-t border-neutral-800 grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <div className="text-neutral-400 mb-2">🏆</div>
                <p className="font-semibold">Archival Quality</p>
                <p className="text-neutral-500 text-xs">100+ years</p>
              </div>
              <div>
                <div className="text-neutral-400 mb-2">📦</div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-neutral-500 text-xs">Over $200</p>
              </div>
              <div>
                <div className="text-neutral-400 mb-2">↩️</div>
                <p className="font-semibold">Easy Returns</p>
                <p className="text-neutral-500 text-xs">30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View with Frame Section */}
      <div className="border-t border-neutral-800 px-6 py-12">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-light tracking-wide">
              VIEW WITH FRAME
            </h2>
            <button
              onClick={() => setShowFramePreview(!showFramePreview)}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
            >
              {showFramePreview ? "Hide Frame" : "Show Frame"}
              <span className="text-lg">{showFramePreview ? "−" : "+"}</span>
            </button>
          </div>

          {showFramePreview && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Black Frame */}
              <div className="text-center">
                <div className="bg-neutral-900 p-8 rounded mb-4 flex items-center justify-center min-h-[400px]">
                  <div className="bg-black p-6 border-8 border-gray-800">
                    <div className="w-40 h-48 bg-gray-600" />
                  </div>
                </div>
                <h3 className="font-light text-sm mb-2">Black Frame</h3>
              </div>

              {/* White Frame */}
              <div className="text-center">
                <div className="bg-neutral-200 p-8 rounded mb-4 flex items-center justify-center min-h-[400px]">
                  <div className="bg-white p-6 border-8 border-gray-200">
                    <div className="w-40 h-48 bg-gray-400" />
                  </div>
                </div>
                <h3 className="font-light text-sm mb-2 text-neutral-900">
                  White Frame
                </h3>
              </div>

              {/* Wood Frame */}
              <div className="text-center">
                <div className="bg-amber-100 p-8 rounded mb-4 flex items-center justify-center min-h-[400px]">
                  <div className="bg-amber-900 p-6 border-8 border-amber-800">
                    <div className="w-40 h-48 bg-amber-600" />
                  </div>
                </div>
                <h3 className="font-light text-sm mb-2 text-neutral-900">
                  Wood Frame
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      {showFramePreview && (
        <div className="border-t border-neutral-800 px-6 py-8 bg-neutral-900">
          <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-neutral-400">
            <div>
              <Image
                src={product.image}
                alt={product.name}
                width={60}
                height={80}
                className="mb-2 rounded"
              />
              <p className="font-semibold text-white text-xs">#0{product.id}</p>
              <p className="text-neutral-500">{product.name}</p>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-neutral-400">Size: {selectedSize}</p>
              <p className="text-neutral-400">Frame: {selectedFrame}</p>
              <p className="text-neutral-400">Background: {selectedBg}</p>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-white font-semibold">${product.price}</p>
              <p className="text-xs text-neutral-500">per unit</p>
            </div>
            <div className="flex flex-col justify-end gap-2">
              <button className="bg-amber-100 text-black py-2 rounded text-xs font-semibold cursor-pointer hover:bg-amber-200 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
