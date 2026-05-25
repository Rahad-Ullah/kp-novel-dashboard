import Comments from "./Comments";

function CommentsModerationLayout({ data, meta }: { data: any; meta: any }) {
  return <Comments data={data} meta={meta} />;
}

export default CommentsModerationLayout;
