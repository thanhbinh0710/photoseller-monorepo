"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  Lock,
  Package,
  Menu as MenuIcon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import clsx from "clsx";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";
import { useLanguage } from "@/lib/language-context";

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
  const { t } = useLanguage();

  // Use fetched data if userInfo prop is not provided
  const displayUserInfo = userInfo || userProfile;

  const menuItems = [
    {
      key: "account",
      label: t.profile.sidebar.accountInfo,
      icon: <User size={18} />,
      children: [
        {
          key: "profile",
          label: t.profile.sidebar.personalProfile,
          icon: <User size={16} />,
        },
        {
          key: "addresses",
          label: t.profile.sidebar.addressBook,
          icon: <MapPin size={16} />,
        },
        {
          key: "password",
          label: t.profile.sidebar.changePassword,
          icon: <Lock size={16} />,
        },
      ],
    },
    {
      key: "orders",
      label: t.profile.sidebar.myOrders,
      icon: <Package size={18} />,
    },
    {
      key: "signOut",
      label: t.profile.sidebar.signOut,
      icon: <LogOut size={18} />,
      isSignOut: true,
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
          </div>
        </div>

        {/* Custom Menu */}
        <Accordion type="single" collapsible defaultValue="account">
          {menuItems.map((item) => (
            <div key={item.key}>
              {item.children ? (
                <AccordionItem value={item.key}>
                  <AccordionTrigger className="font-medium py-3">
                    <span className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-sm text-neutral-400 hover:text-neutral-200 ">
                        {item.label}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="py-1">
                    <div className="ml-6 space-y-2">
                      {item.children.map((child) => (
                        <button
                          key={child.key}
                          onClick={() => handleMenuClick(child.key)}
                          className={clsx(
                            "w-full flex items-center gap-2 px-4 py-3 text-sm rounded transition-colors cursor-pointer text-left",
                            activeTab === child.key
                              ? "bg-neutral-800 text-neutral-200"
                              : "text-neutral-400 hover:bg-neutral-800",
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
                  onClick={() => {
                    if (item.isSignOut) {
                      localStorage.removeItem("user_logged_in");
                      window.location.href = "/";
                    } else {
                      handleMenuClick(item.key);
                    }
                  }}
                  className={clsx(
                    "w-full flex items-center gap-2 px-4 py-3 text-sm rounded transition-colors cursor-pointer text-left",
                    item.isSignOut
                      ? "text-red-400 hover:bg-red-400/10 font-medium"
                      : activeTab === item.key
                        ? "bg-neutral-800 text-neutral-200 "
                        : "text-neutral-400 hover:bg-neutral-800",
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
