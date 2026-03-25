import { EyeIcon, PencilIcon, StarIcon, ThumbsUpIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
    const statusChip =
        status === "published"
            ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
            : " text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"

    return (
        <Card className="w-full overflow-hidden rounded-2xl border border-border bg-white p-0 shadow-sm ring-0 gap-2 flex flex-col h-[clamp(360px,45vh,480px)]">
            <CardHeader className="p-0 flex-[0_0_60%] overflow-hidden">
                <div className="relative h-full w-full">
                    <Image
                        src={coverImage}
                        alt={title}
                        width={150}
                        height={200}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover w-full h-full"
                    />
                </div>
            </CardHeader>



            <CardContent className="flex-1 space-y-2 px-4  overflow-hidden">
                <div className="flex items-start justify-between gap-3 ">
                    <CardTitle className="line-clamp-1 text-[22px] font-semibold leading-tight text-gray-800">
                        {title}
                    </CardTitle>
                    <span
                        className={cn(
                            "rounded-lg px-3 py-1 text-sm font-medium capitalize",
                            statusChip
                        )}
                    >
                        {status}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                        <span
                            key={genre}
                            className="rounded-full bg-purple-100 px-3 py-0.5 text-sm text-purple-700"
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="size-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-semibold text-gray-800">
                        {rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {reviews.toLocaleString()} reviews
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-base text-sidebar-primary">
                    <span>{chapters} chapters</span>
                    <div className="flex items-center gap-1.5">
                        <ThumbsUpIcon className="size-5" />
                        <span className="text-sm text-muted-foreground">
                            {likes.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <EyeIcon className="size-5" />
                        <span className="text-sm text-muted-foreground">
                            {views.toLocaleString()}
                        </span>
                    </div>
                </div>

            </CardContent>

            <div className="flex items-center gap-3 border-t-0 bg-transparent px-4 pb-4 pt-2">
                <Button
                    variant="outline"
                    className="h-10 flex-1 rounded-xl border-border/30 bg-transparent text-muted-foreground hover:bg-transparent hover:text-gray-800"
                    onClick={onEdit}
                >
                    <PencilIcon className="mr-2 size-5" />
                    Edit
                </Button>
                <Button
                    variant="outline"
                    size="icon-lg"
                    className="h-10 w-12 rounded-xl bg-red-50 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={onDelete}
                    aria-label="Delete book"
                >
                    <Trash2Icon className="size-5" />
                </Button>
            </div>
        </Card>
    )
}

export default BookCard