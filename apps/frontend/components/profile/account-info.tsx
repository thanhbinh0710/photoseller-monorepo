"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";
import { toast } from "sonner";

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
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { t } = useLanguage();
  const [formData, setFormData] = useState<UserAccountInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<UserAccountInfo>>({});

  // Fetch user data từ BE
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoadingData(true);
        const response = await fetch("http://localhost:8000/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Lỗi khi tải dữ liệu");
        }

        const data = await response.json();
        if (data.data) {
          setFormData({
            firstName: data.data.firstName || "",
            lastName: data.data.lastName || "",
            phone: data.data.telephones?.[0]?.phoneNumber || "",
            email: data.data.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Không thể tải dữ liệu hồ sơ");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchUserData();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<UserAccountInfo> = {};

    if (!formData.firstName) {
      newErrors.firstName = "Vui lòng nhập họ";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Vui lòng nhập tên";
    }

    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }

    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
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
      const response = await fetch("http://localhost:8000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật thông tin");
      }

      if (onSave) {
        await onSave(formData);
      }
      toast.success("Thông tin đã được lưu");
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Lỗi khi lưu thông tin");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Hồ sơ cá nhân
      </h2>

      <form onSubmit={handleSave} className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ
            </label>
            <Input
              placeholder="Vũ Trịnh"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              className={errors.firstName ? "border-red-500" : "text-gray-700"}
              disabled={isSaving || externalLoading || isLoadingData}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên
            </label>
            <Input
              placeholder="Thạnh Bình"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              className={errors.lastName ? "border-red-500" : "text-gray-400"}
              disabled={isSaving || externalLoading || isLoadingData}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <Input
            placeholder="090132648"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className={errors.phone ? "border-red-500" : "text-gray-400"}
            disabled={isSaving || externalLoading || isLoadingData}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            placeholder="trinhthanhbinh2015@gmail.com"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className={errors.email ? "border-red-500" : "text-gray-400"}
            disabled={isSaving || externalLoading || isLoadingData}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            type="submit"
            disabled={isSaving || externalLoading || isLoadingData}
          >
            {isSaving || externalLoading || isLoadingData
              ? "Đang lưu..."
              : "Lưu thông tin"}
          </Button>
          <Button
            type="button"
            variant="outline"
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
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}
