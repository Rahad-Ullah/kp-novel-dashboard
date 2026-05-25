import Mybooks from '@/src/author/mybooks/Mybooks'
import React from 'react'
import { nextFetch } from "@/utils/nextFetch"

async function MyBooks() {
    const res = await nextFetch("/book/author")
    const data = res.data || {}

    return (
        <Mybooks initialData={data} />
    )
}

export default MyBooks