import ContentsLayout from "@/src/super_admin/contents/ContentsLayout"
import { nextFetch } from "@/utils/nextFetch";

async function ContentsPage({ searchParams }: { searchParams: any }) {
  const { searchTerm, type = "book" } = await searchParams;
  const query = new URLSearchParams();
  if (searchTerm) query.set("searchTerm", searchTerm as string);
  if (type) query.set("type", type as string);

  const res = await nextFetch(`/book/book/chapter?${query.toString()}`, {
    tags: ["contents"],
  });

  return <ContentsLayout data={res.data?.data} meta={res?.meta} />;
}

export default ContentsPage