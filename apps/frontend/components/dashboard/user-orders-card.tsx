"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  IconClock,
  IconRefresh,
  IconPackage,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
}

const dummyOrders: Order[] = [
  {
    id: "ORD001",
    date: "2025-04-08",
    total: 2500000,
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD002",
    date: "2025-04-05",
    total: 1800000,
    status: "shipped",
    items: 2,
  },
  {
    id: "ORD003",
    date: "2025-04-01",
    total: 3200000,
    status: "processing",
    items: 5,
  },
];

export function UserOrdersCard() {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setRecentOrders(dummyOrders.slice(0, 2));
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusIcon = (status: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      pending: <IconClock size={14} />,
      processing: <IconRefresh size={14} />,
      shipped: <IconPackage size={14} />,
      delivered: <IconCheck size={14} />,
      cancelled: <IconX size={14} />,
    };
    return iconMap[status] || <IconClock size={14} />;
  };

  const getStatusLabel = (status: string) => {
    const labelMap: Record<string, string> = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      shipped: "Đã gửi",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
    };
    return labelMap[status] || status;
  };

  const getStatusVariant = (status: string) => {
    const variantMap: Record<string, "secondary" | "default"> = {
      pending: "secondary",
      processing: "secondary",
      shipped: "secondary",
      delivered: "secondary",
      cancelled: "secondary",
    };
    return variantMap[status] || "secondary";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  if (isLoading) {
    return (
      <Card className="bg-[#0a0e12] border-[#333333] p-6 flex flex-col justify-between h-full">
        <div className="animate-pulse">
          <div className="h-6 bg-[#333333] rounded mb-4 w-1/2"></div>
          <div className="h-4 bg-[#333333] rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-[#333333] rounded mb-2 w-full"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0a0e12] border-[#333333] p-6 flex flex-col justify-between h-full hover:border-[#7cb9e8] transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag size={20} className="text-[#7cb9e8]" />
          <h3 className="text-lg font-bold text-[#fffce1]">Đơn hàng gần đây</h3>
        </div>

        {/* Orders List */}
        {recentOrders.length > 0 ? (
          <div className="space-y-3 mb-6">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="pb-3 border-b border-[#333333] last:border-b-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[#fffce1] font-semibold text-sm">
                      {order.id}
                    </p>
                    <p className="text-[#fffce1]/70 text-xs">{order.date}</p>
                  </div>
                  <Badge
                    variant={getStatusVariant(order.status)}
                    className="bg-[#7cb9e8]/20 text-[#7cb9e8] border-[#7cb9e8] flex items-center gap-1"
                  >
                    {getStatusIcon(order.status)}
                    <span className="text-xs">
                      {getStatusLabel(order.status)}
                    </span>
                  </Badge>
                </div>
                <p className="text-[#fffce1]/70 text-sm">
                  {order.items} sản phẩm • {formatCurrency(order.total)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-6">
            <ShoppingBag size={32} className="text-[#333333] mx-auto mb-2" />
            <p className="text-[#fffce1]/70 text-sm">Chưa có đơn hàng nào</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-[#333333]">
        <Link href="/account/order" className="block w-full">
          <Button className="w-full bg-[#7cb9e8] text-[#05090c] hover:bg-[#6ba8d9]">
            <ArrowRight size={16} className="mr-2" />
            Xem tất cả đơn hàng
          </Button>
        </Link>
      </div>
    </Card>
  );
}
