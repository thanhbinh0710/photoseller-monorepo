"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { rawUserProfile, isLoading } = useFetchUserProfile();

  useEffect(() => {
    const status = localStorage.getItem("user_logged_in");
    if (status !== "true") {
      window.location.href = "/login";
      return;
    }
    setIsLoggedIn(true);
  }, []);

  // Check if user is admin
  useEffect(() => {
    if (!isLoading && rawUserProfile && rawUserProfile.role !== "ADMIN") {
      // Redirect non-admin users to user account page
      window.location.href = "/account/profile";
    }
  }, [isLoading, rawUserProfile]);

  if (!isLoggedIn || isLoading) {
    return null;
  }

  if (rawUserProfile?.role !== "ADMIN") {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </div>
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
