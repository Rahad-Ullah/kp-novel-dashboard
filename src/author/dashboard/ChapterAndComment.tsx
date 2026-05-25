import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"

interface ChapterAndCommentProps {
    recentChapters: Array<{ _id: string; title: string; chapterNumber: number; status: string }>;
    recentComments: Array<{ _id: string; userId: { fullName: string; profile: string }; message: string; createdAt?: string }>;
}

function statusBadgeClass(status: string) {
    return status === "approved"
        ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400"
        : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
}

function getTimeAgo(dateString?: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
}

function ChapterAndComment({ recentChapters, recentComments }: ChapterAndCommentProps) {
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
                    <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-6 lg:flex-1">
                        {recentChapters.length > 0 ? recentChapters.map((chapter) => (
                            <div
                                key={chapter._id}
                                className="rounded-lg bg-muted/70 px-4 py-3 dark:bg-muted/40"
                            >
                                <p className="font-semibold text-gray-600">{chapter.title} - Chapter {chapter.chapterNumber}</p>
                                <span
                                    className={cn(
                                        "mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-medium capitalize",
                                        statusBadgeClass(chapter.status)
                                    )}
                                >
                                    {chapter.status}
                                </span>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-500 text-center py-4">No recent chapters.</p>
                        )}
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
                    <CardContent className="flex flex-1 flex-col px-0 pb-2 pt-2 lg:flex-1">
                        {recentComments.length > 0 ? (
                            <div className="divide-y divide-border px-4">
                                {recentComments.map((c) => (
                                    <div key={c._id} className="space-y-2 py-4 first:pt-4">
                                        <p className="font-semibold text-gray-600">{c.userId?.fullName || "Unknown User"}</p>
                                        <p className="text-sm text-gray-600">{c.message}</p>
                                        <div className="flex items-center justify-between gap-3 pt-1">
                                            {/* Left intentionally blank or can add a placeholder chapter link if API updates later */}
                                            <span />
                                            {c.createdAt && (
                                                <span className="shrink-0 text-sm text-gray-500">
                                                    {getTimeAgo(c.createdAt)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-6">No recent comments.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ChapterAndComment
