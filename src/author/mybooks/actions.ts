"use server"

import { nextFetch } from "@/utils/nextFetch"

export async function createBookAction(formData: FormData) {
    return nextFetch("/book/create", {
        method: "POST",
        body: formData,
    })
}

export async function updateBookAction(id: string, formData: FormData) {
    return nextFetch(`/book/${id}`, {
        method: "PATCH",
        body: formData,
    })
}

export async function deleteBookAction(id: string) {
    return nextFetch(`/book/${id}`, {
        method: "DELETE",
    })
}
