"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";
import { toast } from "sonner";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";

interface UserAccountInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface AccountInfoProps {
  userInfo?: UserAccountInfo;
  onSave?: (info: UserAccountInfo) => void;
  isLoading?: boolean;
}

export function AccountInfo({
  userInfo,
  onSave,
  isLoading: externalLoading = false,
}: AccountInfoProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { t } = useLanguage();
  const { userProfile, isLoading: isLoadingData } = useFetchUserProfile();
  const [telephoneId, setTelephoneId] = useState<number | undefined>();
  const [formData, setFormData] = useState<UserAccountInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<UserAccountInfo>>({});

  // Update form when userProfile is fetched
  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        phone: userProfile.phone || "",
        email: userProfile.email || "",
      });
      setTelephoneId(userProfile.telephoneId);
    }
  }, [userProfile]);

  const validateForm = () => {
    const newErrors: Partial<UserAccountInfo> = {};

    if (!formData.firstName) {
      newErrors.firstName = t.profile.accountInfo.errorFirstName;
    }

    if (!formData.lastName) {
      newErrors.lastName = t.profile.accountInfo.errorLastName;
    }

    if (!formData.phone) {
      newErrors.phone = t.profile.accountInfo.errorPhone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("access_token");

      // Update profile (firstName, lastName)
      const profileResponse = await fetch(
        "http://localhost:8000/user/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        },
      );

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        throw new Error(`Profile update failed: ${JSON.stringify(errorData)}`);
      }

      // Update phone if it changed
      if (formData.phone) {
        if (telephoneId) {
          // Update existing phone
          const phoneResponse = await fetch(
            `http://localhost:8000/user/telephones/${telephoneId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                phoneNumber: formData.phone,
              }),
            },
          );

          if (!phoneResponse.ok) {
            const errorData = await phoneResponse.json();
            throw new Error(
              `Phone update failed: ${JSON.stringify(errorData)}`,
            );
          }
        } else {
          // Create new phone if doesn't exist
          const phoneResponse = await fetch(
            `http://localhost:8000/user/telephones`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                phoneNumber: formData.phone,
                isPrimary: true,
              }),
            },
          );

          if (!phoneResponse.ok) {
            const errorData = await phoneResponse.json();
            throw new Error(
              `Phone creation failed: ${JSON.stringify(errorData)}`,
            );
          }
        }
      }

      if (onSave) {
        await onSave(formData);
      }
      toast.success(t.profile.accountInfo.successMessage);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t.profile.accountInfo.errorMessage,
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
      <h2 className="text-2xl font-semibold text-white mb-6">
        {t.profile.accountInfo.title}
      </h2>

      <form onSubmit={handleSave} className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {t.profile.accountInfo.firstNameLabel}
            </label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                errors.firstName ? "border-red-500" : ""
              }`}
              placeholder={t.profile.accountInfo.firstNameLabel}
              disabled={isSaving || externalLoading || isLoadingData}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {t.profile.accountInfo.lastNameLabel}
            </label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                errors.lastName ? "border-red-500" : ""
              }`}
              placeholder={t.profile.accountInfo.lastNameLabel}
              disabled={isSaving || externalLoading || isLoadingData}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            {t.profile.accountInfo.phoneLabel}
          </label>
          <Input
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder={t.profile.accountInfo.phoneLabel}
            disabled={isSaving || externalLoading || isLoadingData}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            {t.profile.accountInfo.emailLabel}
          </label>
          <Input
            type="email"
            value={formData.email}
            className="bg-neutral-800 text-neutral-400 cursor-not-allowed border-neutral-700"
            disabled={true}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            type="submit"
            variant="save"
            disabled={isSaving || externalLoading || isLoadingData}
          >
            {isSaving || externalLoading || isLoadingData
              ? t.profile.accountInfo.saveButton + "..."
              : t.profile.accountInfo.saveButton}
          </Button>
          <Button
            type="button"
            onClick={() => {
              // Reset về data từ API
              setFormData({
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email,
              });
              setErrors({});
            }}
            disabled={isSaving || externalLoading || isLoadingData}
            variant="cancel"
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}
