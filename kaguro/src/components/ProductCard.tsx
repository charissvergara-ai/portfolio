"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: string;
  title: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  image: string;
  rating: number;
  downloads: number;
  category: string;
  createdAt?: string;
};

export default function ProductCard({
  id,
  title,
  slug,
  price,
  salePrice,
  image,
  rating,
  downloads,
  category,
  createdAt,
}: ProductCardProps) {
  const { addItem } = useCart();

  const isOnSale = salePrice != null && salePrice < price;
  const isNew = createdAt
    ? Date.now() - new Date(createdAt).getTime() < 14 * 24 * 60 * 60 * 1000
    : false;
  const displayPrice = isOnSale ? salePrice : price;

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/store/${slug}`} className="relative block aspect-[2/1] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-white hidden group-hover:block">
          {category}
        </span>
        {isOnSale && (
          <span
            className="absolute right-3 top-0 flex flex-col items-center bg-red-600 px-2 pt-2 pb-3 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
          >
            Sale
          </span>
        )}
        {!isOnSale && isNew && (
          <span
            className="absolute right-3 top-0 flex flex-col items-center bg-text-dark px-2 pt-2 pb-3 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
          >
            New
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/store/${slug}`}>
          <h3 className="mb-2 text-sm font-bold text-text-dark line-clamp-2 transition-colors hover:text-primary">
            {title}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.round(rating)
                    ? "fill-yellow text-yellow"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{downloads} downloads</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ₱{displayPrice.toFixed(2)}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-400 line-through">
                ₱{price.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem({ id, title, price: displayPrice, image })}
            className="rounded-full bg-sky-500/100 p-2 text-white transition-colors hover:bg-secondary-dark"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
