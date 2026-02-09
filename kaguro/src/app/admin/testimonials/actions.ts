"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") throw new Error("Unauthorized");
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.create({
    data: {
      quote: formData.get("quote") as string,
      author: formData.get("author") as string,
      role: formData.get("role") as string,
    },
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function toggleTestimonial(id: string, active: boolean) {
  await requireAdmin();
  await prisma.testimonial.update({
    where: { id },
    data: { active },
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
