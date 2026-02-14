import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import CustomerSidebar from "./CustomerSidebar";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.role !== "CUSTOMER") {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CustomerSidebar userName={session.name} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
