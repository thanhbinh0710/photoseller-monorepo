"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";

interface AccountInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    firstName: string;
    lastName: string;
    phone?: string;
    telephoneId?: number;
  };
  onSuccess?: () => void;
}

export function AccountInfoModal({
  isOpen,
  onOpenChange,
  initialData,
  onSuccess,
}: AccountInfoModalProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    phone: initialData?.phone || "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t.profile.accountInfo.errorFirstName;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t.profile.accountInfo.errorLastName;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.profile.accountInfo.errorPhone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Update profile (firstName, lastName)
      const profileResponse = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      // Update phone if provided
      if (formData.phone) {
        if (initialData?.telephoneId) {
          // Update existing phone
          const phoneResponse = await fetch(
            `${API_BASE_URL}/user/telephones/${initialData.telephoneId}`,
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
            throw new Error(errorData.message || "Failed to update phone");
          }
        } else {
          // Create new phone
          const phoneResponse = await fetch(`${API_BASE_URL}/user/telephones`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              phoneNumber: formData.phone,
              isPrimary: true,
            }),
          });

          if (!phoneResponse.ok) {
            const errorData = await phoneResponse.json();
            throw new Error(errorData.message || "Failed to add phone");
          }
        }
      }

      toast.success(
        t.profile.accountInfo.successMessage || "Updated successfully",
      );
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t.profile.accountInfo.errorMessage || "An error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t.profile.accountInfo.editTitle || "Edit Account Information"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">
              {t.profile.accountInfo.firstNameLabel}
            </label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              placeholder={t.profile.accountInfo.firstNameLabel}
              disabled={isLoading}
              className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">
              {t.profile.accountInfo.lastNameLabel}
            </label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              placeholder={t.profile.accountInfo.lastNameLabel}
              disabled={isLoading}
              className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">
              {t.profile.accountInfo.phoneLabel || "Phone"}
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              placeholder={
                t.profile.accountInfo.phonePlaceholder || "+84901234567"
              }
              disabled={isLoading}
              className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </form>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {t.common.cancel || "Cancel"}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading
              ? t.common.saving || "Saving..."
              : t.common.save || "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
