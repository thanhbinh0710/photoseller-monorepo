"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CollectionsDropdown() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const categories = [
    {
      key: "flowers",
      label: t.collections.categories.flowers,
      image: "/categories/flowers.jpg",
    },
    {
      key: "people",
      label: t.collections.categories.people,
      image: "/categories/people.jpg",
    },
    {
      key: "objects",
      label: t.collections.categories.objects,
      image: "/categories/objects.jpg",
    },
  ];

  // Use the first category's image as the showcase
  const showcaseImage = categories[0].image;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed bg-black/50 z-40 left-0 right-0 bottom-0"
          style={{ top: "70px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Dropdown */}
      <Popover open={isOpen}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="inline-block"
        >
          <PopoverTrigger asChild>
            <button className="text-base text-muted-foreground/40 hover:text-foreground transition-all duration-300 ease-out cursor-pointer flex items-center gap-2">
              {t.nav.collections}
              <ChevronDown style={{ fontSize: "12px" }} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="bottom"
            sideOffset={20}
            className="w-auto p-0 rounded-md bg-white shadow-lg z-50 fixed!"
          >
            <div className="flex">
              {/* Left Column - Categories */}
              <div className="flex flex-col py-3 px-4 border-r border-gray-100">
                {categories.map((category) => (
                  <Link
                    key={category.key}
                    href={`/shop?category=${category.key}`}
                    className="px-3 py-2.5 text-sm text-gray-950  hover:underline rounded-sm transition-colors duration-200 whitespace-nowrap font-medium"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>

              {/* Right Column - Image */}
              <div className="hidden sm:block relative w-48 h-48 bg-gray-100">
                <Image
                  src={showcaseImage}
                  alt="Collections showcase"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </PopoverContent>
        </div>
      </Popover>
    </>
  );
}
