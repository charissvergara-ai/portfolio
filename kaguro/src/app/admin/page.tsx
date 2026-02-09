import { prisma } from "@/lib/prisma";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [userCount, productCount, orderCount, orders] = await Promise.all([
    prisma.user.count(),
    prisma.product.count({ where: { deletedAt: null } }),
    prisma.order.count(),
    prisma.order.findMany({ select: { total: true } }),
  ]);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Total Users", value: userCount, icon: Users, color: "bg-blue-500" },
    { label: "Total Products", value: productCount, icon: Package, color: "bg-green-500" },
    { label: "Total Orders", value: orderCount, icon: ShoppingCart, color: "bg-orange-500" },
    { label: "Revenue", value: `₱${revenue.toFixed(2)}`, icon: DollarSign, color: "bg-purple-500" },
  ];

  return (
    <>
      <h1 className="mb-6 text-2xl font-black text-text-dark">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-black text-text-dark">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
