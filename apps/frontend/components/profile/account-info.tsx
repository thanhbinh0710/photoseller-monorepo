"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";
import { AccountInfoModal } from "./modals/account-info-modal";
import { Edit2 } from "lucide-react";

interface AccountInfoDisplayProps {
  onRefresh?: () => void;
}

export function AccountInfo({ onRefresh }: AccountInfoDisplayProps) {
  const { t } = useLanguage();
  const { userProfile, isLoading } = useFetchUserProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [primaryPhone, setPrimaryPhone] = useState<{
    phoneNumber: string;
    id?: number;
  } | null>(null);

  // Extract primary phone from profile
  useEffect(() => {
    if (userProfile?.telephones && userProfile.telephones.length > 0) {
      const primary = userProfile.telephones.find((t: any) => t.isPrimary);
      setPrimaryPhone(
        primary
          ? { phoneNumber: primary.phoneNumber, id: primary.id }
          : {
              phoneNumber: userProfile.telephones[0].phoneNumber,
              id: userProfile.telephones[0].id,
            },
      );
    }
  }, [userProfile]);

  const handleModalSuccess = () => {
    onRefresh?.();
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {t.profile.accountInfo.title}
        </h2>
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">
            {t.profile.accountInfo.title}
          </h2>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            {t.common.edit || "Edit"}
          </Button>
        </div>

        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">
              {t.profile.accountInfo.firstNameLabel}
            </label>
            <p className="text-white text-lg">
              {userProfile?.firstName || "—"}
            </p>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">
              {t.profile.accountInfo.lastNameLabel}
            </label>
            <p className="text-white text-lg">{userProfile?.lastName || "—"}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">
              {t.profile.accountInfo.phoneLabel}
            </label>
            <p className="text-white text-lg">
              {primaryPhone?.phoneNumber || "—"}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">
              {t.profile.accountInfo.emailLabel}
            </label>
            <p className="text-white text-lg">{userProfile?.email || "—"}</p>
          </div>
        </div>
      </div>

      {/* Account Info Modal */}
      <AccountInfoModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={{
          firstName: userProfile?.firstName || "",
          lastName: userProfile?.lastName || "",
          phone: primaryPhone?.phoneNumber || "",
          telephoneId: primaryPhone?.id,
        }}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
