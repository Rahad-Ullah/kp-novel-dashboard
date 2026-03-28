"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EyeIcon,
    StarIcon,
    ThumbsUpIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ChapterPreview = {
    title: string;
    excerpt: string;
};

export type BookInfoData = {
    /** Stable key so the modal resets chapter index when opening a different row. */
    id: string;
    title: string;
    coverSrc: string;
    authorName: string;
    authorRole: string;
    authorEmail: string;
    authorAvatarSrc: string;
    moderationStatus: "Pending" | "Approved" | "Rejected" | "Published";
    formatLabel: string;
    genres: string[];
    rating: number;
    reviews: number;
    chapters: number;
    likes: number;
    views: number;
    description: string;
    hashtags: string;
    /** If empty, previews are generated from `chapters` count. */
    chapterPreviews: ChapterPreview[];
};

type BookInfoModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book: BookInfoData | null;
    onReject?: () => void;
    onApprove?: () => void;
    /** When false, hides moderation footer (e.g. content management view). Default true. */
    showModerationActions?: boolean;
};

const CHAPTER_SUBTITLES = [
    "The Beginning",
    "Whispers in the Dark",
    "Crossroads",
    "The Old Road",
    "First Light",
    "Shadows Fall",
    "The Gathering",
    "Broken Oaths",
    "Rivers of Ash",
    "The Last Door",
    "Dawn's Edge",
    "Full Circle",
];

export function buildChapterPreviews(count: number): ChapterPreview[] {
    const n = Math.max(1, Math.min(count, 50));
    const excerpt =
        "The morning mist clung to the valley as our travelers set out, each step echoing the weight of what had been left unsaid. Somewhere beyond the ridge, the city waited—its spires hidden until the sun burned through the haze.";
    return Array.from({ length: n }, (_, i) => ({
        title: `Chapter ${i + 1}: ${CHAPTER_SUBTITLES[i % CHAPTER_SUBTITLES.length]}`,
        excerpt,
    }));
}

function statusBadgeClass(status: BookInfoData["moderationStatus"]) {
    if (status === "Approved" || status === "Published")
        return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected")
        return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
}

export function bookInfoFromModerationRow(row: {
    id: string;
    title: string;
    description: string;
    author: string;
    genre: string;
    status: "Pending" | "Approved" | "Rejected";
}): BookInfoData {
    const emailSlug = row.author
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "");
    const genres = Array.from(new Set([row.genre, "Romance"]));
    const tags = genres.map((g) => `#${g}`).join(" ");
    const chapterCount = 12;

    return {
        id: row.id,
        title: row.title,
        coverSrc: "/book.png",
        authorName: row.author,
        authorRole: "Author",
        authorEmail: `${emailSlug || "author"}123@gmail.com`,
        authorAvatarSrc: "/author.jpg",
        moderationStatus: row.status,
        formatLabel: "Novel",
        genres,
        rating: 4.8,
        reviews: 1245,
        chapters: chapterCount,
        likes: 451,
        views: 12563,
        description: row.description,
        hashtags: tags,
        chapterPreviews: buildChapterPreviews(chapterCount),
    };
}

export function bookInfoFromManagementRow(row: {
    id: string;
    title: string;
    description: string;
    author: string;
    genre: string;
    chapters: number;
    publishedRelative: string;
    status: "Published";
}): BookInfoData {
    const emailSlug = row.author
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "");
    const genres = Array.from(new Set([row.genre, "Romance"]));
    const tags = genres.map((g) => `#${g}`).join(" ");
    const chapterCount = row.chapters;

    return {
        id: row.id,
        title: row.title,
        coverSrc: "/book.png",
        authorName: row.author,
        authorRole: "Author",
        authorEmail: `${emailSlug || "author"}123@gmail.com`,
        authorAvatarSrc: "/author.jpg",
        moderationStatus: "Published",
        formatLabel: "Novel",
        genres,
        rating: 4.8,
        reviews: 1245,
        chapters: chapterCount,
        likes: 451,
        views: 12563,
        description: row.description,
        hashtags: tags,
        chapterPreviews: buildChapterPreviews(chapterCount),
    };
}

type InnerProps = {
    book: BookInfoData;
    onOpenChange: (open: boolean) => void;
    onReject?: () => void;
    onApprove?: () => void;
    showModerationActions: boolean;
};

