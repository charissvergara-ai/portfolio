import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ShoppingBag, Package, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerDashboard() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    include: { items: true },
  });

  const totalOrders = orders.length;
  const totalProducts = orders.reduce((sum, o) => sum + o.items.length, 0);
  const totalSpent = orders
    .filter((o) => o.status === "COMPLETED")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Products Purchased", value: totalProducts, icon: Package, color: "bg-green-500" },
    { label: "Total Spent", value: `₱${totalSpent.toFixed(2)}`, icon: DollarSign, color: "bg-purple-500" },
  ];

  return (
    <>
      <h1 className="mb-6 text-2xl font-black text-text-dark">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
