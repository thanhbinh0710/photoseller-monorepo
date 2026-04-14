"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Eye } from "lucide-react";
import {
  IconClock,
  IconRefresh,
  IconPackage,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

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
  const { t } = useLanguage();
  const getStatusVariant = (
    status: string,
  ): "pending" | "processing" | "shipped" | "delivered" | "cancelled" => {
    const statusMap: Record<
      string,
      "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    > = {
      pending: "pending",
      processing: "processing",
      shipped: "shipped",
      delivered: "delivered",
      cancelled: "cancelled",
    };
    return statusMap[status] || "pending";
  };

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
      pending: t.profile.orders.statusPending,
      processing: t.profile.orders.statusProcessing,
      shipped: t.profile.orders.statusShipped,
      delivered: t.profile.orders.statusDelivered,
      cancelled: t.profile.orders.statusCancelled,
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
    {
      id: "ORD004",
      date: "2025-04-12",
      total: 1500000,
      status: "pending",
      items: 1,
    },
    {
      id: "ORD005",
      date: "2025-04-10",
      total: 4200000,
      status: "processing",
      items: 5,
    },
    {
      id: "ORD006",
      date: "2025-03-15",
      total: 950000,
      status: "cancelled",
      items: 1,
    },
  ];

  const displayOrders = orders && orders.length > 0 ? orders : dummyOrders;

  if (displayOrders.length === 0) {
    return (
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {t.profile.orders.title}
        </h2>
        <div className="text-center py-8">
          <p className="text-neutral-400 mb-4">{t.profile.orders.noOrders}</p>
          <Link href="/collections">
            <Button>{t.profile.orders.shopNow}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
      <h2 className="text-2xl font-semibold text-white mb-6">
        {t.profile.orders.title}
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
                    <p className="text-neutral-400">
                      {t.profile.orders.orderDate}
                    </p>
                    <p className="font-medium text-neutral-100">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400">
                      {t.profile.orders.quantity}
                    </p>
                    <p className="font-medium text-neutral-100">
                      {order.items} {t.profile.orders.items}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400">{t.profile.orders.total}</p>
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
                <Badge
                  variant={getStatusVariant(order.status)}
                  className="flex items-center gap-1"
                >
                  {getStatusIcon(order.status)}
                  {getStatusLabel(order.status)}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
