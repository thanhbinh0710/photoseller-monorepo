"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingBag,
  LogOut,
  Package,
  LogIn,
  UserPlus,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "./language-switcher";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountPopoverOpen, setIsAccountPopoverOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const status = localStorage.getItem("user_logged_in");
    setIsLoggedIn(status === "true");
  }, []);

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
            className="flex items-center gap-3 px-3 py-2 text-[14px]  text-[#a2a8af] hover:text-red-300 transition-colors uppercase w-full cursor-pointer font-semibold"
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
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background flex items-center h-[70px]">
      <div className="max-w-[1800px] mx-auto px-3 w-full">
        <nav className="flex items-center justify-between font-semibold py-4">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link
                  href="/collections"
                  className="text-base text-muted-foreground/40 hover:text-foreground transition-all duration-300 ease-out cursor-pointer flex items-center gap-2 "
                >
                  {t.nav.collections}
                  <ChevronDown style={{ fontSize: "12px" }} />
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" sideOffset={8}>
                <DropdownMenuItem asChild>
                  <Link href="/shop?category=flowers">
                    {t.collections.categories.flowers}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shop?category=people">
                    {t.collections.categories.people}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shop?category=objects">
                    {t.collections.categories.objects}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="text-base text-muted-foreground/40 hover:text-foreground transition-all duration-300 ease-out cursor-pointer"
            >
              {t.nav.about}
            </Link>
            <Link
              href="#contact"
              className="text-base text-muted-foreground/40 hover:text-foreground transition-all duration-300 ease-out cursor-pointer"
            >
              {t.nav.contact}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer">
              <Search size={20} />
            </button>

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
                sideOffset={8}
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-6 px-6 z-50">
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                className="text-base text-muted-foreground hover:text-foreground py-2"
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
                className="text-base text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                href="#contact"
                className="text-base text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>

              <div className="pt-4 space-y-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <button className="text-foreground hover:text-foreground/70 transition-colors">
                    <Search size={20} />
                  </button>

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
