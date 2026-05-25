import Comments from '@/src/author/comments/Comments'
import { fetchCommentsAction } from '@/src/author/comments/actions'

export default async function AuthorCommentsPage() {
    const res = await fetchCommentsAction("book")
    const initialData = res.success ? res.data : undefined

    return (
        <Comments initialData={initialData} />
    )
}