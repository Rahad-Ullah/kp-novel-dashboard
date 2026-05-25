"use client"
import * as React from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import Stats from "@/components/common/stats/Stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircleIcon } from "lucide-react"
import CommentsTable from "@/src/admin/comments-moderation/CommentsTable"
import { getStoredUserRole } from "@/lib/auth-storage"

type CommentRow = {
    id: string
    username: string
    text: string
    chapterLabel: string
    chapterHref: string
    timeAgo: string
    needsReply: boolean
    liked: boolean
}

function CommentList({ rows }: { rows: CommentRow[] }) {
    return (
        <div className="rounded-xl border border-border bg-white shadow-sm">
            <div className="divide-y divide-border">
                {rows.map((c) => (
                    <div
                        key={c.id}
                        className="flex items-start justify-between gap-4 px-4 py-4 first:pt-4"
                    >
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-gray-600">
                                    {c.username}
                                </span>
                                {c.needsReply ? (
                                    <Badge className="bg-amber-100 text-amber-700">
                                        Needs Reply
                                    </Badge>
                                ) : <Badge className="bg-green-100 text-green-700">
                                    Replied
                                </Badge>}
                                {c.liked ? (
                                    <Badge className="bg-pink-100 text-pink-700">Liked</Badge>
                                ) : null}
                            </div>

                            <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>

                            <div className="mt-2 flex items-center justify-between gap-3">
                                <Link
                                    href={c.chapterHref}
                                    className="text-sm font-medium text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
                                >
                                    {c.chapterLabel}
                                </Link>
                            </div>
                        </div>

                        <span className="shrink-0 text-xs text-muted-foreground">
                            {c.timeAgo}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Comments({ data, meta }: { data: any; meta: any }) {
    const comments: CommentRow[] = [
        {
            id: "c1",
            username: "Reader123",
            text: "Amazing chapter! Can't wait for the next..",
            chapterLabel: "The Dragon's Awakening - Chapter 13",
            chapterHref: "/author/my-chapters",
            timeAgo: "2 min ago",
            needsReply: false,
            liked: true,
        },
        {
            id: "c2",
            username: "BookLover",
            text: "Amazing chapter! Can't wait for the next..",
            chapterLabel: "Moonlight Chronicles - Chapter 13",
            chapterHref: "/author/my-chapters",
            timeAgo: "2 min ago",
            needsReply: true,
            liked: true,
        },
        {
            id: "c3",
            username: "Fantasy_Fan",
            text: "Amazing chapter! Can't wait for the next..",
            chapterLabel: "The Last Warrior - Chapter 13",
            chapterHref: "/author/my-chapters",
            timeAgo: "Yesterday",
            needsReply: true,
            liked: false,
        },
    ]

    const all = comments
    const needsReply = comments.filter((c) => c.needsReply)
    const totalLikes = comments.filter((c) => c.liked)

    const stats = [
        {
            title: "Total Comments",
            value: all.length,
            icon: <MessageCircleIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-green-500 to-lime-500! ",
        },
        {
            title: "Needs Reply",
            value: needsReply.length,
            icon: <MessageCircleIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-yellow-500 to-orange-500! ",
        },
        {
            title: "Total Likes",
            value: totalLikes.length,
            icon: <MessageCircleIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-pink-500 to-red-500! ",
        },
    ]

    const [userType, setUserType] = React.useState<string | null>(null)
    React.useEffect(() => {
        setUserType(getStoredUserRole())
    }, [])

    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Comments"
                description="Read and respond to reader feedback"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:w-1/2">
                {stats.map((stat) => (
                    <Stats
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                        iconBackgroundColor={stat.iconBackgroundColor}
                    />
                ))}
            </div>

            <Tabs
                defaultValue="all"
                className=" w-full"
            >
                <TabsList className="bg-linear-to-r from-violet-500 to-indigo-500 w-fit">
                    <TabsTrigger
                        value="all"
                        className="text-gray-100 data-active:bg-linear-to-r from-green-500 to-lime-500"
                    >
                        All Comments
                    </TabsTrigger>
                    <TabsTrigger
                        value="needs-reply"
                        className="text-gray-100 data-active:bg-linear-to-r from-yellow-500 to-orange-500"
                    >
                        Needs Reply
                    </TabsTrigger>
                    <TabsTrigger
                        value="total-likes"
                        className="text-gray-100 data-active:bg-linear-to-r from-pink-500 to-red-500"
                    >
                        Liked Comments
                    </TabsTrigger>
                    {userType === "super_admin" && (
                        <TabsTrigger
                            value="review-comments"
                            className="text-gray-100 data-active:bg-linear-to-r from-blue-500 to-indigo-500"
                        >
                            Review Comments
                        </TabsTrigger>
                    )}
                </TabsList>

                <div className="w-full">
                    <TabsContent value="all">
                        <CommentList rows={all} />
                    </TabsContent>
                    <TabsContent value="needs-reply">
                        <CommentList rows={needsReply} />
                    </TabsContent>
                    <TabsContent value="total-likes">
                        <CommentList rows={totalLikes} />
                    </TabsContent>
                    {userType === "super_admin" && (
                        <TabsContent value="review-comments">
                            <CommentsTable />
                        </TabsContent>
                    )}
                </div>

            </Tabs>
        </div>
    )
}

export default Comments