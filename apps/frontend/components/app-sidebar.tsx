"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  User,
  MapPin,
  ShoppingBag,
  LogOut,
  BarChart3,
  Users,
  Package,
} from "lucide-react";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";

// User navigation items
const userNavItems = [
  {
    title: "Account",
    url: "/account/profile",
    icon: <User />,
    isActive: true,
  },
  {
    title: "Addresses",
    url: "/account/address",
    icon: <MapPin />,
  },
  {
    title: "Orders",
    url: "/account/order",
    icon: <ShoppingBag />,
  },
];

// Admin navigation items
const adminNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/account",
    icon: <BarChart3 />,
    isActive: true,
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: <User />,
  },
  {
    title: "Addresses",
    url: "/dashboard/addresses",
    icon: <MapPin />,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: <ShoppingBag />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { rawUserProfile } = useFetchUserProfile();
  const isAdmin = rawUserProfile?.role === "ADMIN";
  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleLogout = () => {
    localStorage.removeItem("user_logged_in");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
