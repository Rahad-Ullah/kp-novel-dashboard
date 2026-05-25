"use client"

import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { fetchBooksAction } from "@/src/author/mychapters/actions"

export type AddChapterFormValues = {
    bookId: string
    title: string
    chapterNumber: number
    text: string
    status?: string
    scheduledDate?: string
}

export type AddEditChapterInitialValues = Partial<AddChapterFormValues>

interface AddEditChapterModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialValues?: AddEditChapterInitialValues
    onSave?: (values: AddChapterFormValues) => void | Promise<void>
}

export default function AddEditChapterModal({
    open,
    onOpenChange,
    initialValues,
    onSave,
}: AddEditChapterModalProps) {
    const isEditMode = !!initialValues?.title

    const [bookId, setBookId] = useState("")
    const [title, setTitle] = useState("")
    const [chapterNumber, setChapterNumber] = useState<number | "">("")
    const [text, setText] = useState("")
    const [status, setStatus] = useState("")
    const [scheduledDate, setScheduledDate] = useState("")

    const [books, setBooks] = useState<{ _id: string, title: string }[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (open) {
            // Fetch books for dropdown
            fetchBooksAction().then((res) => {
                if (res.success && res.data?.result) {
                    setBooks(res.data.result)
                }
            }).catch(console.error)

            if (initialValues) {
                setBookId(initialValues.bookId || "")
                setTitle(initialValues.title || "")
                setChapterNumber(initialValues.chapterNumber || "")
                setText(initialValues.text || "")
                setStatus(initialValues.status || "")
                setScheduledDate(initialValues.scheduledDate ? new Date(initialValues.scheduledDate).toISOString().split('T')[0] : "")
            } else {
                setBookId("")
                setTitle("")
                setChapterNumber("")
                setText("")
                setStatus("")
                setScheduledDate("")
            }
        }
    }, [open, initialValues])

    const handleSave = async () => {
        if (!bookId || !title || chapterNumber === "" || !text) {
            alert("Please fill out all required fields (Book, Title, Number, Content).")
            return
        }

        setIsSubmitting(true)
        try {
            if (onSave) {
                await onSave({
                    bookId,
                    title,
                    chapterNumber: Number(chapterNumber),
                    text,
                    status,
                    scheduledDate: scheduledDate ? new Date(scheduledDate).toISOString() : undefined,
                })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {isEditMode ? "Edit Chapter Information" : "Add New Chapter"}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Select Book</Label>
                            <Select value={bookId} onValueChange={setBookId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a book" />
                                </SelectTrigger>
                                <SelectContent>
                                    {books.map(book => (
                                        <SelectItem key={book._id} value={book._id}>{book.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Chapter Number</Label>
                            <Input
                                type="number"
                                placeholder="e.g., Chapter 12"
                                value={chapterNumber}
                                onChange={(e) => setChapterNumber(e.target.value ? Number(e.target.value) : "")}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Chapter Title</Label>
                        <Input
                            placeholder="Enter Chapter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Chapter Content</Label>
                        <textarea
                            placeholder="Write your chapter content here..."
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Scheduled Date</Label>
                            <Input
                                type="date"
                                placeholder="dd/mm/yyyy"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#5D33FF] hover:bg-[#4b29cc] text-white"
                        onClick={handleSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : isEditMode ? "Save all Changes" : "Published"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
