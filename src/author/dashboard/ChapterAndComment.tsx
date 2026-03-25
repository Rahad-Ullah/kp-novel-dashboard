import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"

const recentChapters = [
    {
        title: "The Dragon's Awakening - Chapter 15",
        status: "approved" as const,
    },
    {
        title: "Moonlight Chronicles - Chapter 8",
        status: "pending" as const,
    },
    {
        title: "City of Whispers - Chapter 22",
        status: "approved" as const,
    },
] as const

const recentComments = [
    {
        username: "Reader123",
        text: "Amazing chapter! Can't wait for the next..",
        chapterHref: "/author/my-chapters",
        chapterLabel: "The Dragon's Awakening - Chapter 13",
        timeAgo: "2 min ago",
    },
    {
        username: "BookWorm_Amy",
        text: "Loved the plot twist at the end. More please!",
        chapterHref: "/author/my-chapters",
        chapterLabel: "Moonlight Chronicles - Chapter 7",
        timeAgo: "1 hour ago",
    },
    {
        username: "NightOwlReads",
        text: "Your pacing in this series is perfect.",
        chapterHref: "/author/my-chapters",
        chapterLabel: "The Dragon's Awakening - Chapter 12",
        timeAgo: "Yesterday",
    },
] as const

function statusBadgeClass(status: "approved" | "pending") {
    return status === "approved"
        ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400"
        : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
}

function ChapterAndComment() {
    return (
        <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <div className="flex min-h-0 flex-col lg:h-full">
                <div className="shrink-0">
                    <SmallPageInfo
                        title="Recent Chapters"
                        description="Your latest chapter submissions"
                    />
                </div>
                <Card className="mt-4 flex min-h-0 flex-1 flex-col border border-violet-200/80 bg-white shadow-sm ring-0 dark:border-violet-500/25 dark:bg-card">
                    <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-0 lg:flex-1">
                        {recentChapters.map((chapter) => (
                            <div
                                key={chapter.title}
                                className="rounded-lg bg-muted/70 px-3 py-3 dark:bg-muted/40"
                            >
                                <p className="font-semibold text-gray-600">{chapter.title}</p>
                                <span
                                    className={cn(
                                        "mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-medium",
                                        statusBadgeClass(chapter.status)
                                    )}
                                >
                                    {chapter.status === "approved" ? "Approved" : "Pending"}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="flex min-h-0 flex-col lg:h-full">
                <div className="shrink-0">
                    <SmallPageInfo
                        title="Recent Comments"
                        description="Latest reader feedback"
                    />
                </div>
                <Card className="mt-4 flex min-h-0 flex-1 flex-col border border-violet-200/80 bg-white shadow-sm ring-0 dark:border-violet-500/25 dark:bg-card">
                    <CardContent className="flex flex-1 flex-col px-0 pb-2 pt-0 lg:flex-1">
                        <div className="divide-y divide-border px-4">
                            {recentComments.map((c) => (
                                <div key={`${c.username}-${c.timeAgo}`} className="space-y-2 py-4 first:pt-4">
                                    <p className="font-semibold text-gray-600">{c.username}</p>
                                    <p className="text-sm text-gray-600">{c.text}</p>
                                    <div className="flex items-center justify-between gap-3 pt-1">
                                        <Link
                                            href={c.chapterHref}
                                            className="text-sm font-medium text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
                                        >
                                            {c.chapterLabel}
                                        </Link>
                                        <span className="shrink-0 text-sm text-gray-600">
                                            {c.timeAgo}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ChapterAndComment
