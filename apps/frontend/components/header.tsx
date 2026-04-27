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
import { AccountMenu } from "./account-menu";
import { Badge } from "@/components/ui/badge";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [isNearHeroEnd, setIsNearHeroEnd] = useState(false);
  const { t } = useLanguage();
  const { rawUserProfile } = useFetchUserProfile();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const status = localStorage.getItem("user_logged_in");
    setIsLoggedIn(status === "true");
  }, []);

  useGSAP(
    () => {
      // Only enable scroll tracking on home page
      if (pathname !== "/") {
        setIsInHero(false);
        setIsNearHeroEnd(false);
        return;
      }

      // Create a scroll tracker for the hero section
      gsap.to(".hero-scroll-tracker", {
        scrollTrigger: {
          trigger: document.documentElement,
          onUpdate: (self) => {
            const heroHeight = window.innerHeight;
            const scrollRatio = self.progress * window.innerHeight;
            const scrollPercent = scrollRatio / heroHeight;

            if (scrollPercent > 0.6 && scrollPercent < 1) {
              setIsInHero(false);
              setIsNearHeroEnd(true);
            } else if (scrollPercent < 0.6) {
              setIsInHero(true);
              setIsNearHeroEnd(false);
            } else {
              setIsInHero(false);
              setIsNearHeroEnd(false);
            }
          },
        },
      });
    },
    { scope: containerRef, dependencies: [pathname] },
  );

  const handleLogout = () => {
    localStorage.removeItem("user_logged_in");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  // Do not render the header on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="hero-scroll-tracker sticky top-0 left-0 right-0 z-50 flex items-center h-[70px] bg-background "
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
          <div className="hidden md:flex items-center gap-10 font-bold">
            <Link
              href="/collections"
              className="text-base text-foreground transition-all duration-300 ease-out cursor-pointer hover:text-secondary"
            >
              {t.nav.collections}
            </Link>

            <Link
              href="/about"
              className="text-base text-foreground transition-all duration-300 ease-out cursor-pointer hover:text-secondary"
            >
              {t.nav.about}
            </Link>
            <Link
              href="#contact"
              className="text-base text-foreground transition-all duration-300 ease-out cursor-pointer hover:text-secondary"
            >
              {t.nav.contact}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <AccountMenu />
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
              <>
                <Link
                  href="/login"
                  className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer text-sm font-medium"
                >
                  ACCOUNT
                </Link>
              </>
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
                className="text-base text-foreground transition-all duration-300 ease-out py-2 hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.collections}
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
                className="text-base text-foreground transition-all duration-300 ease-out py-2 hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                href="#contact"
                className="text-base text-foreground transition-all duration-300 ease-out py-2 hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>

              {isLoggedIn && (
                <div className="pt-4 space-y-2 border-t border-primary-600">
                  <p className="text-sm text-muted-foreground font-semibold">
                    Account
                  </p>
                  {/* Admin Dashboard Link */}
                  {rawUserProfile?.role === "ADMIN" && (
                    <Link
                      href="/dashboard/account"
                      className="block text-base text-foreground transition-all duration-300 ease-out py-2 hover:text-secondary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/account/order"
                    className="block text-base text-foreground transition-all duration-300 ease-out py-2 hover:text-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    href="/account/profile"
                    className="block text-base text-foreground transition-all duration-300 ease-out py-2 hover:text-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block text-base text-destructive transition-all duration-300 ease-out py-2 hover:text-red-400"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              <div className="pt-4 space-y-4 border-t border-primary-600">
                <div className="flex items-center gap-4">
                  {isLoggedIn ? (
                    <>
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
                    <>
                      <Link
                        href="/login"
                        className="text-foreground hover:text-foreground/70 transition-colors text-sm font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        SIGN IN
                      </Link>
                      <Link
                        href="/signup"
                        className="text-foreground hover:text-foreground/70 transition-colors text-sm font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        SIGN UP
                      </Link>
                    </>
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
