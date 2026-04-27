"use client";

import { Addresses } from "@/components/profile/addresses";
import { useState } from "react";

export default function AccountAddressPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#fffce1] mb-2">
          Địa chỉ giao hàng
        </h1>
        <p className="text-[#fffce1]/70">
          Quản lý các địa chỉ giao hàng của bạn
        </p>
      </div>
      <Addresses key={refreshKey} onRefresh={handleRefresh} />
    </div>
  );
}
