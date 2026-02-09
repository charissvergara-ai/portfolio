"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isDrawerOpen, setDrawerOpen } =
    useCart();

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-text-dark">Your Cart</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-500 hover:text-text-dark"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <p className="text-gray-500">Your cart is empty</p>
            <button
              onClick={() => setDrawerOpen(false)}
              className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-sky-500/100"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border p-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-text-dark line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-sm font-bold text-primary">
                          ₱{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded border p-1 hover:bg-gray-100"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded border p-1 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t p-6">
              <div className="mb-4 flex justify-between text-lg font-bold text-text-dark">
                <span>Total:</span>
                <span>₱{totalPrice.toFixed(2)}</span>
              </div>
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-full bg-primary py-3 text-center font-bold text-white transition-colors hover:bg-sky-500/100"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
