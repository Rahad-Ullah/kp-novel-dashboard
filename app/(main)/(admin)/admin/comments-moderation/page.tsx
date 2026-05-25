import CommentsModerationLayout from '@/src/admin/comments-moderation/CommentsModerationLayout'
import { nextFetch } from "@/utils/nextFetch";

 async function CommentsModerationPage({
   searchParams,
 }: {
   searchParams: any;
 }) {
   const { type = "book" } = await searchParams;
   const query = new URLSearchParams();
   if (type) query.set("type", type);

   const res = await nextFetch(
     `/comments/all-books-chapters?${query.toString()}`,
   );

   return (
     <CommentsModerationLayout
       data={res?.data?.result}
       meta={res?.data?.meta}
     />
   );
 }

export default CommentsModerationPage