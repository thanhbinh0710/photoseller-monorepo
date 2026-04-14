"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  LogOut,
  Package,
  ShoppingCart,
  User,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "./language-switcher";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [isNearHeroEnd, setIsNearHeroEnd] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const status = localStorage.getItem("user_logged_in");
    setIsLoggedIn(status === "true");
  }, []);

  useEffect(() => {
    // Only enable transparent header on home page
    if (pathname !== "/") {
      setIsInHero(false);
      setIsNearHeroEnd(false);
      return;
    }

    const handleScroll = () => {
      // Hero section is min-h-screen, so we check if scroll position is less than viewport height
      const heroHeight = window.innerHeight;
      const scrollRatio = window.scrollY / heroHeight;

      // isNearHeroEnd: when we're at 60-100% through the hero
      if (scrollRatio > 0.6 && scrollRatio < 1) {
        setIsInHero(false);
        setIsNearHeroEnd(true);
      }
      // isInHero: when we're at the beginning (0-60% through the hero)
      else if (scrollRatio < 0.6) {
        setIsInHero(true);
        setIsNearHeroEnd(false);
      }
      // Left hero completely
      else {
        setIsInHero(false);
        setIsNearHeroEnd(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user_logged_in");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center h-[70px] transition-all duration-300 ${
        isInHero
          ? "bg-transparent border-b border-transparent"
          : isNearHeroEnd
            ? "bg-transparent border-b border-transparent"
            : "border-b border-primary-900 bg-background/80 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-3 w-full h-full flex items-center">
        <nav className="flex items-center justify-between font-semibold w-full">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="FotoByKien"
              width={120}
              height={40}
              className="h-auto w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 font-normal">
            <Link
              href="/collections"
              className={`text-base transition-all duration-300 ease-out cursor-pointer group ${
                pathname === "/collections"
                  ? "text-foreground"
                  : "text-foreground"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    pathname === "/collections"
                      ? "bg-foreground"
                      : "bg-transparent group-hover:bg-foreground"
                  }`}
                />
                {t.nav.collections}
              </span>
            </Link>

            <Link
              href="/about"
              className={`text-base transition-all duration-300 ease-out cursor-pointer group ${
                pathname === "/about" ? "text-foreground" : "text-foreground"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    pathname === "/about"
                      ? "bg-foreground"
                      : "bg-transparent group-hover:bg-foreground"
                  }`}
                />
                {t.nav.about}
              </span>
            </Link>
            <Link
              href="#contact"
              className="text-base text-foreground transition-all duration-300 ease-out cursor-pointer group"
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-foreground transition-all duration-300" />
                {t.nav.contact}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer"
                  title="Profile"
                >
                  <User size={20} />
                </Link>
                <button className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer relative">
                  {0 > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                    >
                      {0}
                    </Badge>
                  )}
                  <ShoppingCart size={20} />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer text-sm font-medium"
              >
                SIGN IN
              </Link>
            )}

            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background py-6 px-6 z-50">
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                className={`text-base transition-all duration-300 ease-out py-2 group ${
                  pathname === "/shop" || pathname === "/collections"
                    ? "text-foreground"
                    : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      pathname === "/shop" || pathname === "/collections"
                        ? "bg-foreground"
                        : "bg-transparent group-hover:bg-foreground"
                    }`}
                  />
                  {t.nav.collections}
                </span>
              </Link>

              <div className="pl-4 space-y-2">
                <Link
                  href="/shop?category=flowers"
                  className="block text-base text-muted-foreground/70 hover:text-foreground py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.collections.categories.flowers}
                </Link>
                <Link
                  href="/shop?category=people"
                  className="block text-base text-muted-foreground/70 hover:text-foreground py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.collections.categories.people}
                </Link>
                <Link
                  href="/shop?category=objects"
                  className="block text-base text-muted-foreground/70 hover:text-foreground py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.collections.categories.objects}
                </Link>
              </div>

              <Link
                href="/about"
                className={`text-base transition-all duration-300 ease-out py-2 group ${
                  pathname === "/about" ? "text-foreground" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      pathname === "/about"
                        ? "bg-foreground"
                        : "bg-transparent group-hover:bg-foreground"
                    }`}
                  />
                  {t.nav.about}
                </span>
              </Link>
              <Link
                href="#contact"
                className="text-base text-foreground transition-all duration-300 ease-out py-2 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-foreground transition-all duration-300" />
                  {t.nav.contact}
                </span>
              </Link>

              <div className="pt-4 space-y-4 border-t border-primary-600">
                <div className="flex items-center gap-4">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        className="text-foreground hover:text-foreground/70 transition-colors"
                      >
                        <ShoppingBag size={20} />
                      </Link>
                      <button className="text-foreground hover:text-foreground/70 transition-colors relative">
                        {0 > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                          >
                            {0}
                          </Badge>
                        )}
                        <ShoppingCart size={20} />
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="text-foreground hover:text-foreground/70 transition-colors text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SIGN IN
                    </Link>
                  )}
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
