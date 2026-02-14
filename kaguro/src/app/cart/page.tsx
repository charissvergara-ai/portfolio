"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";
import { createOrder } from "@/app/customer/orders/actions";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError(null);
    const result = await createOrder(
      items.map((i) => ({ id: i.id, price: i.price, quantity: i.quantity }))
    );
    if (result.error) {
      setCheckoutError(result.error);
      setCheckoutLoading(false);
      return;
    }
    clearCart();
    router.push("/customer/orders");
  }

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <ShoppingBag className="mx-auto mb-6 h-20 w-20 text-gray-300" />
          <h1 className="mb-4 text-3xl font-black text-text-dark">Your Cart is Empty</h1>
          <p className="mb-8 text-gray-500">Looks like you haven&apos;t added any materials yet.</p>
          <Link href="/store" className="rounded-full bg-primary px-8 py-3.5 font-bold text-white transition-colors hover:bg-sky-500/100">
            Browse Store
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-3xl font-black text-white">Shopping Cart</h1>
          <p className="mt-2 text-white/70">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
                    <Image src={item.image} alt={item.title} width={120} height={80} className="rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-text-dark">{item.title}</h3>
                        <p className="text-lg font-bold text-primary">₱{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-lg border px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-dark">₱{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={clearCart} className="mt-4 text-sm text-red-500 hover:text-red-700">
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-text-dark">Order Summary</h2>
                <div className="space-y-3 border-b pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold">₱{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-bold text-green-600">-₱0.00</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-lg font-bold text-text-dark">
                  <span>Total</span>
                  <span className="text-primary">₱{totalPrice.toFixed(2)}</span>
                </div>
                {checkoutError && (
                  <p className="mt-4 text-sm text-red-600">{checkoutError}</p>
                )}
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3.5 font-bold text-white transition-colors hover:bg-sky-500/100 disabled:opacity-50"
                >
                  {checkoutLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
                </button>
                <Link href="/store" className="mt-3 block text-center text-sm text-primary hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
