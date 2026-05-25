import Loading from "@/components/common/loading/Loading";
import ContentModerationLayout from "@/src/admin/content-moderation/ContentModerationLayout";
import { nextFetch } from "@/utils/nextFetch";
import { Suspense } from "react";

async function ContentModerationPage({ searchParams }: { searchParams: any }) {
  const { searchTerm, type = "book", page, limit } = await searchParams;
  const query = new URLSearchParams();
  if (searchTerm) query.set("searchTerm", searchTerm);
  if (type) query.set("type", type);
  if (page) query.set("page", page);
  if (limit) query.set("limit", limit);

  const res = await nextFetch(`/book/book/chapter?${query.toString()}`);

  return (
    <Suspense fallback={<Loading />}>
      <ContentModerationLayout data={res?.data} meta={res?.meta} />
    </Suspense>
  );
}

export default ContentModerationPage;
