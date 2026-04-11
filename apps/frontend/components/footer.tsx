"use client";

import { Instagram, Facebook, Youtube } from "lucide-react";
import { TikTok } from "@/components/icons/tiktok";
import { useLanguage } from "@/lib/language-context";
import socialLinks from "@/lib/social-links.json";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socialLinks.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <footer className="py-16 px-6 bg-[#05090c]">
      <div className="max-w-6xl mx-auto">
        {/* Decorative border */}
        <div className="w-32 h-px bg-border mb-12 mx-auto"></div>
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-medium tracking-tight mb-4 uppercase">
              fotobykien.
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-4">
              {t.footer.contact}
            </p>
            <button
              onClick={copyEmail}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {copied ? "Copied!" : socialLinks.contact.email}
            </button>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm font-medium mb-5">{t.footer.follow}</p>
            <div className="flex gap-3">
              {socialLinks.socialMedia.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  className="p-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                  aria-label={social.name}
                >
                  {social.icon === "instagram" && <Instagram size={16} />}
                  {social.icon === "facebook" && <Facebook size={16} />}
                  {social.icon === "tiktok" && <TikTok size={16} />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="w-32 h-px bg-border mb-8 mx-auto"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">{t.footer.copyright}</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
