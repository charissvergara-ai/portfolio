import { prisma } from "@/lib/prisma";
import StoreContent from "@/components/StoreContent";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ category?: string; search?: string; sort?: string; page?: string }>;

export default async function StorePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search || "";
  const sort = params.sort || "newest";
  const page = parseInt(params.page || "1");
  const perPage = 12;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const where = {
    deletedAt: null as null,
    ...(category ? { category: { slug: category } } : {}),
    ...(search
      ? { title: { contains: search, mode: "insensitive" as const } }
      : {}),
  };

  const orderBy =
    sort === "price-low"
      ? { price: "asc" as const }
      : sort === "price-high"
        ? { price: "desc" as const }
        : sort === "popular"
          ? { downloads: "desc" as const }
          : { createdAt: "desc" as const };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      include: { category: true },
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  const serializedProducts = products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-3xl font-black text-white">Store</h1>
          <p className="mt-2 text-white/70">Discover quality educational materials for your classroom</p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <StoreContent
            categories={categories}
            products={serializedProducts}
            total={total}
            totalPages={totalPages}
            currentCategory={category}
            currentSearch={search}
            currentSort={sort}
            currentPage={page}
          />
        </div>
      </section>
    </>
  );
}
