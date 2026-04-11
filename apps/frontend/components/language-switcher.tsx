"use client";

import { useLanguage } from "@/lib/language-context";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-muted rounded-full p-1 w-16">
      <button
        onClick={() => setLanguage("en")}
        className={`flex-1 py-1 px-2 rounded-full text-xs font-semibold transition-all duration-300 ${
          language === "en"
            ? "bg-foreground text-background"
            : "text-foreground hover:text-foreground/70 cursor-pointer"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("vi")}
        className={`flex-1 py-1 px-2 rounded-full text-xs font-semibold transition-all duration-300 ${
          language === "vi"
            ? "bg-foreground text-background"
            : "text-foreground hover:text-foreground/70 cursor-pointer"
        }`}
      >
        VI
      </button>
    </div>
  );
}
