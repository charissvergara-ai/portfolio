"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, RotateCcw, Pencil } from "lucide-react";
import { createProduct, softDeleteProduct, restoreProduct } from "./actions";

type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string;
  rating: number;
  downloads: number;
  deletedAt: string | null;
  createdAt: string;
  category: { id: string; name: string };
};

type Category = { id: string; name: string; slug: string };

export default function VendorProductList({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={() => { setShowForm(!showForm); setMsg(null); }}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sky-500/100"
      >
        <Plus className="h-4 w-4" /> Add Product
      </button>

      {msg && (
        <div className={`rounded-lg px-4 py-3 text-sm font-medium ${msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <form
          action={async (formData) => {
            const result = await createProduct(formData);
            if (result?.error) {
              setMsg({ type: "error", text: result.error });
            } else {
              setShowForm(false);
              setMsg({ type: "success", text: "Product created successfully!" });
            }
          }}
          className="rounded-xl bg-white p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-bold text-text-dark">New Product</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-600">Title</label>
              <input
                name="title"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Product title"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-600">Category</label>
              <select
                name="categoryId"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-600">Price (₱)</label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-600">Sale Price (₱) <span className="font-normal text-gray-400">optional</span></label>
              <input
                name="salePrice"
                type="number"
                step="0.01"
                min="0"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-bold text-gray-600">Image URL</label>
            <input
              name="image"
              type="url"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="https://picsum.photos/seed/product/600/400"
            />
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-bold text-gray-600">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Product description..."
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-sky-500/100"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
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
                <th className="px-6 py-3 font-bold text-gray-600">Status</th>
                <th className="px-6 py-3 font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className={`even:bg-gray-100/70 hover:bg-pink-50 transition-colors ${p.deletedAt ? "opacity-60" : ""}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <span className="font-medium text-text-dark line-clamp-1">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {p.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">₱{p.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {p.salePrice ? (
                      <span className="font-bold text-red-600">₱{p.salePrice.toFixed(2)}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{p.downloads}</td>
                  <td className="px-6 py-4">
                    {p.deletedAt ? (
                      <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-600">Deleted</span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {!p.deletedAt && (
                        <Link
                          href={`/vendor/products/${p.id}/edit`}
                          className="rounded-lg p-1.5 text-blue-500 transition-colors hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                      )}
                      {p.deletedAt ? (
                        <button
                          onClick={() => restoreProduct(p.id)}
                          className="rounded-lg p-1.5 text-green-600 transition-colors hover:bg-green-50"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => softDeleteProduct(p.id)}
                          className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    No products yet. Click &quot;Add Product&quot; to create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
