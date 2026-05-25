import Comments from '@/src/author/comments/Comments'

function CommentsModerationLayout({ data, meta }: { data: any; meta: any }) {
  return <Comments data={data} meta={meta} />;
}

export default CommentsModerationLayout