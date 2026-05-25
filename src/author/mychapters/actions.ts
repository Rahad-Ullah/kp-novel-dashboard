"use server"

import { nextFetch } from "@/utils/nextFetch"

export async function createChapterAction(data: object) {
    return nextFetch("/chapter/create", {
        method: "POST",
        body: data,
    })
}

export async function updateChapterAction(id: string, data: object) {
    return nextFetch(`/chapter/${id}`, {
        method: "PATCH",
        body: data,
    })
}

export async function deleteChapterAction(id: string) {
    return nextFetch(`/chapter/${id}`, {
        method: "DELETE"
    })
}

export async function fetchBooksAction() {
    return nextFetch("/book/author", {
        method: "GET"
    })
}
