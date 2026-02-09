import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Download, ArrowLeft, User } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "./AddToCartButton";

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { slug, deletedAt: null },
    include: { category: true, vendor: true },
  });

  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id }, deletedAt: null },
    take: 4,
    include: { category: true },
  });

  return (
    <>
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Link href="/store" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
              <Image src={product.image} alt={product.title} fill className="object-cover" priority />
            </div>

            <div>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-bold text-primary">
                {product.category.name}
              </span>
              <h1 className="mb-4 text-3xl font-black text-text-dark">{product.title}</h1>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? "fill-secondary text-secondary" : "fill-gray-200 text-gray-200"}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.rating.toFixed(1)})</span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Download className="h-4 w-4" /> {product.downloads} downloads
                </span>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <span className="text-4xl font-black text-primary">
                  ₱{(product.salePrice != null && product.salePrice < product.price ? product.salePrice : product.price).toFixed(2)}
                </span>
                {product.salePrice != null && product.salePrice < product.price && (
                  <span className="text-xl text-gray-400 line-through">₱{product.price.toFixed(2)}</span>
                )}
              </div>
              <p className="mb-8 leading-relaxed text-gray-600">{product.description}</p>

              <AddToCartButton id={product.id} title={product.title} price={product.salePrice != null && product.salePrice < product.price ? product.salePrice : product.price} image={product.image} />

              <div className="mt-8 flex items-center gap-3 rounded-xl bg-light-bg p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Created by</p>
                  <p className="text-sm font-bold text-text-dark">{product.vendor.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-light-bg py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-black text-text-dark">Related Materials</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} id={p.id} title={p.title} slug={p.slug} price={p.price} salePrice={p.salePrice} image={p.image} rating={p.rating} downloads={p.downloads} category={p.category.name} createdAt={p.createdAt.toISOString()} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
