import MyChapters from '@/src/author/mychapters/MyChapters'
import { nextFetch } from "@/utils/nextFetch"

async function MyChaptersPage() {
    const res = await nextFetch("/chapter/author")
    const data = res.data || {}

    return (
        <MyChapters initialData={data} />
    )
}

export default MyChaptersPage