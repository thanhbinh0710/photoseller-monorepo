"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/language-context";

export function PreferencesTab() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newsletter: true,
    promotions: true,
    productRecommendations: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Tùy chọn đã được lưu");
    } finally {
      setIsSaving(false);
    }
  };

  const preferencesList = [
    {
      key: "emailNotifications" as const,
      label: "Thông báo qua Email",
      description: "Nhận thông báo về đơn hàng và cập nhật tài khoản",
    },
    {
      key: "smsNotifications" as const,
      label: "Thông báo qua SMS",
      description: "Nhận tin nhắn về trạng thái đơn hàng",
    },
    {
      key: "pushNotifications" as const,
      label: "Thông báo Push",
      description: "Nhận thông báo trên trình duyệt",
    },
    {
      key: "newsletter" as const,
      label: "Bản tin hàng tuần",
      description: "Nhận bản tin với những bộ sưu tập mới",
    },
    {
      key: "promotions" as const,
      label: "Khuyến mãi và giảm giá",
      description: "Nhận thông báo về các chương trình khuyến mãi",
    },
    {
      key: "productRecommendations" as const,
      label: "Gợi ý sản phẩm",
      description: "Nhận gợi ý dựa trên lịch sử mua hàng",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tùy chọn</h2>

      <div className="space-y-4 mb-6">
        {preferencesList.map((pref) => (
          <Card key={pref.key} className="border-gray-200 bg-white">
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{pref.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{pref.description}</p>
              </div>
              <Switch
                checked={preferences[pref.key]}
                onCheckedChange={() => handleToggle(pref.key)}
              />
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Đang lưu..." : "Lưu tùy chọn"}
      </Button>
    </div>
  );
}
