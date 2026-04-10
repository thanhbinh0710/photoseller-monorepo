"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-foreground text-sm font-bold hover:text-foreground/70 transition-all duration-300 ease-out flex items-center gap-1 cursor-pointer border border-foreground hover:border-foreground/70 rounded px-2 py-1 ">
          {language.toUpperCase()}
          <ChevronDown style={{ fontSize: "10px" }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          EN
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("vi")}>
          VI
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
