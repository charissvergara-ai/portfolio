import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import VendorProductList from "./VendorProductList";

export const dynamic = "force-dynamic";

export default async function VendorProductsPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { vendorId: session.id },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-text-dark">My Products</h1>
        <span className="text-sm text-gray-500">{products.length} total</span>
      </div>
      <VendorProductList
        products={products.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          price: p.price,
          salePrice: p.salePrice,
          image: p.image,
          rating: p.rating,
          downloads: p.downloads,
          deletedAt: p.deletedAt?.toISOString() ?? null,
          createdAt: p.createdAt.toISOString(),
          category: { id: p.category.id, name: p.category.name },
        }))}
        categories={categories}
      />
    </>
  );
}
