import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar userName={session.name} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
