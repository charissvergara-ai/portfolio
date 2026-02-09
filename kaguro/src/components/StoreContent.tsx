"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Search, Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string;
  rating: number;
  downloads: number;
  createdAt: string;
  category: { name: string };
};

type StoreContentProps = {
  categories: Category[];
  products: Product[];
  total: number;
  totalPages: number;
  currentCategory?: string;
  currentSearch: string;
  currentSort: string;
  currentPage: number;
};

export default function StoreContent({
  categories,
  products,
  total,
  totalPages,
  currentCategory,
  currentSearch,
  currentSort,
  currentPage,
}: StoreContentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const buildUrl = (overrides: { category?: string; page?: number } = {}) => {
    const params = new URLSearchParams();
    const cat = overrides.category !== undefined ? overrides.category : (currentCategory || "");
    const pg = overrides.page ?? currentPage;
    if (cat) params.set("category", cat);
    if (currentSearch) params.set("search", currentSearch);
    if (currentSort !== "newest") params.set("sort", currentSort);
    if (pg > 1) params.set("page", String(pg));
    const qs = params.toString();
    return `/store${qs ? `?${qs}` : ""}`;
  };

  const handleCategoryClick = (slug?: string) => {
    startTransition(() => {
      router.push(buildUrl({ category: slug || "", page: 1 }));
    });
  };

  const handlePageClick = (page: number) => {
    startTransition(() => {
      router.push(buildUrl({ page }));
    });
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full shrink-0 lg:w-64">
        <form className="mb-6">
          <div className="relative">
            <input
              type="text"
              name="search"
              defaultValue={currentSearch}
              placeholder="Search materials..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-dark">
            Categories
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleCategoryClick()}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${!currentCategory ? "bg-primary font-bold text-white" : "text-gray-600 hover:bg-light-bg"}`}
              >
                All Categories
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${currentCategory === cat.slug ? "bg-primary font-bold text-white" : "text-gray-600 hover:bg-light-bg"}`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative flex-1">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {products.length} of {total} results
          </p>
        </div>

        {/* Loading overlay */}
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-start justify-center rounded-xl bg-white/70 pt-32 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="text-sm font-medium text-gray-500">
                Loading products...
              </span>
            </div>
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                slug={product.slug}
                price={product.price}
                salePrice={product.salePrice}
                image={product.image}
                rating={product.rating}
                downloads={product.downloads}
                category={product.category.name}
                createdAt={product.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-light-bg py-20 text-center">
            <p className="text-lg text-gray-500">No products found.</p>
            <button
              onClick={() => handleCategoryClick()}
              className="mt-4 inline-block text-sm font-bold text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageClick(i + 1)}
                disabled={isPending}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === i + 1 ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-light-bg"} disabled:opacity-50`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
