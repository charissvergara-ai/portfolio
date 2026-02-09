"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "../../actions";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice: number | null;
  image: string;
  categoryId: string;
};

type Category = { id: string; name: string; slug: string };

export default function EditProductForm({
  product,
  categories,
}: {
  product: Product;
  categories: Category[];
}) {
  const router = useRouter();
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <form
      action={async (formData) => {
        setSaving(true);
        setMsg(null);
        const result = await updateProduct(formData);
        setSaving(false);
        if (result?.error) {
          setMsg({ type: "error", text: result.error });
        } else {
          setMsg({ type: "success", text: "Product updated!" });
          setTimeout(() => router.push("/vendor/products"), 1000);
        }
      }}
      className="max-w-2xl rounded-xl bg-white p-6 shadow-sm"
    >
      <input type="hidden" name="id" value={product.id} />

      {msg && (
        <div className={`mb-4 rounded-lg px-4 py-3 text-sm font-medium ${msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-600">Title</label>
          <input
            name="title"
            defaultValue={product.title}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-600">Category</label>
          <select
            name="categoryId"
            defaultValue={product.categoryId}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
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
            defaultValue={product.price}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-600">Sale Price (₱) <span className="font-normal text-gray-400">optional</span></label>
          <input
            name="salePrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product.salePrice ?? ""}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-sm font-bold text-gray-600">Image URL</label>
        <input
          name="image"
          type="url"
          defaultValue={product.image}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="mt-4">
        <label className="mb-1 block text-sm font-bold text-gray-600">Description</label>
        <textarea
          name="description"
          defaultValue={product.description}
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-sky-500/100 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/vendor/products")}
          className="rounded-lg border px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
