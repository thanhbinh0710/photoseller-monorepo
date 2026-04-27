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

interface AddressModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    id?: number;
    label?: string;
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    isPrimary?: boolean;
  };
  onSuccess?: () => void;
}

export function AddressModal({
  isOpen,
  onOpenChange,
  initialData,
  onSuccess,
}: AddressModalProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    label: initialData?.label || "",
    street: initialData?.street || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    postalCode: initialData?.postalCode || "",
    country: initialData?.country || "Vietnam",
    isPrimary: initialData?.isPrimary || false,
  });

  const isEditMode = !!initialData?.id;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.label.trim()) {
      newErrors.label = "Label is required";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
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
        ? `${API_BASE_URL}/user/addresses/${initialData?.id}`
        : `${API_BASE_URL}/user/addresses`;

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
        throw new Error(errorData.message || "Failed to save address");
      }

      // If setting as primary, we may need to handle other addresses
      if (formData.isPrimary && isEditMode) {
        // No action needed, backend handles it
      }

      toast.success(
        isEditMode
          ? "Address updated successfully"
          : "Address added successfully",
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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Label */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">
              Label (e.g., Home, Office)
            </label>
            <Input
              type="text"
              value={formData.label}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  label: e.target.value,
                }))
              }
              placeholder="Home"
              disabled={isLoading}
              className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                errors.label ? "border-red-500" : ""
              }`}
            />
            {errors.label && (
              <p className="text-red-500 text-sm">{errors.label}</p>
            )}
          </div>

          {/* Street */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">
              Street Address
            </label>
            <Input
              type="text"
              value={formData.street}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
              placeholder="123 Main Street"
              disabled={isLoading}
              className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                errors.street ? "border-red-500" : ""
              }`}
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street}</p>
            )}
          </div>

          {/* City and State Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                City
              </label>
              <Input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                placeholder="Ho Chi Minh City"
                disabled={isLoading}
                className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                  errors.city ? "border-red-500" : ""
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                State
              </label>
              <Input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
                placeholder="Ho Chi Minh"
                disabled={isLoading}
                className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                  errors.state ? "border-red-500" : ""
                }`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>
          </div>

          {/* Postal Code and Country Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Postal Code
              </label>
              <Input
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }))
                }
                placeholder="700000"
                disabled={isLoading}
                className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                  errors.postalCode ? "border-red-500" : ""
                }`}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">{errors.postalCode}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Country
              </label>
              <Input
                type="text"
                value={formData.country}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                placeholder="Vietnam"
                disabled={isLoading}
                className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
                  errors.country ? "border-red-500" : ""
                }`}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Primary Address Checkbox */}
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
              Set as primary address
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
