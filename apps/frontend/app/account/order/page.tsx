"use client";

import { Orders } from "@/components/profile/orders";
import { useState } from "react";

export default function AccountOrderPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#fffce1] mb-2">
          Đơn hàng của bạn
        </h1>
        <p className="text-[#fffce1]/70">Xem và quản lý các đơn hàng của bạn</p>
      </div>
      <Orders key={refreshKey} onRefresh={handleRefresh} />
    </div>
  );
}
