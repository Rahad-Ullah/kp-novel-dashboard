"use server"

import { nextFetch } from "@/utils/nextFetch"

export async function fetchCommentsAction(type: "book" | "chapter") {
    return nextFetch(`/comments/book-chapter?type=${type}`, {
        method: "GET"
    })
}

export async function replyToCommentAction(data: { bookId?: string, chapterId?: string, message: string, parentId: string }) {
    return nextFetch(`/comments/create-comment-or-reply`, {
        method: "POST",
        body: data
    })
}
