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

interface PhoneModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    id?: number;
    phoneNumber: string;
    isPrimary?: boolean;
  };
  onSuccess?: () => void;
}

export function PhoneModal({
  isOpen,
  onOpenChange,
  initialData,
  onSuccess,
}: PhoneModalProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    phoneNumber: initialData?.phoneNumber || "",
    isPrimary: initialData?.isPrimary || false,
  });

  const isEditMode = !!initialData?.id;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
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

      const url = isEditMode
        ? `${API_BASE_URL}/user/telephones/${initialData?.id}`
        : `${API_BASE_URL}/user/telephones`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save phone number");
      }

      // If setting as primary, update primary status
      if (formData.isPrimary && initialData?.id) {
        const primaryResponse = await fetch(
          `${API_BASE_URL}/user/telephones/${initialData.id}/primary`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!primaryResponse.ok) {
          const errorData = await primaryResponse.json();
          throw new Error(errorData.message || "Failed to set primary phone");
        }
      }

      toast.success(
        isEditMode
          ? "Phone number updated successfully"
          : "Phone number added successfully",
      );
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Phone Number" : "Add Phone Number"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              placeholder="+84901234567"
              disabled={isLoading}
              className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Primary Phone Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPrimary"
              checked={formData.isPrimary}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isPrimary: e.target.checked,
                }))
              }
              disabled={isLoading}
              className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-blue-600"
            />
            <label
              htmlFor="isPrimary"
              className="text-sm font-medium text-neutral-300 cursor-pointer"
            >
              Set as primary phone
            </label>
          </div>
        </form>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
