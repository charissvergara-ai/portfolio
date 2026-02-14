"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireCustomer() {
  const session = await getSession();
  if (!session || session.role !== "CUSTOMER") throw new Error("Unauthorized");
  return session;
}

export async function createOrder(
  items: { id: string; price: number; quantity: number }[]
) {
  const session = await requireCustomer();

  if (!items.length) return { error: "Cart is empty" };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId: session.id,
      total,
      status: "COMPLETED",
      items: {
        create: items.map((item) => ({
          productId: item.id,
          price: item.price,
        })),
      },
    },
  });

  // Increment download count for each purchased product
  for (const item of items) {
    await prisma.product.update({
      where: { id: item.id },
      data: { downloads: { increment: item.quantity } },
    });
  }

  revalidatePath("/customer/orders");
  revalidatePath("/customer");
  revalidatePath("/store");
  revalidatePath("/");
  return { success: true, orderId: order.id };
}
