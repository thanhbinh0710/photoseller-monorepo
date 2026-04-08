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
  Settings,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Dropdown, Badge, Popover } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "./language-switcher";
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

  // Collections dropdown menu
  const collectionsMenu = {
    items: [
      {
        key: "flowers",
        label: (
          <Link
            href="/shop?category=flowers"
            className="text-base hover:text-foreground"
          >
            {t.collections.categories.flowers}
          </Link>
        ),
      },
      {
        key: "people",
        label: (
          <Link
            href="/shop?category=people"
            className="text-base hover:text-foreground"
          >
            {t.collections.categories.people}
          </Link>
        ),
      },
      {
        key: "objects",
        label: (
          <Link
            href="/shop?category=objects"
            className="text-base hover:text-foreground"
          >
            {t.collections.categories.objects}
          </Link>
        ),
      },
    ],
  };

  // Account popover content
  const accountPopoverContent = (
    <div className="bg-[#05090c] rounded-sm py-1 min-w-[200px]">
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
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 text-[14px]  text-muted-foreground/40! hover:text-foreground! transition-all duration-300 ease-out uppercase font-sans font-semibold"
          >
            <Settings size={16} className="opacity-70" /> SETTINGS
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
            <Dropdown menu={collectionsMenu} trigger={["hover"]}>
              <Link
                href="/collections"
                className="text-base text-muted-foreground/40 hover:text-foreground transition-all duration-300 ease-out cursor-pointer flex items-center gap-2 "
              >
                {t.nav.collections}
                <DownOutlined style={{ fontSize: "12px" }} />
              </Link>
            </Dropdown>

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
              content={accountPopoverContent}
              trigger="click"
              placement="bottomRight"
              open={isAccountPopoverOpen}
              onOpenChange={setIsAccountPopoverOpen}
              overlayClassName="border-2 rounded-lg border-border !fixed"
              arrow={false}
            >
              <button className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer">
                <UserOutlined style={{ fontSize: "20px" }} />
              </button>
            </Popover>

            <button className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer">
              <Badge count={0} size="small">
                <ShoppingCartOutlined style={{ fontSize: "20px" }} />
              </Badge>
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
                    content={accountPopoverContent}
                    trigger="click"
                    placement="bottomRight"
                    open={isAccountPopoverOpen}
                    onOpenChange={setIsAccountPopoverOpen}
                    overlayClassName="border border-border !fixed "
                    arrow={false}
                  >
                    <button className="text-foreground hover:text-foreground/70 transition-colors">
                      <UserOutlined style={{ fontSize: "20px" }} />
                    </button>
                  </Popover>

                  <button className="text-foreground hover:text-foreground/70 transition-colors relative">
                    <Badge count={0} size="small">
                      <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                    </Badge>
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
