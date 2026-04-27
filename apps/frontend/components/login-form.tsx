"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";
import { loginUser } from "@/lib/api";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/lib/auth-validators";
import { PasswordInput } from "@/components/password-input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Call backend API to login
      const result = await loginUser({
        email: data.email,
        password: data.password,
      });

      // Show success message
      toast.success(t.auth.login.successMessage || "Đăng nhập thành công!");

      // Set logged in status
      localStorage.setItem("user_logged_in", "true");

      // Redirect to home page
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Đăng nhập thất bại";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={120}
          height={40}
          className="h-auto w-auto"
        />
      </Link>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t.auth.login.title}</CardTitle>
          <CardDescription>
            {t.auth.login.subtitle || "Nhập email của bạn để đăng nhập"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className={cn("flex flex-col gap-6")}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FieldGroup>
              {/* Email Field */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">
                  {t.auth.login.emailLabel}
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.auth.login.emailPlaceholder}
                  disabled={isSubmitting}
                  {...register("email")}
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs">{errors.email.message}</p>
                )}
              </Field>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">
                    {t.auth.login.passwordLabel}
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    {t.auth.login.forgotPassword || "Quên mật khẩu?"}
                  </Link>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordInput
                      id="password"
                      placeholder={t.auth.login.passwordPlaceholder}
                      disabled={isSubmitting}
                      error={errors.password?.message}
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                variant="primary"
              >
                {isSubmitting ? "Đang đăng nhập..." : t.auth.login.submitButton}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {t.auth.login.noAccount || "Chưa có tài khoản? "}
                </span>
                <Link
                  href="/signup"
                  className="font-semibold underline-offset-4 hover:underline text-foreground"
                >
                  {t.auth.login.signUp || "Đăng ký"}
                </Link>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
