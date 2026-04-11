"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { AccountInfo } from "@/components/profile/account-info";
import { Orders } from "@/components/profile/orders";
import { Addresses } from "@/components/profile/addresses";

import { ChangePassword } from "@/components/profile/change-password";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("user_logged_in");
    if (status !== "true") {
      window.location.href = "/login";
    }
    setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <AccountInfo />;
      case "addresses":
        return <Addresses />;
      case "password":
        return <ChangePassword />;
      case "orders":
        return <Orders />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Header />

      {/* Main Content - Fills remaining space */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </main>
  );
}
