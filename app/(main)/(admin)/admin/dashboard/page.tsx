import Dashboard from "@/src/admin/dashboard/Dashboard"
import { nextFetch } from "@/utils/nextFetch";

async function AdminDashboardPage() {
  const res = await nextFetch(`/payment/overview`, {
    tags: ["admin-overview"],
  });

  return <Dashboard data={res.data} />;
}

export default AdminDashboardPage