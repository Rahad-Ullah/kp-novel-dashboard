import UsersLayout from "@/src/admin/users/UsersLayout";
import { nextFetch } from "@/utils/nextFetch";

async function UsersPage({ searchParams }: { searchParams: any }) {
  const { searchTerm, isActive, page, limit } = await searchParams;
  const query = new URLSearchParams();
  if (searchTerm) query.set("searchTerm", searchTerm);
  if (isActive) query.set("isActive", isActive);
  if (page) query.set("page", page);
  if (limit) query.set("limit", limit);

  const res = await nextFetch(`/users/all-users?${query.toString()}`);

  return <UsersLayout users={res?.data} meta={res?.meta} />;
}

export default UsersPage;
