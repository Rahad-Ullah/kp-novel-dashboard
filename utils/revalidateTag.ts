"use server";

import { revalidateTag } from "next/cache";

export const revalidate = async (tag: string, time: number = 60 * 60) => {
    return revalidateTag(tag, time.toString());
};