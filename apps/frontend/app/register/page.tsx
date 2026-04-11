"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { registerUser } from "@/lib/api";
import { toast } from "sonner";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ComponentType<{ size: number; className: string }>;
  error?: string;
  disabled?: boolean;
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  disabled,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="text-background/80 font-medium text-xs block mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3 top-3.5 text-gray-400" />
        )}
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`!bg-white !text-gray-800 !py-3 pl-10 ${error ? "border-red-500" : ""}`}
          style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
        />
      </div>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function RegisterPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >({});

  const validateForm = () => {
    const newErrors: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }> = {};

    if (!formData.firstName) {
      newErrors.firstName = t.auth.register.errorFirstName;
    }

    if (!formData.lastName) {
      newErrors.lastName = t.auth.register.errorLastName;
    }

    if (!formData.email) {
      newErrors.email = t.auth.register.errorEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.auth.register.errorEmailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.auth.register.errorPassword;
    } else if (formData.password.length < 6) {
      newErrors.password = t.auth.register.errorPasswordMin;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.auth.register.errorConfirmPassword;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.auth.register.errorPasswordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Call backend API to register
      const result = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // Show success message
      toast.success(t.auth.register.successMessage || "Đăng ký thành công!");

      // Redirect to home page
      window.location.href = "/";
    } catch (err) {
      console.error("Register error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Đăng ký thất bại";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-foreground flex flex-col items-center justify-center px-6 py-20 ">
      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <Image
            src="/Logo-darktheme.svg"
            alt="FotoByKien Logo"
            width={240}
            height={240}
            className="mx-auto"
            priority
          />
        </div>

        <div
          className="rounded-lg p-8 shadow-xl relative overflow-hidden border border-background/30"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="relative z-10">
            {/* Register Form */}
            <div>
              <h1 className="text-xl font-semibold text-background/80 mb-6">
                {t.auth.register.title}
              </h1>

              <form onSubmit={handleRegisterSubmit}>
                {/* Name Field */}
                <FormField
                  label={t.auth.register.firstNameLabel}
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, firstName: value }))
                  }
                  placeholder={t.auth.register.firstNamePlaceholder}
                  icon={User}
                  error={errors.firstName}
                  disabled={loading}
                />
                <FormField
                  label={t.auth.register.lastNameLabel}
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, lastName: value }))
                  }
                  placeholder={t.auth.register.lastNamePlaceholder}
                  icon={User}
                  error={errors.lastName}
                  disabled={loading}
                />

                {/* Email Field */}
                <FormField
                  label={t.auth.register.emailLabel}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, email: value }))
                  }
                  placeholder={t.auth.register.emailPlaceholder}
                  icon={Mail}
                  error={errors.email}
                  disabled={loading}
                />

                {/* Password Field */}
                <div className="mb-4">
                  <label className="text-background/80 font-medium text-xs block mb-2">
                    {t.auth.register.passwordLabel}
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t.auth.register.passwordPlaceholder}
                      disabled={loading}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className={`!bg-white !text-gray-800 !py-3 pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                      style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      className="absolute right-3 top-3.5"
                    >
                      {showPassword ? (
                        <EyeOff size={16} className="text-gray-400" />
                      ) : (
                        <Eye size={16} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-6">
                  <label className="text-background/80 font-medium text-xs block mb-2">
                    {t.auth.register.confirmPasswordLabel}
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t.auth.register.confirmPasswordPlaceholder}
                      disabled={loading}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className={`!bg-white !text-gray-800 !py-3 pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={loading}
                      className="absolute right-3 top-3.5"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} className="text-gray-400" />
                      ) : (
                        <Eye size={16} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full !bg-background !text-foreground !border-background hover:!bg-background/90 hover:!text-foreground font-bold border-8 transition-colors !py-6"
                >
                  {loading ? "Đang đăng ký..." : t.auth.register.submitButton}
                </Button>
              </form>

              <div>
                <p className="text-sm text-center text-background mt-4">
                  {t.auth.register.hasAccount}{" "}
                  <a href="/login" className="!text-blue-700 hover:!underline">
                    {t.auth.register.signIn}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
