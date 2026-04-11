"use client";

import { useState } from "react";
import { User, MapPin, Lock, Package, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import clsx from "clsx";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userInfo?: {
    firstName: string;
    lastName: string;
  };
}

export function ProfileSidebar({
  activeTab,
  onTabChange,
  userInfo,
}: ProfileSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userProfile } = useFetchUserProfile();

  // Use fetched data if userInfo prop is not provided
  const displayUserInfo = userInfo || userProfile;

  const menuItems = [
    {
      key: "account",
      label: "Thông tin tài khoản",
      icon: <User size={18} />,
      children: [
        {
          key: "profile",
          label: "Hồ sơ cá nhân",
          icon: <User size={16} />,
        },
        {
          key: "addresses",
          label: "Sổ địa chỉ",
          icon: <MapPin size={16} />,
        },
        {
          key: "password",
          label: "Đổi mật khẩu",
          icon: <Lock size={16} />,
        },
      ],
    },
    {
      key: "orders",
      label: "Đơn hàng của tôi",
      icon: <Package size={18} />,
    },
  ];

  const handleMenuClick = (key: string) => {
    onTabChange(key);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden mb-4 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2"
        >
          <MenuIcon size={24} />
        </Button>
      </div>

      {/* User Info Section */}
      <div
        className={clsx(
          "bg-neutral-900 rounded-lg shadow-sm p-6 h-fit border border-neutral-700 overflow-hidden",
          mobileOpen ? "block" : "hidden md:block",
        )}
      >
        <div className="flex items-center mb-3 border-b border-neutral-700 pb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-black font-semibold text-base">
            {displayUserInfo?.firstName?.charAt(0)?.toUpperCase() ||
              displayUserInfo?.lastName?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-white text-sm">
              {displayUserInfo &&
              (displayUserInfo.firstName?.trim() ||
                displayUserInfo.lastName?.trim())
                ? `${displayUserInfo.firstName || ""} ${displayUserInfo.lastName || ""}`.trim()
                : "User"}
            </h3>
            <p className="text-xs text-neutral-400">Thành viên</p>
          </div>
        </div>

        {/* Custom Menu */}
        <Accordion type="single" collapsible defaultValue="account">
          {menuItems.map((item) => (
            <div key={item.key}>
              {item.children ? (
                <AccordionItem value={item.key}>
                  <AccordionTrigger className="text-white font-medium hover:text-neutral-300">
                    <span className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1">
                    <div className="ml-6 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.key}
                          onClick={() => handleMenuClick(child.key)}
                          className={clsx(
                            "w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors cursor-pointer",
                            activeTab === child.key
                              ? "bg-neutral-800 text-white border-l-2 border-amber-100"
                              : "text-neutral-400 hover:text-white hover:bg-neutral-800",
                          )}
                        >
                          {child.icon}
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <button
                  onClick={() => handleMenuClick(item.key)}
                  className={clsx(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors cursor-pointer",
                    activeTab === item.key
                      ? "bg-neutral-800 text-white border-l-2 border-amber-100"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800",
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </Accordion>
      </div>
    </>
  );
}
