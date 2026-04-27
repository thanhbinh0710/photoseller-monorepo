"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useLanguage } from "@/lib/language-context";
import { registerUser } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PasswordInput } from "@/components/password-input";
import { registerSchema, type RegisterFormData } from "@/lib/auth-validators";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Call backend API to register
      const result = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
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
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
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

      <Card {...props} className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t.auth.register.title}</CardTitle>
          <CardDescription>
            {t.auth.register.subtitle || "Tạo một tài khoản mới"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className={cn("flex flex-col gap-6")}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FieldGroup className="grid sm:grid-cols-2 gap-4">
              {/* First Name Field */}
              <Field data-invalid={!!errors.firstName}>
                <FieldLabel htmlFor="firstName">
                  {t.auth.register.firstNameLabel || "Họ"}
                </FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder={t.auth.register.firstNamePlaceholder || "Nguyễn"}
                  disabled={isSubmitting}
                  {...register("firstName")}
                  className={cn(errors.firstName && "border-red-500")}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </Field>

              {/* Last Name Field */}
              <Field data-invalid={!!errors.lastName}>
                <FieldLabel htmlFor="lastName">
                  {t.auth.register.lastNameLabel || "Tên"}
                </FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder={t.auth.register.lastNamePlaceholder || "Văn A"}
                  disabled={isSubmitting}
                  {...register("lastName")}
                  className={cn(errors.lastName && "border-red-500")}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                {t.auth.register.emailLabel}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t.auth.register.emailPlaceholder}
                disabled={isSubmitting}
                {...register("email")}
                className={cn(errors.email && "border-red-500")}
              />
              {errors.email && (
                <p className="text-red-600 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                {t.auth.register.passwordLabel || "Mật khẩu"}
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    id="password"
                    placeholder={t.auth.register.passwordPlaceholder}
                    disabled={isSubmitting}
                    error={errors.password?.message}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                {t.auth.register.confirmPasswordLabel || "Nhập lại mật khẩu"}
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    id="confirmPassword"
                    placeholder={t.auth.register.confirmPasswordPlaceholder}
                    disabled={isSubmitting}
                    error={errors.confirmPassword?.message}
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
              {isSubmitting ? "Đang đăng ký..." : t.auth.register.submitButton}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {t.auth.register.haveAccount || "Đã có tài khoản? "}
              </span>
              <Link
                href="/login"
                className="font-semibold underline-offset-4 hover:underline text-foreground"
              >
                {t.auth.register.signIn || "Đăng nhập"}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