function BookInfoModalInner({
    book,
    onOpenChange,
    onReject,
    onApprove,
    showModerationActions,
}: InnerProps) {
    const previews =
        book.chapterPreviews.length > 0
            ? book.chapterPreviews
            : buildChapterPreviews(book.chapters);
    const [chapterIndex, setChapterIndex] = useState(0);

    const lastIdx = Math.max(0, previews.length - 1);
    const index = Math.min(chapterIndex, lastIdx);
    const current = previews[index] ?? previews[0];

    const status = book.moderationStatus;

    return (
        <DialogContent
            showCloseButton
            className="max-h-[90vh] max-w-[calc(100%-2rem)]  p-0 sm:max-w-2xl overflow-y-auto no-scrollbar"
        >
            <div className="px-4 pt-4 pb-2">
                <DialogHeader className="space-y-0 text-left">
                    <DialogTitle className="text-base font-bold text-gray-900">
                        Book Information
                    </DialogTitle>
                </DialogHeader>
            </div>

            <div className="px-4 pb-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <Image
                        src={book.coverSrc}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 576px"
                    />
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl border border-violet-200/80 bg-white px-3 py-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
                        <Image
                            src={book.authorAvatarSrc}
                            alt={book.authorName}
                            fill
                            className="object-cover"
                            sizes="48px"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900">{book.authorName}</div>
                        <div className="text-xs text-muted-foreground">{book.authorRole}</div>
                    </div>
                    <div className="hidden shrink-0 text-right text-xs text-muted-foreground sm:block">
                        {book.authorEmail}
                    </div>
                </div>
                <div className="mt-1 px-1 text-right text-xs text-muted-foreground sm:hidden">
                    {book.authorEmail}
                </div>

                <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-gray-900">{book.title}</h2>
                    <div className="flex flex-col items-end gap-1">
                        <span
                            className={cn(
                                "rounded-md px-2.5 py-0.5 text-xs font-medium",
                                statusBadgeClass(book.moderationStatus)
                            )}
                        >
                            {book.moderationStatus}
                        </span>
                        <span className="rounded-md bg-teal-600 px-2.5 py-0.5 text-xs font-medium text-white">
                            {book.formatLabel}
                        </span>
                    </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {book.genres.map((g) => (
                        <span
                            key={g}
                            className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-purple-700"
                        >
                            {g}
                        </span>
                    ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StarIcon className="size-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-base font-semibold text-gray-900">
                        {book.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {book.reviews.toLocaleString()} reviews
                    </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <ThumbsUpIcon className="size-4" />
                        {book.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <EyeIcon className="size-4" />
                        {book.views.toLocaleString()}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-sm font-bold text-gray-900">Description</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {book.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{book.hashtags}</p>
                </div>

                <div className="mt-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-sm font-bold text-gray-900">{current.title}</h3>
                        <span className="text-sm text-muted-foreground">
                            {book.chapters} chapters
                        </span>
                    </div>
                    <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4 text-sm leading-relaxed text-muted-foreground">
                        {current.excerpt}
                    </div>
                    <div className="mt-4 flex justify-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-full border-violet-200 bg-violet-50 px-5 text-violet-700 hover:bg-violet-100 hover:text-violet-800"
                            disabled={index <= 0}
                            onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
                            aria-label="Previous chapter"
                        >
                            <ChevronLeftIcon className="size-4" />
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            className="rounded-full border-0 bg-linear-to-r from-blue-600 to-purple-600 px-5 text-white shadow-sm hover:opacity-90 disabled:opacity-40"
                            disabled={index >= lastIdx}
                            onClick={() => setChapterIndex((i) => Math.min(lastIdx, i + 1))}
                            aria-label="Next chapter"
                        >
                            <ChevronRightIcon className="size-4" />
                        </Button>
                    </div>
                </div>

                {showModerationActions ? (
                    <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
                        {status === "Pending" ? (
                            <>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-red-300 bg-background text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => {
                                        onReject?.();
                                        onOpenChange(false);
                                    }}
                                >
                                    Reject
                                </Button>
                                <Button
                                    type="button"
                                    className="border-0 bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-sm hover:opacity-90"
                                    onClick={() => {
                                        onApprove?.();
                                        onOpenChange(false);
                                    }}
                                >
                                    Approve
                                </Button>
                            </>
                        ) : null}
                        {status === "Approved" || status === "Published" ? (
                            <Button
                                type="button"
                                disabled
                                className="border-0 bg-linear-to-r from-blue-600 to-purple-600 text-white opacity-80 shadow-sm"
                            >
                                Approved
                            </Button>
                        ) : null}
                        {status === "Rejected" ? (
                            <Button
                                type="button"
                                variant="outline"
                                disabled
                                className="border-red-200 bg-red-50 text-red-600"
                            >
                                Rejected
                            </Button>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </DialogContent>
    );
}

export default function BookInfoModal({
    open,
    onOpenChange,
    book,
    onReject,
    onApprove,
    showModerationActions = true,
}: BookInfoModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {book ? (
                <BookInfoModalInner
                    key={book.id}
                    book={book}
                    onOpenChange={onOpenChange}
                    onReject={onReject}
                    onApprove={onApprove}
                    showModerationActions={showModerationActions}
                />
            ) : null}
        </Dialog>
    );
}
