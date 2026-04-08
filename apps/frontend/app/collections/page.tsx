import { Header } from "@/components/header";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";
import { ShopContentWrapper } from "./shop-content-wrapper";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ShopContentWrapper />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
