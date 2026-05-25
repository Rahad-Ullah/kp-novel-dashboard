import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ChapterRow } from "@/src/author/mychapters/ChaptersTable"
import { cn } from "@/lib/utils"

interface ChapterInfoModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    chapter: ChapterRow | null
    onDelete?: (id: string) => void
    onEdit?: (chapter: ChapterRow) => void
}

export default function ChapterInfoModal({
    open,
    onOpenChange,
    chapter,
    onDelete,
    onEdit,
}: ChapterInfoModalProps) {
    if (!chapter) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                <DialogHeader className="flex flex-row justify-between items-start pt-4 px-2">
                    <DialogTitle className="text-2xl font-bold">
                        Chapter Information
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto pr-4 pl-2 mt-4 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-3xl font-bold">{chapter.book !== "N/A" ? chapter.book : chapter.title}</h2>
                            <Badge className={cn(
                                "capitalize ml-4 text-xs font-medium px-3 py-1",
                                chapter.status === "pending" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : 
                                chapter.status === "approved" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                                "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            )}>
                                {chapter.status}
                            </Badge>
                        </div>
                        {/* We don't have book tags in the chapter API yet, but we mock them for UI */}
                        <div className="flex gap-2 mb-6">
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-transparent">Fantasy</Badge>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-transparent">Romance</Badge>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm text-gray-600">
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-900">Submitted Date</span>
                            <span>{chapter.submittedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-900">Words</span>
                            <span>{chapter.words.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-900">Views</span>
                            <span>{chapter.views.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-lg font-bold">{chapter.chapter}</h3>
                            {onEdit && (
                                <button 
                                    className="text-sm text-blue-500 hover:underline"
                                    onClick={() => onEdit(chapter)}
                                >
                                    Edit Content
                                </button>
                            )}
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-4">{chapter.title}</p>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-500 line-clamp-[10]">
                            <div dangerouslySetInnerHTML={{ __html: chapter.content || "" }} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t mt-4 gap-2">
                    {onDelete && (
                        <Button 
                            className="bg-red-500 hover:bg-red-600 text-white min-w-[120px]"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this chapter?")) {
                                    onDelete(chapter.id)
                                    onOpenChange(false)
                                }
                            }}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
