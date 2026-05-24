import AuthorsLayout from '@/src/super_admin/authors/AuthorsLayout'
import { nextFetch } from "@/utils/nextFetch";

async function AuthorsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { searchTerm, authorStatus } = await searchParams;
  const query = new URLSearchParams();
  if (searchTerm) query.set("searchTerm", searchTerm as string);
  if (authorStatus) query.set("authorStatus", authorStatus as string);

  const res = await nextFetch(`/users/all-authors?${query.toString()}`, {
    tags: ["authors"],
  });

  return (
    <AuthorsLayout data={res.data?.data} meta={res.meta} stats={res.data} />
  );
}

export default AuthorsPage