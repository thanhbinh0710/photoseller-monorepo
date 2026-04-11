"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  User,
  ShoppingBag,
  LogOut,
  Package,
  LogIn,
  UserPlus,
  ShoppingCart,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "./language-switcher";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountPopoverOpen, setIsAccountPopoverOpen] = useState(false);
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

  // Account popover content
  const accountPopoverContent = (
    <div className="rounded-sm py-1 min-w-[200px]">
      {isLoggedIn ? (
        <>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-2 text-[14px]  text-muted-foreground/40! hover:text-foreground! transition-all duration-300 ease-out uppercase font-sans font-semibold"
          >
            <User size={16} className="opacity-70" /> PROFILE
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-3 px-3 py-2 text-[14px]  text-muted-foreground/40! hover:text-foreground! transition-all duration-300 ease-out uppercase font-sans font-semibold"
          >
            <Package size={16} className="opacity-70" /> ORDERS
          </Link>

          <div className="bg-foreground/30 my-2 h-px"></div>
          <div
            onClick={() => {
              handleLogout();
              setIsAccountPopoverOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-[14px]  text-gray-500 hover:text-red-400 transition-colors uppercase w-full cursor-pointer font-semibold"
          >
            <LogOut size={16} className="opacity-70" /> LOGOUT
          </div>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 text-[14px] tracking-widest text-muted-foreground/40! hover:text-foreground! transition-all duration-300 ease-out uppercase font-sans font-semibold"
            onClick={() => setIsAccountPopoverOpen(false)}
          >
            <LogIn size={16} className="opacity-70" /> SIGN IN
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-3 px-3 py-2 text-[14px]  text-muted-foreground/40! hover:text-foreground! transition-all duration-300 ease-out uppercase font-sans font-semibold"
            onClick={() => setIsAccountPopoverOpen(false)}
          >
            <UserPlus size={16} className="opacity-70" /> REGISTER
          </Link>
        </>
      )}
    </div>
  );

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center h-[70px] transition-all duration-300 ${
        isInHero
          ? "bg-transparent border-b border-transparent"
          : isNearHeroEnd
            ? "bg-transparent border-b border-transparent"
            : "border-b border-primary-600 bg-background"
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
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/collections"
              className={`text-base transition-all duration-300 ease-out cursor-pointer ${
                pathname === "/collections"
                  ? "text-foreground"
                  : "text-foreground"
              }`}
            >
              <span
                className={`inline-block transition-all duration-300 ease-out pb-1 ${
                  pathname === "/collections"
                    ? "border-b-2 border-foreground"
                    : "border-b-2 border-transparent hover:border-foreground"
                }`}
              >
                {t.nav.collections}
              </span>
            </Link>

            <Link
              href="/about"
              className={`text-base transition-all duration-300 ease-out cursor-pointer ${
                pathname === "/about" ? "text-foreground" : "text-foreground"
              }`}
            >
              <span
                className={`inline-block transition-all duration-300 ease-out pb-1 ${
                  pathname === "/about"
                    ? "border-b-2 border-foreground"
                    : "border-b-2 border-transparent hover:border-foreground"
                }`}
              >
                {t.nav.about}
              </span>
            </Link>
            <Link
              href="#contact"
              className="text-base text-foreground transition-all duration-300 ease-out cursor-pointer"
            >
              <span className="inline-block transition-all duration-300 ease-out pb-1 border-b-2 border-transparent hover:border-foreground">
                {t.nav.contact}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Popover
              open={isAccountPopoverOpen}
              onOpenChange={setIsAccountPopoverOpen}
            >
              <PopoverTrigger asChild>
                <button className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer">
                  <User size={20} />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                side="bottom"
                sideOffset={20}
                className="w-56"
              >
                {accountPopoverContent}
              </PopoverContent>
            </Popover>

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
                className={`text-base transition-all duration-300 ease-out py-2 ${
                  pathname === "/shop" || pathname === "/collections"
                    ? "text-foreground"
                    : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span
                  className={`inline-block transition-all duration-300 ease-out pb-1 ${
                    pathname === "/shop" || pathname === "/collections"
                      ? "border-b-2 border-foreground"
                      : "border-b-2 border-transparent hover:border-foreground"
                  }`}
                >
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
                className={`text-base transition-all duration-300 ease-out py-2 ${
                  pathname === "/about" ? "text-foreground" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span
                  className={`inline-block transition-all duration-300 ease-out pb-1 ${
                    pathname === "/about"
                      ? "border-b-2 border-foreground"
                      : "border-b-2 border-transparent hover:border-foreground"
                  }`}
                >
                  {t.nav.about}
                </span>
              </Link>
              <Link
                href="#contact"
                className="text-base text-foreground transition-all duration-300 ease-out py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-block transition-all duration-300 ease-out pb-1 border-b-2 border-transparent hover:border-foreground">
                  {t.nav.contact}
                </span>
              </Link>

              <div className="pt-4 space-y-4 border-t border-primary-600">
                <div className="flex items-center gap-4">
                  <Popover
                    open={isAccountPopoverOpen}
                    onOpenChange={setIsAccountPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <button className="text-foreground hover:text-foreground/70 transition-colors">
                        <User size={20} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      side="bottom"
                      sideOffset={8}
                      className="w-56"
                    >
                      {accountPopoverContent}
                    </PopoverContent>
                  </Popover>

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
