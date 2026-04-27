"use client";

import { UserProfileCard } from "./user-profile-card";
import { UserAddressesCard } from "./user-addresses-card";
import { UserOrdersCard } from "./user-orders-card";

export function UserDashboard() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#fffce1] mb-2">
          Tài khoản của bạn
        </h1>
        <p className="text-[#fffce1]/70">
          Quản lý thông tin cá nhân và đơn hàng của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserProfileCard />
        <UserAddressesCard />
        <UserOrdersCard />
      </div>
    </div>
  );
}
