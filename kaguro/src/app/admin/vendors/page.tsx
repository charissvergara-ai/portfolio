import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminVendorsPage() {
  const vendors = await prisma.user.findMany({
    where: { role: "VENDOR" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      products: {
        select: { downloads: true },
      },
    },
  });

  const vendorData = vendors.map((v) => ({
    ...v,
    productCount: v.products.length,
    totalDownloads: v.products.reduce((sum, p) => sum + p.downloads, 0),
  }));

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-text-dark">Vendors</h1>
        <span className="text-sm text-gray-500">{vendorData.length} total</span>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50/50">
              <tr>
                <th className="px-6 py-3 font-bold text-gray-600">Name</th>
                <th className="px-6 py-3 font-bold text-gray-600">Email</th>
                <th className="px-6 py-3 font-bold text-gray-600">Products</th>
                <th className="px-6 py-3 font-bold text-gray-600">Total Downloads</th>
                <th className="px-6 py-3 font-bold text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody>
              {vendorData.map((vendor) => (
                <tr key={vendor.id} className="even:bg-gray-100/70 hover:bg-pink-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-dark">{vendor.name}</td>
                  <td className="px-6 py-4 text-gray-500">{vendor.email}</td>
                  <td className="px-6 py-4 text-gray-500">{vendor.productCount}</td>
                  <td className="px-6 py-4 text-gray-500">{vendor.totalDownloads.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {vendor.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
