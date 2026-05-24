import UsersLayout from "@/src/super_admin/users/UsersLayout";
import { nextFetch } from "@/utils/nextFetch";

export const metadata = {
  title: "Users",
  description: "Users",
};

async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { role, isActive, searchTerm } = await searchParams;
  const query = new URLSearchParams();
  if (role) query.set("role", role as string);
  if (isActive) query.set("isActive", isActive as string);
  if (searchTerm) query.set("searchTerm", searchTerm as string);

  const res = await nextFetch(`/users/all-users?${query.toString()}`, {
    tags: ["users"],
  });

  return <UsersLayout users={res.data} meta={res.meta} />;
}

export default UsersPage;
