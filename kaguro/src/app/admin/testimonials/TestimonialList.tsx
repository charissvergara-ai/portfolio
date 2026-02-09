"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { createTestimonial, toggleTestimonial, deleteTestimonial } from "./actions";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  active: boolean;
  createdAt: string;
};

export default function TestimonialList({ testimonials }: { testimonials: Testimonial[] }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sky-500/100"
      >
        <Plus className="h-4 w-4" /> Add Testimonial
      </button>

      {/* Add Form */}
      {showForm && (
        <form
          action={async (formData) => {
            await createTestimonial(formData);
            setShowForm(false);
          }}
          className="rounded-xl bg-white p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-bold text-text-dark">New Testimonial</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-600">Author</label>
              <input
                name="author"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Teacher Name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-600">Role / Location</label>
              <input
                name="role"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Grade 3, Cebu City"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-bold text-gray-600">Quote</label>
            <textarea
              name="quote"
              required
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="What the teacher said about KaGuro..."
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
                <th className="px-6 py-3 font-bold text-gray-600">Author</th>
                <th className="px-6 py-3 font-bold text-gray-600">Quote</th>
                <th className="px-6 py-3 font-bold text-gray-600">Role</th>
                <th className="px-6 py-3 font-bold text-gray-600">Status</th>
                <th className="px-6 py-3 font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="even:bg-gray-100/70 hover:bg-pink-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-dark">{t.author}</td>
                  <td className="max-w-xs px-6 py-4 text-gray-500">
                    <span className="line-clamp-2">{t.quote}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{t.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleTestimonial(t.id, !t.active)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        t.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteTestimonial(t.id)}
                      className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
