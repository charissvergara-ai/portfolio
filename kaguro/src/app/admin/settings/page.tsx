import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsForms from "./SettingsForms";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { name: true, email: true, role: true, createdAt: true },
  });

  if (!user) redirect("/sign-in");

  return (
    <>
      <h1 className="mb-6 text-2xl font-black text-text-dark">Settings</h1>

      <div className="max-w-2xl space-y-6">
        {/* Profile Info */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-bold text-text-dark">Profile Information</h2>
          <p className="mb-4 text-sm text-gray-500">
            Role: <span className="font-bold">{user.role}</span> &middot; Joined{" "}
            {user.createdAt.toLocaleDateString()}
          </p>
          <SettingsForms name={user.name} email={user.email} />
        </div>
      </div>
    </>
  );
}
