import Dashboard from '@/src/super_admin/dashboard/Dashboard'
import { nextFetch } from "@/utils/nextFetch";

async function SuperAdminDashboardPage() {
  const res = await nextFetch(`/payment/overview-by-super-admin`);

  return <Dashboard data={res?.data} />;
}

export default SuperAdminDashboardPage