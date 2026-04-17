import { AboutSection } from "@/components/about-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <AboutSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
