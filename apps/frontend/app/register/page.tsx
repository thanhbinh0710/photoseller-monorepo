"use client";

import { useState } from "react";
import Image from "next/image";
import { Form, Input, Button, Spin, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useLanguage } from "@/lib/language-context";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleRegisterSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Call backend API to register
      const result = await registerUser({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      // Show success message
      message.success(t.auth.register.successMessage || "Đăng ký thành công!");

      // Redirect to home page
      window.location.href = "/";
    } catch (err) {
      console.error("Register error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Đăng ký thất bại";
      message.error(errorMessage);
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

        <Spin spinning={loading}>
          <div
            className="rounded-lg p-8 shadow-xl relative overflow-hidden border-1 border-background/30"
            style={{ backgroundColor: " #ffffff" }}
          >
            <div className="relative z-10">
              {/* Register Form */}
              <div>
                <h1 className="text-xl font-semibold text-background/80 mb-6">
                  {t.auth.register.title}
                </h1>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleRegisterSubmit}
                  autoComplete="off"
                  requiredMark={false}
                >
                  <Form.Item
                    label={
                      <span className="text-background/80 font-medium text-xs">
                        {t.auth.register.nameLabel}
                      </span>
                    }
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: t.auth.register.errorName,
                      },
                    ]}
                  >
                    <Input
                      placeholder={t.auth.register.namePlaceholder}
                      disabled={loading}
                      prefix={
                        <UserOutlined style={{ color: "rgb(156, 163, 175)" }} />
                      }
                      size="large"
                      className="!bg-white !text-gray-800 !py-3"
                      style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-background/80 font-medium text-xs">
                        {t.auth.register.emailLabel}
                      </span>
                    }
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: t.auth.register.errorEmail,
                      },
                      {
                        type: "email",
                        message: t.auth.register.errorEmailInvalid,
                      },
                    ]}
                  >
                    <Input
                      placeholder={t.auth.register.emailPlaceholder}
                      disabled={loading}
                      prefix={
                        <MailOutlined style={{ color: "rgb(156, 163, 175)" }} />
                      }
                      size="large"
                      className="!bg-white !text-gray-800 !py-3"
                      style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-background/80 font-medium text-xs">
                        {t.auth.register.passwordLabel}
                      </span>
                    }
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: t.auth.register.errorPassword,
                      },
                      {
                        min: 6,
                        message: t.auth.register.errorPasswordMin,
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder={t.auth.register.passwordPlaceholder}
                      disabled={loading}
                      prefix={
                        <LockOutlined style={{ color: "rgb(156, 163, 175)" }} />
                      }
                      iconRender={(visible) =>
                        visible ? (
                          <EyeTwoTone style={{ color: "rgb(156, 163, 175)" }} />
                        ) : (
                          <EyeInvisibleOutlined
                            style={{ color: "rgb(156, 163, 175)" }}
                          />
                        )
                      }
                      size="large"
                      className="!bg-white !text-gray-800 !py-3"
                      style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-background/80 font-medium text-xs">
                        {t.auth.register.confirmPasswordLabel}
                      </span>
                    }
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: t.auth.register.errorConfirmPassword,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(t.auth.register.errorPasswordMismatch),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder={t.auth.register.confirmPasswordPlaceholder}
                      disabled={loading}
                      prefix={
                        <LockOutlined style={{ color: "rgb(156, 163, 175)" }} />
                      }
                      iconRender={(visible) =>
                        visible ? (
                          <EyeTwoTone style={{ color: "rgb(156, 163, 175)" }} />
                        ) : (
                          <EyeInvisibleOutlined
                            style={{ color: "rgb(156, 163, 175)" }}
                          />
                        )
                      }
                      size="large"
                      className="!bg-white !text-gray-800 !py-3"
                      style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      block
                      htmlType="submit"
                      loading={loading}
                      className="!bg-background !text-foreground !border-background hover:!bg-background/90 hover:!text-foreground font-bold border-8 transition-colors !py-6"
                    >
                      {t.auth.register.submitButton}
                    </Button>
                  </Form.Item>
                </Form>
                <div>
                  <p className="text-sm text-center text-background">
                    {t.auth.register.hasAccount}{" "}
                    <a
                      href="/login"
                      className="!text-blue-700  hover:!underline"
                    >
                      {t.auth.register.signIn}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </main>
  );
}
