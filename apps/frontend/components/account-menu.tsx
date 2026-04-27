"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ShoppingBag, LayoutDashboard, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const { rawUserProfile } = useFetchUserProfile();
  const isAdmin = rawUserProfile?.role === "ADMIN";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_logged_in");
    window.location.href = "/login";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="text-foreground hover:text-foreground/80 transition-colors cursor-pointer">
          <User size={20} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 mt-3 sticky" align="end">
        {/* User Info Section */}
        <div className="p-4 bg-muted/30">
          <p className="font-semibold text-sm text-foreground">
            {rawUserProfile?.firstName} {rawUserProfile?.lastName}
          </p>
          <p className="text-xs text-muted-foreground">
            {rawUserProfile?.email}
          </p>
        </div>

        {/* Menu Items */}
        <div className="space-y-1 p-2">
          {isAdmin && (
            <Link href="/dashboard/account" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-sm font-semibold"
              >
                <LayoutDashboard size={16} className="mr-2" />
                DASHBOARD
              </Button>
            </Link>
          )}
          <Link href="/account/order" onClick={() => setOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start text-left text-sm font-semibold"
            >
              <ShoppingBag size={16} className="mr-2" />
              ORDERS
            </Button>
          </Link>
          <Link href="/account/profile" onClick={() => setOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start text-left text-sm font-semibold"
            >
              <User size={16} className="mr-2" />
              PROFILE
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
