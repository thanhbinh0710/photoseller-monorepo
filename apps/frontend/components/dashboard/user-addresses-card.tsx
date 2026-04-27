"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";

interface Address {
  id: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

export function UserAddressesCard() {
  const { userProfile, isLoading } = useFetchUserProfile();
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (userProfile?.addresses && userProfile.addresses.length > 0) {
      const defaultAddr = userProfile.addresses.find(
        (addr: Address) => addr.isDefault,
      );
      setDefaultAddress(defaultAddr || userProfile.addresses[0]);
    }
  }, [userProfile]);

  if (isLoading) {
    return (
      <Card className="bg-[#0a0e12] border-[#333333] p-6 flex flex-col justify-between h-full">
        <div className="animate-pulse">
          <div className="h-6 bg-[#333333] rounded mb-4 w-1/2"></div>
          <div className="h-4 bg-[#333333] rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-[#333333] rounded mb-2 w-full"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0a0e12] border-[#333333] p-6 flex flex-col justify-between h-full hover:border-[#7cb9e8] transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={20} className="text-[#7cb9e8]" />
          <h3 className="text-lg font-bold text-[#fffce1]">
            Địa chỉ giao hàng
          </h3>
        </div>

        {/* Address Content */}
        {defaultAddress ? (
          <div className="space-y-3 mb-6">
            <div>
              <p className="text-[#fffce1]/70 text-sm font-semibold mb-1">
                {defaultAddress.name}
              </p>
              <p className="text-[#fffce1]/70 text-sm">
                {defaultAddress.address}
              </p>
              <p className="text-[#fffce1]/70 text-sm">
                {defaultAddress.ward}, {defaultAddress.district},{" "}
                {defaultAddress.city}
              </p>
              <p className="text-[#fffce1]/70 text-sm mt-2">
                {defaultAddress.phone}
              </p>
            </div>
            {defaultAddress.isDefault && (
              <div className="inline-block px-2 py-1 bg-[#7cb9e8]/20 border border-[#7cb9e8] rounded text-[#7cb9e8] text-xs font-semibold">
                Mặc định
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 mb-6">
            <MapPin size={32} className="text-[#333333] mx-auto mb-2" />
            <p className="text-[#fffce1]/70 text-sm">
              Chưa có địa chỉ giao hàng
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4 border-t border-[#333333]">
        <Link href="/account/address" className="block w-full">
          <Button className="w-full bg-[#7cb9e8] text-[#05090c] hover:bg-[#6ba8d9]">
            {defaultAddress ? (
              <>
                <ArrowRight size={16} className="mr-2" />
                Quản lý địa chỉ
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                Thêm địa chỉ
              </>
            )}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
