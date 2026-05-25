"use server"

import { nextFetch } from "@/utils/nextFetch"

export async function fetchNotificationsAction() {
    return nextFetch("/notification", {
        method: "GET"
    })
}

export async function markNotificationAsReadAction(id: string) {
    return nextFetch(`/notification/read/${id}`, {
        method: "PATCH"
    })
}
