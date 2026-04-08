"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ShopContentComponent = dynamic(() => import("./shop-content"), {
  ssr: false,
});

export function ShopContentWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ShopContentComponent />
    </Suspense>
  );
}
