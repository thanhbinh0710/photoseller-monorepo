"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { SmoothScrollWrapper } from "@/components/smooth-scroll-wrapper";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
    </>
  );
}
