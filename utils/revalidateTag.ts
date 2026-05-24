"use server";

import { updateTag } from "next/cache";

export const revalidate = async (tag: string) => {
    return updateTag(tag)
};