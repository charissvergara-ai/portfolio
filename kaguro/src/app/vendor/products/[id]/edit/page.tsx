import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import EditProductForm from "./EditProductForm";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session || session.role !== "VENDOR") redirect("/sign-in");

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product || product.vendorId !== session.id) notFound();

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <h1 className="mb-6 text-2xl font-black text-text-dark">Edit Product</h1>
      <EditProductForm
        product={{
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          salePrice: product.salePrice,
          image: product.image,
          categoryId: product.categoryId,
        }}
        categories={categories}
      />
    </>
  );
}
