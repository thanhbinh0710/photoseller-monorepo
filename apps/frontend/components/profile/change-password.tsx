"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/language-context";

interface PasswordInputProps {
  label: string;
  field: "current" | "new" | "confirm";
  value: string;
  error?: string;
  showPassword: boolean;
  onTogglePassword: (field: "current" | "new" | "confirm") => void;
  onChange: (value: string) => void;
  isLoading: boolean;
  placeholder: string;
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
  placeholder,
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
          placeholder={placeholder}
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
  const { t } = useLanguage();
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
      newErrors.currentPassword = t.profile.changePassword.errorCurrentPassword;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = t.profile.changePassword.errorNewPassword;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t.profile.changePassword.errorNewPasswordMin;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = t.profile.changePassword.errorNewPasswordStrength;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.profile.changePassword.errorConfirmPassword;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword =
        t.profile.changePassword.errorPasswordMismatch;
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
      toast.success(t.profile.changePassword.successMessage);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(t.profile.changePassword.errorMessage);
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
      <h2 className="text-2xl font-semibold text-white mb-6">
        {t.profile.changePassword.title}
      </h2>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <PasswordInput
          label={t.profile.changePassword.currentPassword}
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
          placeholder={t.profile.changePassword.currentPasswordPlaceholder}
        />

        <PasswordInput
          label={t.profile.changePassword.newPassword}
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
          placeholder={t.profile.changePassword.newPasswordPlaceholder}
        />

        <PasswordInput
          label={t.profile.changePassword.confirmPassword}
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
          placeholder={t.profile.changePassword.confirmPasswordPlaceholder}
        />

        {/* Password Requirements */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-neutral-100 mb-2">
            {t.profile.changePassword.passwordRequirements}
          </h4>
          <ul className="text-sm text-neutral-400 space-y-1">
            <li>✓ {t.profile.changePassword.requirementMin}</li>
            <li>✓ {t.profile.changePassword.requirementUppercase}</li>
            <li>✓ {t.profile.changePassword.requirementLowercase}</li>
            <li>✓ {t.profile.changePassword.requirementNumber}</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading} variant="save">
            {isLoading
              ? t.profile.changePassword.updating
              : t.profile.changePassword.submitButton}
          </Button>
          <Button
            type="button"
            variant="cancel"
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
            {t.profile.changePassword.cancel}
          </Button>
        </div>
      </form>
    </div>
  );
}
