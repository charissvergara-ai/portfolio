import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { products: true, orders: true } },
    },
  });

  const roleColors: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-700",
    VENDOR: "bg-blue-100 text-blue-700",
    CUSTOMER: "bg-gray-100 text-gray-700",
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-text-dark">Users</h1>
        <span className="text-sm text-gray-500">{users.length} total</span>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50/50">
              <tr>
                <th className="px-6 py-3 font-bold text-gray-600">Name</th>
                <th className="px-6 py-3 font-bold text-gray-600">Email</th>
                <th className="px-6 py-3 font-bold text-gray-600">Role</th>
                <th className="px-6 py-3 font-bold text-gray-600">Products</th>
                <th className="px-6 py-3 font-bold text-gray-600">Orders</th>
                <th className="px-6 py-3 font-bold text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="even:bg-gray-100/70 hover:bg-pink-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-dark">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user._count.products}</td>
                  <td className="px-6 py-4 text-gray-500">{user._count.orders}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
