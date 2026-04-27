"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <div className="min-h-screen bg-[#05090c]">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
