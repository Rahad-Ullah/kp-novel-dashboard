import CommentsModerationLayout from "@/src/super_admin/comments-moderation/CommentsModerationLayout";
import { nextFetch } from "@/utils/nextFetch";

async function CommentsModerationPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { searchTerm, type = "book" } = await searchParams;

  const query = new URLSearchParams();
  if (searchTerm) query.set("searchTerm", searchTerm);
  if (type) query.set("type", type);

  const res = await nextFetch(
    `/comments/all-books-chapters?${query.toString()}`,
    {
      tags: ["comments-moderation"],
    },
  );

  return (
    <CommentsModerationLayout data={res?.data?.result} meta={res?.data?.meta} />
  );
}

export default CommentsModerationPage;
