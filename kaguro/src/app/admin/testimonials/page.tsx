import { prisma } from "@/lib/prisma";
import TestimonialList from "./TestimonialList";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-text-dark">Testimonials</h1>
        <span className="text-sm text-gray-500">{testimonials.length} total</span>
      </div>

      <TestimonialList
        testimonials={testimonials.map((t) => ({
          ...t,
          createdAt: t.createdAt.toISOString(),
        }))}
      />
    </>
  );
}
