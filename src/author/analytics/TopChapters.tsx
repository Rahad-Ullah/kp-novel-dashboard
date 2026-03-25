import { EyeIcon } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function TopChapters() {
    const top = [
        {
            chapter: "Chapter 12",
            book: "The Last Warrior",
            views: 12223,
        },
        {
            chapter: "Chapter 12",
            book: "The Last Warrior",
            views: 12223,
        },
        {
            chapter: "Chapter 12",
            book: "The Last Warrior",
            views: 12223,
        },
    ] as const

    return (
        <Card className="border  bg-white shadow-xs rounded-xl">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-500">
                    Top Performing Chapter
                </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
                <div className="divide-y divide-border rounded-xl">
                    {top.map((item, idx) => (
                        <div
                            key={`${item.chapter}-${idx}`}
                            className="flex items-start justify-between gap-4 py-4"
                        >
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-gray-500">
                                    {item.chapter}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                    {item.book}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <EyeIcon className="size-4 text-gray-500" />
                                <div className="text-xs text-gray-500 whitespace-nowrap">
                                    {item.views.toLocaleString()} views
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default TopChapters