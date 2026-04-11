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
  const getStatusVariant = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "bg-orange-100 text-orange-900",
      processing: "bg-blue-100 text-blue-900",
      shipped: "bg-purple-100 text-purple-900",
      delivered: "bg-green-100 text-green-900",
      cancelled: "bg-red-100 text-red-900",
    };
    return statusMap[status] || "bg-neutral-700 text-white";
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
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Đơn hàng của tôi
        </h2>
        <div className="text-center py-8">
          <p className="text-neutral-400 mb-4">Bạn chưa có đơn hàng nào</p>
          <Link href="/collections">
            <button className="bg-amber-100 text-black px-6 py-2 rounded cursor-pointer hover:bg-amber-200">
              Mua sắm ngay
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Đơn hàng của tôi
      </h2>

      <div className="space-y-4">
        {displayOrders.map((order) => (
          <div
            key={order.id}
            className="border border-neutral-700 rounded-lg p-6 hover:bg-neutral-800 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingBag size={20} className="text-neutral-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {order.id}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-neutral-400">Ngày đặt</p>
                    <p className="font-medium text-neutral-100">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400">Số lượng</p>
                    <p className="font-medium text-neutral-100">
                      {order.items} sản phẩm
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400">Tổng tiền</p>
                    <p className="font-medium text-neutral-100">
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
                <span
                  className={`px-4 py-2 text-xs font-semibold rounded ${getStatusVariant(order.status)}`}
                >
                  {getStatusLabel(order.status)}
                </span>
                <Link href={`/profile/orders/${order.id}`}>
                  <button className="flex items-center gap-2 text-sm text-amber-100 hover:text-amber-200 transition-colors cursor-pointer">
                    <Eye size={16} />
                    Xem chi tiết
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
