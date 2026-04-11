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
      <label className="block text-sm font-medium text-neutral-300 mb-2">
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
          className={`pr-10 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
            error ? "border-red-500" : ""
          }`}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => onTogglePassword(field)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
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
    <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
      <h2 className="text-2xl font-semibold text-white mb-6">Đổi mật khẩu</h2>

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
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-neutral-100 mb-2">
            Yêu cầu mật khẩu:
          </h4>
          <ul className="text-sm text-neutral-400 space-y-1">
            <li>✓ Ít nhất 8 ký tự</li>
            <li>✓ Chứa ít nhất một chữ hoa (A-Z)</li>
            <li>✓ Chứa ít nhất một chữ thường (a-z)</li>
            <li>✓ Chứa ít nhất một số (0-9)</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-100 text-black px-6 py-2 rounded cursor-pointer hover:bg-amber-200 disabled:opacity-50"
          >
            {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>
          <button
            type="button"
            className="border border-neutral-700 text-neutral-300 px-6 py-2 rounded hover:bg-neutral-800 cursor-pointer disabled:opacity-50"
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
          </button>
        </div>
      </form>
    </div>
  );
}
