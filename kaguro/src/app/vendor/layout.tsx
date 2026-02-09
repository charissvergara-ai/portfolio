import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import VendorSidebar from "./VendorSidebar";

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.role !== "VENDOR") {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <VendorSidebar userName={session.name} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
