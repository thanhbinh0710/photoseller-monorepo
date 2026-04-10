"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "promotion" | "system";
  date: string;
  isRead: boolean;
}

interface NotificationsProps {
  notifications?: Notification[];
}

export function NotificationsTab({ notifications }: NotificationsProps) {
  const [displayNotifications, setDisplayNotifications] = useState<
    Notification[]
  >(
    notifications || [
      {
        id: "1",
        title: "Đơn hàng ORD001 đã được giao",
        message: "Đơn hàng của bạn đã được giao thành công",
        type: "order",
        date: "2025-04-08",
        isRead: true,
      },
      {
        id: "2",
        title: "Khuyến mãi mới: Giảm 20%",
        message: "Tất cả sản phẩm được chọn giảm giá 20% trong 48 giờ tới",
        type: "promotion",
        date: "2025-04-07",
        isRead: false,
      },
      {
        id: "3",
        title: "Cập nhật hệ thống",
        message: "Chúng tôi đã cập nhật các tính năng mới trên trang web",
        type: "system",
        date: "2025-04-05",
        isRead: true,
      },
    ],
  );

  const handleDelete = (id: string) => {
    setDisplayNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getBadgeVariant = (
    type: string,
  ): "default" | "secondary" | "outline" | "destructive" => {
    const variantMap: Record<
      string,
      "default" | "secondary" | "outline" | "destructive"
    > = {
      order: "default",
      promotion: "secondary",
      system: "outline",
    };
    return variantMap[type] || "default";
  };

  const getTypeLabel = (type: string) => {
    const labelMap: Record<string, string> = {
      order: "Đơn hàng",
      promotion: "Khuyến mãi",
      system: "Hệ thống",
    };
    return labelMap[type] || type;
  };

  if (displayNotifications.length === 0) {
    return (
      <div className="bg-background rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-semibold text-white mb-6">Thông báo</h2>
        <div className="text-center py-8">
          <p className="text-gray-400">Không có thông báo nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg shadow-lg p-8 border border-border">
      <h2 className="text-2xl font-semibold text-white mb-6">Thông báo</h2>

      <div className="space-y-4">
        {displayNotifications.map((notif) => (
          <Card
            key={notif.id}
            className={`border-l-4 ${
              notif.isRead
                ? "border-l-gray-300 bg-white"
                : "border-l-blue-500 bg-blue-50"
            }`}
          >
            <div className="flex items-start justify-between p-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                  <Badge variant={getBadgeVariant(notif.type)}>
                    {getTypeLabel(notif.type)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                <p className="text-xs text-gray-500">{notif.date}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(notif.id)}
              >
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
