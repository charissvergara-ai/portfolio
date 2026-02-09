"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireVendor() {
  const session = await getSession();
  if (!session || session.role !== "VENDOR") throw new Error("Unauthorized");
  return session;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(title: string): Promise<string> {
  let slug = slugify(title);
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  return slug;
}

export async function createProduct(formData: FormData) {
  const session = await requireVendor();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const salePriceRaw = formData.get("salePrice") as string;
  const salePrice = salePriceRaw ? parseFloat(salePriceRaw) : null;
  const image = formData.get("image") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!title || !description || !price || !image || !categoryId) {
    return { error: "All required fields must be filled" };
  }

  const slug = await uniqueSlug(title);

  await prisma.product.create({
    data: {
      title,
      slug,
      description,
      price,
      salePrice,
      image,
      categoryId,
      vendorId: session.id,
    },
  });

  revalidatePath("/vendor/products");
  revalidatePath("/store");
  revalidatePath("/");
  return { success: true };
}

export async function updateProduct(formData: FormData) {
  const session = await requireVendor();

  const id = formData.get("id") as string;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.vendorId !== session.id) {
    return { error: "Product not found or unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const salePriceRaw = formData.get("salePrice") as string;
  const salePrice = salePriceRaw ? parseFloat(salePriceRaw) : null;
  const image = formData.get("image") as string;
  const categoryId = formData.get("categoryId") as string;

  let slug = product.slug;
  if (title !== product.title) {
    slug = await uniqueSlug(title);
  }

  await prisma.product.update({
    where: { id },
    data: { title, slug, description, price, salePrice, image, categoryId },
  });

  revalidatePath("/vendor/products");
  revalidatePath(`/store/${product.slug}`);
  revalidatePath("/store");
  revalidatePath("/");
  return { success: true };
}

export async function softDeleteProduct(id: string) {
  const session = await requireVendor();
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.vendorId !== session.id) throw new Error("Unauthorized");

  await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/vendor/products");
  revalidatePath("/store");
  revalidatePath("/");
}

export async function restoreProduct(id: string) {
  const session = await requireVendor();
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.vendorId !== session.id) throw new Error("Unauthorized");

  await prisma.product.update({
    where: { id },
    data: { deletedAt: null },
  });

  revalidatePath("/vendor/products");
  revalidatePath("/store");
  revalidatePath("/");
}
