"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border-2 bg-white shadow-sm transition-colors ${
              isOpen ? "border-primary" : "border-gray-100/40 hover:border-sky-500"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-7 py-5 text-left"
            >
              <span className="text-lg text-text-dark">{item.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-pink-500" : "bg-sky-500"
                }`}
              >
                {isOpen ? (
                  <ChevronDown className="h-5 w-5 text-white" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-white" />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="px-7 pb-6">
                <p className="text-base leading-relaxed text-gray-500">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
