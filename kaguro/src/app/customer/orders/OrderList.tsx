"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, ShoppingBag } from "lucide-react";

type OrderItem = {
  id: string;
  price: number;
  product: {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
  };
};

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

const statusStyles: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-600",
};

export default function OrderList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-sm">
        <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-300" />
        <p className="text-lg font-bold text-text-dark">No purchases yet</p>
        <p className="mt-1 text-sm text-gray-500">Items you purchase will appear here.</p>
        <Link
          href="/store"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sky-500/100"
        >
          Browse Store
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
          {/* Order header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/50 px-6 py-3">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusStyles[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm font-bold text-text-dark">
              Total: <span className="text-primary">₱{order.total.toFixed(2)}</span>
            </p>
          </div>

          {/* Order items */}
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/store/${item.product.slug}`}
                    className="font-medium text-text-dark hover:text-primary transition-colors line-clamp-1"
                  >
                    {item.product.title}
                  </Link>
                  <p className="text-sm text-gray-500">₱{item.price.toFixed(2)}</p>
                </div>
                {order.status === "COMPLETED" && (
                  <Link
                    href={`/store/${item.product.slug}`}
                    className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
