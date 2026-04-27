"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit2, LogOut } from "lucide-react";
import Link from "next/link";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";
import { useLanguage } from "@/lib/language-context";

export function UserProfileCard() {
  const { userProfile, isLoading } = useFetchUserProfile();
  const { t } = useLanguage();
  const [initials, setInitials] = useState<string>("");

  useEffect(() => {
    if (userProfile?.firstName && userProfile?.lastName) {
      const first = userProfile.firstName.charAt(0).toUpperCase();
      const last = userProfile.lastName.charAt(0).toUpperCase();
      setInitials(first + last);
    }
  }, [userProfile]);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_logged_in");
    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <Card className="bg-[#0a0e12] border-[#333333] p-6 flex flex-col justify-between h-full">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-[#333333] rounded-full mb-4"></div>
          <div className="h-4 bg-[#333333] rounded mb-2 w-3/4"></div>
          <div className="h-3 bg-[#333333] rounded mb-4 w-1/2"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0a0e12] border-[#333333] p-6 flex flex-col justify-between h-full hover:border-[#7cb9e8] transition-colors">
      <div>
        {/* Avatar */}
        <div className="w-16 h-16 bg-[#7cb9e8] rounded-full flex items-center justify-center mb-4">
          <span className="text-[#05090c] font-bold text-xl">
            {initials || "U"}
          </span>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#fffce1] mb-1">
            {userProfile?.firstName} {userProfile?.lastName}
          </h3>
          <p className="text-[#fffce1]/70 text-sm mb-2">{userProfile?.email}</p>
          {userProfile?.phone && (
            <p className="text-[#fffce1]/70 text-sm">{userProfile.phone}</p>
          )}
        </div>

        {/* Card Content */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-[#fffce1]/70 text-sm">
            <User size={16} />
            <span>{t.profile.sidebar.personalProfile}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4 border-t border-[#333333]">
        <Link href="/account/profile/edit" className="block w-full">
          <Button
            variant="outline"
            className="w-full bg-transparent border-[#7cb9e8] text-[#7cb9e8] hover:bg-[#7cb9e8] hover:text-[#05090c]"
          >
            <Edit2 size={16} className="mr-2" />
            Chỉnh sửa
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full text-[#fffce1]/70 hover:text-red-400"
          onClick={handleSignOut}
        >
          <LogOut size={16} className="mr-2" />
          Đăng xuất
        </Button>
      </div>
    </Card>
  );
}
