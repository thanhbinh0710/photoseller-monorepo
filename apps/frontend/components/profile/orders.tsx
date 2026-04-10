"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Eye } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
}

interface OrdersProps {
  orders?: Order[];
}

export function Orders({ orders }: OrdersProps) {
  const getStatusVariant = (
    status: string,
  ): "default" | "secondary" | "outline" | "destructive" => {
    const variantMap: Record<
      string,
      "default" | "secondary" | "outline" | "destructive"
    > = {
      pending: "outline",
      processing: "default",
      shipped: "secondary",
      delivered: "default",
      cancelled: "destructive",
    };
    return variantMap[status] || "default";
  };

  const getStatusLabel = (status: string) => {
    const labelMap: Record<string, string> = {
      pending: "Chờ xác nhận",
      processing: "Đang xử lý",
      shipped: "Đã gửi",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
    };
    return labelMap[status] || status;
  };

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
      date: "2025-03-28",
      total: 3200000,
      status: "delivered",
      items: 4,
    },
  ];

  const displayOrders = orders && orders.length > 0 ? orders : dummyOrders;

  if (displayOrders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Đơn hàng của tôi
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào</p>
          <Link href="/collections">
            <Button>Mua sắm ngay</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Đơn hàng của tôi
      </h2>

      <div className="space-y-4">
        {displayOrders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingBag size={20} className="text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order.id}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="text-gray-500">Ngày đặt</p>
                    <p className="font-medium text-gray-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Số lượng</p>
                    <p className="font-medium text-gray-900">
                      {order.items} sản phẩm
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tổng tiền</p>
                    <p className="font-medium text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <Badge variant={getStatusVariant(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>
                <Link href={`/profile/orders/${order.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} className="mr-2" />
                    Xem chi tiết
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
