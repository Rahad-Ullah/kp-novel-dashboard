"use client"

import { EyeIcon, PencilIcon, StarIcon, ThumbsUpIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type BookCardProps = {
    title: string
    coverImage: string
    status: "published" | "pending"
    genres: string[]
    rating: number
    reviews: number
    chapters: number
    likes: number
    views: number
    onEdit?: () => void
    onView?: () => void
    onAddChapters?: () => void
    onDelete?: () => void
}

function BookCard({
    title,
    coverImage,
    status,
    genres,
    rating,
    reviews,
    chapters,
    likes,
    views,
    onEdit,
    onDelete,
}: BookCardProps) {
    const isPublished = status === "published"

    return (
        <Card className="flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            {/* Image Header */}
            <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-gray-100">
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <CardContent className="flex flex-1 flex-col p-4">
                {/* Title and Status Row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="line-clamp-1 text-base font-semibold text-gray-900" title={title}>
                        {title}
                    </h3>
                    <span
                        className={cn(
                            "shrink-0 rounded px-2 py-0.5 text-xs font-medium capitalize",
                            isPublished
                                ? "bg-green-50 text-green-700"
                                : "bg-orange-50 text-orange-600"
                        )}
                    >
                        {status}
                    </span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {genres.slice(0, 3).map((genre) => (
                        <span
                            key={genre}
                            className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-medium text-purple-700"
                        >
                            {genre}
                        </span>
                    ))}
                    {genres.length > 3 && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                            +{genres.length - 3}
                        </span>
                    )}
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-1.5 mb-3">
                    <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">{reviews.toLocaleString()} reviews</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>{chapters} chapters</span>
                    <div className="flex items-center gap-1.5">
                        <ThumbsUpIcon className="size-4" />
                        <span>{likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <EyeIcon className="size-4" />
                        <span>{views.toLocaleString()}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="h-10 flex-1 border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 font-normal rounded-xl"
                        onClick={onEdit}
                    >
                        <PencilIcon className="mr-2 size-4" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 shrink-0 border-red-100 bg-white text-red-400 hover:bg-red-50 hover:text-red-500 rounded-xl"
                        onClick={onDelete}
                    >
                        <Trash2Icon className="size-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BookCard
