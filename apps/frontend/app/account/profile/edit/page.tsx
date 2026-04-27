"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AccountInfo } from "@/components/profile/account-info";
import { useState } from "react";

export default function AccountProfileEditPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/account/profile"
          className="inline-flex items-center gap-2 mb-4 text-[#7cb9e8] hover:text-[#fffce1]"
        >
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-3xl font-bold text-[#fffce1] mb-2">
          Chỉnh sửa thông tin cá nhân
        </h1>
        <p className="text-[#fffce1]/70">
          Cập nhật tên, email, số điện thoại của bạn
        </p>
      </div>

      {/* Form */}
      <div className="bg-[#0a0e12] border border-[#333333] rounded-lg p-6">
        <AccountInfo key={refreshKey} onRefresh={handleRefresh} />
      </div>
    </div>
  );
}
