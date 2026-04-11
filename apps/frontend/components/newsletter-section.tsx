"use client";

import type React from "react";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-[#05090c]">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs tracking-widest text-muted-foreground mb-4 uppercase">
          {t.newsletter.subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
          {t.newsletter.title1} {t.newsletter.title2}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10">
          {t.newsletter.description}
        </p>

        {isSubscribed ? (
          <div className="rounded bg-green-50 border border-green-200 p-4">
            <p className="text-sm font-medium text-green-900 mb-1">
              {t.newsletter.thankYou}
            </p>
            <p className="text-sm text-green-700">{t.newsletter.hearFromUs}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              required
              className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300"
            />
            <Button
              type="submit"
              variant="outline"
              size="lg"
              onClick={handleSubmit}
            >
              {t.newsletter.button}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
