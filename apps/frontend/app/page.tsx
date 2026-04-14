import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import SecondaryHero from "@/components/secondary-hero";
import QuoteSection from "@/components/quote-section";
import { FeaturedGallery } from "@/components/featured-gallery";
import { CollectionsSection } from "@/components/collections-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SecondaryHero />
      <QuoteSection />
      <FeaturedGallery />
      <CollectionsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
