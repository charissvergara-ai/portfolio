import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, vendor: true },
  });

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-text-dark">Products</h1>
        <span className="text-sm text-gray-500">{products.length} total</span>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50/50">
              <tr>
                <th className="px-6 py-3 font-bold text-gray-600">Product</th>
                <th className="px-6 py-3 font-bold text-gray-600">Category</th>
                <th className="px-6 py-3 font-bold text-gray-600">Price</th>
                <th className="px-6 py-3 font-bold text-gray-600">Sale</th>
                <th className="px-6 py-3 font-bold text-gray-600">Downloads</th>
                <th className="px-6 py-3 font-bold text-gray-600">Rating</th>
                <th className="px-6 py-3 font-bold text-gray-600">Vendor</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="even:bg-gray-100/70 hover:bg-pink-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <span className="font-medium text-text-dark line-clamp-1">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">₱{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {product.salePrice ? (
                      <span className="font-bold text-red-600">₱{product.salePrice.toFixed(2)}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{product.downloads}</td>
                  <td className="px-6 py-4 text-gray-500">{product.rating.toFixed(1)}</td>
                  <td className="px-6 py-4 text-gray-500">{product.vendor.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
