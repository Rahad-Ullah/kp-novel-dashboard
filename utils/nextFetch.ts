/* eslint-disable @typescript-eslint/no-explicit-any */

import { getToken } from "./getToken";

export interface FetchResponse {
    success: boolean;
    message?: string;
    data?: any;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
    };
    error?: string | null;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
    method?: HttpMethod;
    body?: any;
    tags?: string[];
    token?: string;
    headers?: Record<string, string>;
    cache?: RequestCache;
}

export const nextFetch = async (
    url: string,
    {
        method = "GET",
        body,
        tags,
        token,
        headers = {},
        cache = "no-cache",
    }: FetchOptions = {}
): Promise<FetchResponse> => {
    const accessToken = await getToken();

    const isFormData = body instanceof FormData;
    const hasBody = body !== undefined && method !== "GET";

    const reqHeaders: Record<string, string> = {
        Accept: "application/json",
        ...headers,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(token ? { token: `${token}` } : {}),
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
            method,
            headers: reqHeaders,
            ...(hasBody && { body: isFormData ? body : JSON.stringify(body) }),
            ...(tags && { next: { tags } }),
            ...(!(method === "GET") ? { cache: "no-store" } : { cache: cache }),
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: data?.success ?? true,
                message: data?.message,
                data: data?.data,
                pagination: data?.pagination,
                error: null,
            };
        }

        return {
            success: false,
            message: data?.message,
            data: null,
            error: data?.errorMessages || "Request failed",
        };
    } catch (error) {
        return {
            success: false,
            message: "Network error",
            data: null,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};