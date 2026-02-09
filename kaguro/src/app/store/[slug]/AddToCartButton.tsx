"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({
  id,
  title,
  price,
  image,
}: {
  id: string;
  title: string;
  price: number;
  image: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id, title, price, image })}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-4 text-lg font-bold text-white transition-colors hover:bg-sky-500/100"
    >
      <ShoppingCart className="h-5 w-5" />
      Add to Cart
    </button>
  );
}
