"use client";

import { useState } from "react";
import Image from "next/image";
import { Form, Input, Button, Spin } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleLoginSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });

      console.log("Logging in with:", values);

      // Temporary login logic
      localStorage.setItem("user_logged_in", "true");
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
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
              {/* Login Form */}
              <div>
                <h1 className="text-xl font-semibold text-background/80 mb-6">
                  Đăng nhập
                </h1>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleLoginSubmit}
                  autoComplete="off"
                  requiredMark={false}
                >
                  <Form.Item
                    label={
                      <span className="text-background/80 font-medium text-xs">
                        Email
                      </span>
                    }
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email",
                      },
                      {
                        type: "email",
                        message: "Email không hợp lệ",
                      },
                    ]}
                  >
                    <Input
                      placeholder="@email.com"
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
                        Mật khẩu
                      </span>
                    }
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                      },
                      {
                        min: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="••••••••"
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
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
                <div>
                  <p className="text-sm text-center text-background">
                    Chưa có tài khoản?{" "}
                    <a
                      href="/register"
                      className="!text-blue-700  hover:!underline"
                    >
                      Đăng ký
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
