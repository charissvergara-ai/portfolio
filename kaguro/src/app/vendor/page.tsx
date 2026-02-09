import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Package, TrendingUp, Download, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VendorDashboard() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const products = await prisma.product.findMany({
    where: { vendorId: session.id },
    select: { downloads: true, price: true, salePrice: true, deletedAt: true },
  });

  const activeProducts = products.filter((p) => !p.deletedAt).length;
  const totalProducts = products.length;
  const totalDownloads = products.reduce((sum, p) => sum + p.downloads, 0);
  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.salePrice ?? p.price) * p.downloads,
    0
  );

  const stats = [
    { label: "Active Products", value: activeProducts, icon: Package, color: "bg-blue-500" },
    { label: "Total Products", value: totalProducts, icon: TrendingUp, color: "bg-green-500" },
    { label: "Total Downloads", value: totalDownloads.toLocaleString(), icon: Download, color: "bg-orange-500" },
    { label: "Est. Revenue", value: `₱${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "bg-purple-500" },
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
