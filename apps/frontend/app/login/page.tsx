"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { loginUser } from "@/lib/api";
import { toast } from "sonner";

export default function LoginPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = t.auth.login.errorEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.auth.login.errorEmailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.auth.login.errorPassword;
    } else if (formData.password.length < 6) {
      newErrors.password = t.auth.login.errorPasswordMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Call backend API to login
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Show success message
      toast.success(t.auth.login.successMessage || "Đăng nhập thành công!");

      // Redirect to home page
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Đăng nhập thất bại";
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
            {/* Login Form */}
            <div>
              <h1 className="text-xl font-semibold text-background/80 mb-6">
                {t.auth.login.title}
              </h1>

              <form onSubmit={handleLoginSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label className="text-background/80 font-medium text-xs block mb-2">
                    {t.auth.login.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                    <Input
                      type="email"
                      placeholder={t.auth.login.emailPlaceholder}
                      disabled={loading}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className={`!bg-white !text-gray-800 !py-3 pl-10 ${errors.email ? "border-red-500" : ""}`}
                      style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label className="text-background/80 font-medium text-xs block mb-2">
                    {t.auth.login.passwordLabel}
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t.auth.login.passwordPlaceholder}
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full !bg-background !text-foreground !border-background hover:!bg-background/90 hover:!text-foreground font-bold border-8 transition-colors !py-6"
                >
                  {loading ? "Đang đăng nhập..." : t.auth.login.submitButton}
                </Button>
              </form>

              <div>
                <p className="text-sm text-center text-background mt-4">
                  {t.auth.login.noAccount}{" "}
                  <a
                    href="/register"
                    className="!text-blue-700 hover:!underline"
                  >
                    {t.auth.login.signUp}
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
