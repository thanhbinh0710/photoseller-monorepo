import Link from "next/link";
import { Header } from "@/components/header";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";
import { ProductDetailClient } from "./product-detail-client";

// Products data
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

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-light text-neutral-900 mb-4">
            Product not found
          </h1>
          <Link
            href="/collections"
            className="text-sm text-neutral-500 hover:text-neutral-900 underline"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ProductDetailClient product={product} />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
