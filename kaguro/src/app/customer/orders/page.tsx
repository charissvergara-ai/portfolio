import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import OrderList from "./OrderList";

export const dynamic = "force-dynamic";

export default async function CustomerOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            select: { id: true, title: true, slug: true, image: true, price: true },
          },
        },
      },
    },
  });

  const serialized = orders.map((o) => ({
    id: o.id,
    total: o.total,
    status: o.status,
    createdAt: o.createdAt.toISOString(),
    items: o.items.map((item) => ({
      id: item.id,
      price: item.price,
      product: item.product,
    })),
  }));

  return (
    <>
      <h1 className="mb-6 text-2xl font-black text-text-dark">My Purchases</h1>
      <OrderList orders={serialized} />
    </>
  );
}
