"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession, setSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "CUSTOMER") return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) return { error: "Name and email are required" };

  const existing = await prisma.user.findFirst({
    where: { email, NOT: { id: session.id } },
  });
  if (existing) return { error: "Email already in use" };

  const user = await prisma.user.update({
    where: { id: session.id },
    data: { name, email },
  });

  await setSession({ id: user.id, name: user.name, email: user.email, role: user.role });
  revalidatePath("/customer/settings");
  return { success: true };
}

export async function changePassword(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "CUSTOMER") return { error: "Unauthorized" };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword) return { error: "Both fields are required" };
  if (newPassword.length < 6) return { error: "New password must be at least 6 characters" };

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return { error: "User not found" };

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return { error: "Current password is incorrect" };

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: session.id }, data: { password: hashed } });

  return { success: true };
}
