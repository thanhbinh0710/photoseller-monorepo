"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import {
  IconClock,
  IconRefresh,
  IconPackage,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  photo: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    price: string;
  };
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  totalAmount: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface OrdersProps {
  onRefresh?: () => void;
}

export function Orders({ onRefresh }: OrdersProps) {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/user/orders?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.data?.orders || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching orders",
      );
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusVariant = (
    status: string,
  ): "pending" | "processing" | "shipped" | "delivered" | "cancelled" => {
    const statusMap: Record<
      string,
      "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    > = {
      PENDING: "pending",
      PROCESSING: "processing",
      COMPLETED: "delivered",
      CANCELLED: "cancelled",
      REFUNDED: "cancelled",
    };
    return statusMap[status] || "pending";
  };

  const getStatusIcon = (status: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      PENDING: <IconClock size={14} />,
      PROCESSING: <IconRefresh size={14} />,
      COMPLETED: <IconCheck size={14} />,
      CANCELLED: <IconX size={14} />,
      REFUNDED: <IconX size={14} />,
    };
    return iconMap[status] || <IconClock size={14} />;
  };

  const getStatusLabel = (status: string) => {
    const labelMap: Record<string, string> = {
      PENDING: t.profile.orders.statusPending || "Pending",
      PROCESSING: t.profile.orders.statusProcessing || "Processing",
      COMPLETED: t.profile.orders.statusDelivered || "Completed",
      CANCELLED: t.profile.orders.statusCancelled || "Cancelled",
      REFUNDED: "Refunded",
    };
    return labelMap[status] || status;
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {t.profile.orders.title}
        </h2>
        <p className="text-neutral-400">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {t.profile.orders.title}
        </h2>
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={fetchOrders} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {t.profile.orders.title}
        </h2>
        <div className="text-center py-8">
          <p className="text-neutral-400 mb-4">
            {t.profile.orders.noOrders || "No orders yet"}
          </p>
          <Link href="/collections">
            <Button className="bg-blue-600 hover:bg-blue-700">
              {t.profile.orders.shopNow || "Start Shopping"}
            </Button>
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
        {orders.map((order) => (
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
                    {order.orderNumber}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-neutral-400">
                      {t.profile.orders.orderDate || "Order Date"}
                    </p>
                    <p className="font-medium text-neutral-100">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400">
                      {t.profile.orders.quantity || "Items"}
                    </p>
                    <p className="font-medium text-neutral-100">
                      {order.items.length} {t.profile.orders.items || "item(s)"}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400">
                      {t.profile.orders.total || "Total"}
                    </p>
                    <p className="font-medium text-neutral-100">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Number(order.totalAmount))}
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
