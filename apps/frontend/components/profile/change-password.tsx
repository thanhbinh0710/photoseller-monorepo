"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface PasswordInputProps {
  label: string;
  field: "current" | "new" | "confirm";
  value: string;
  error?: string;
  showPassword: boolean;
  onTogglePassword: (field: "current" | "new" | "confirm") => void;
  onChange: (value: string) => void;
  isLoading: boolean;
}

function PasswordInput({
  label,
  field,
  value,
  error,
  showPassword,
  onTogglePassword,
  onChange,
  isLoading,
}: PasswordInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            field === "current"
              ? "Nhập mật khẩu hiện tại"
              : field === "new"
                ? "Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                : "Nhập lại mật khẩu mới"
          }
          className={`pr-10 ${error ? "border-red-500" : ""}`}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => onTogglePassword(field)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = "Mật khẩu phải chứa chữ hoa, chữ thường và số";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
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
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Mật khẩu đã được cập nhật thành công");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Lỗi khi cập nhật mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Đổi mật khẩu
      </h2>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <PasswordInput
          label="Mật khẩu hiện tại"
          field="current"
          value={formData.currentPassword}
          error={errors.currentPassword}
          showPassword={showPasswords.current}
          onTogglePassword={togglePasswordVisibility}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              currentPassword: value,
            }))
          }
          isLoading={isLoading}
        />

        <PasswordInput
          label="Mật khẩu mới"
          field="new"
          value={formData.newPassword}
          error={errors.newPassword}
          showPassword={showPasswords.new}
          onTogglePassword={togglePasswordVisibility}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              newPassword: value,
            }))
          }
          isLoading={isLoading}
        />

        <PasswordInput
          label="Xác nhận mật khẩu mới"
          field="confirm"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          showPassword={showPasswords.confirm}
          onTogglePassword={togglePasswordVisibility}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: value,
            }))
          }
          isLoading={isLoading}
        />

        {/* Password Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">
            Yêu cầu mật khẩu:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Ít nhất 8 ký tự</li>
            <li>✓ Chứa ít nhất một chữ hoa (A-Z)</li>
            <li>✓ Chứa ít nhất một chữ thường (a-z)</li>
            <li>✓ Chứa ít nhất một số (0-9)</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
              setErrors({});
            }}
            disabled={isLoading}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}
