"use client"

import * as React from "react"
import Image from "next/image"
import { CheckIcon, ImageIcon, SendHorizontalIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

/** Predefined genres for the book form. */
export const BOOK_GENRES = [
    "Fantasy",
    "Science Fiction",
    "Romance",
    "Mystery",
    "Thriller",
    "Horror",
    "Historical Fiction",
    "Contemporary",
    "Young Adult",
    "Non-fiction",
] as const

export const BOOK_TAGS = [
    "fantasy",
    "romance",
    "action",
    "mystery",
    "sci-fi",
    "horror",
] as const

export type BookFormType = "novel" | "short_stories"

export type AddBookFormValues = {
    title: string
    description: string
    coverFile: File | null
    /** When editing, unchanged cover URL if no new file was chosen. */
    existingCoverUrl?: string | null
    type: BookFormType
    genre: string
    ageDemand: string
    tags: string[]
}

/** Values used to pre-fill the form when editing; omit for a blank add flow. */
export type AddEditBookInitialValues = Partial<AddBookFormValues> & {
    coverImageUrl?: string | null
}

export interface AddEditBookModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    /** Dialog title; defaults to "Add New Book" when not editing. */
    heading?: string
    /** Pre-fill fields (e.g. existing book). */
    initialValues?: AddEditBookInitialValues
    /** Called when the user confirms save with current field values. */
    onSave?: (values: AddBookFormValues) => void | Promise<void>
    /** Optional hook for the header "+ Add Chapters" action. */
    onAddChapters?: () => void
}

function normalizeTag(raw: string): string {
    const t = raw.trim()
    if (!t) return ""
    return t.startsWith("#") ? t : `#${t.replace(/^#+/, "")}`
}

export default function AddEditBookModal({
    open,
    onOpenChange,
    heading,
    initialValues,
    onSave,
}: AddEditBookModalProps) {
    const formId = React.useId()
    const titleId = `${formId}-title`
    const descId = `${formId}-desc`
    const ageId = `${formId}-age`
    const tagId = `${formId}-tag`
    const coverInputId = `${formId}-cover`

    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [coverFile, setCoverFile] = React.useState<File | null>(null)
    const [type, setType] = React.useState<BookFormType>("novel")
    const [genre, setGenre] = React.useState("")
    const [ageDemand, setAgeDemand] = React.useState("13+")
    const [tags, setTags] = React.useState<string[]>([])
    const [tagInput, setTagInput] = React.useState("")
    const [isDraggingCover, setIsDraggingCover] = React.useState(false)
    const [coverPreviewUrl, setCoverPreviewUrl] = React.useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    React.useEffect(() => {
        if (!open) return
        if (initialValues) {
            setTitle(initialValues.title ?? "")
            setDescription(initialValues.description ?? "")
            setCoverFile(initialValues.coverFile ?? null)
            setType(initialValues.type ?? "novel")
            setGenre(initialValues.genre ?? "")
            setAgeDemand(initialValues.ageDemand ?? "13+")
            setTags(initialValues.tags ?? [])
            setTagInput("")
            setCoverPreviewUrl(initialValues.coverImageUrl ?? null)
        } else {
            setTitle("")
            setDescription("")
            setCoverFile(null)
            setType("novel")
            setGenre("")
            setAgeDemand("13+")
            setTags([])
            setTagInput("")
            setCoverPreviewUrl(null)
        }
        setIsSubmitting(false)
    }, [open, initialValues])

    const resolvedHeading = heading ?? (initialValues ? "Edit Book" : "Add New Book")

    const addTagFromInput = () => {
        const next = normalizeTag(tagInput)
        if (!next) return
        setTags((prev) => (prev.includes(next) ? prev : [...prev, next]))
        setTagInput("")
    }

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag))
    }

    const onCoverFiles = (files: FileList | null) => {
        const f = files?.[0]
        if (f && f.type.startsWith("image/")) {
            setCoverFile(f)
            setCoverPreviewUrl(URL.createObjectURL(f))
        }
    }

    const handleSave = async () => {
        if (onSave) {
            setIsSubmitting(true)
            try {
                await onSave({
                    title,
                    description,
                    coverFile,
                    existingCoverUrl: coverFile ? null : coverPreviewUrl,
                    type,
                    genre,
                    ageDemand,
                    tags,
                })
            } catch (e) {
                console.error(e)
            } finally {
                setIsSubmitting(false)
            }
        } else {
            onOpenChange(false)
        }
    }

    const coverHint = coverFile
        ? coverFile.name
        : coverPreviewUrl
            ? "Current cover — click or drop to replace"
            : "Drop an image here or click to upload"

    const fieldShell =
        "rounded-lg border border-transparent bg-gray-100 text-gray-500 placeholder:text-muted-foreground dark:bg-input/30"

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton
                className="flex max-h-[min(90vh,840px)] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
            >
                <DialogHeader className="relative shrink-0 space-y-0 border-b border-border px-4 pb-4 pt-4 pr-14">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <DialogTitle className="text-left text-lg font-semibold text-gray-500">
                            {resolvedHeading}
                        </DialogTitle>

                    </div>
                    <DialogDescription className="sr-only">
                        Form to add or edit book details including title, cover, description,
                        type, genre, age rating, and tags.
                    </DialogDescription>
                </DialogHeader>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                    <div className="flex flex-col gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor={titleId} className="text-xs font-medium text-muted-foreground">
                                Book Title
                            </Label>
                            <Input
                                id={titleId}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter book title"
                                className={cn("h-10", fieldShell)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor={coverInputId} className="text-xs font-medium text-muted-foreground">
                                Cover Image
                            </Label>
                            <input
                                id={coverInputId}
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => onCoverFiles(e.target.files)}
                            />
                            <label
                                htmlFor={coverInputId}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    setIsDraggingCover(true)
                                }}
                                onDragLeave={() => setIsDraggingCover(false)}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    setIsDraggingCover(false)
                                    onCoverFiles(e.dataTransfer.files)
                                }}
                                className={cn(
                                    "flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 transition-colors hover:bg-gray-100/80 dark:border-border dark:bg-muted/20",
                                    isDraggingCover && "border-[#5D33FF] bg-violet-50/50 dark:bg-violet-950/20"
                                )}
                            >
                                {coverPreviewUrl ? (
                                    <Image
                                        src={coverPreviewUrl}
                                        alt=""
                                        width={160}
                                        height={96}
                                        unoptimized
                                        className="mb-2 max-h-24 w-auto rounded-md object-contain"
                                    />
                                ) : (
                                    <ImageIcon className="size-10 text-muted-foreground" aria-hidden />
                                )}
                                <span className="text-center text-sm text-muted-foreground">
                                    {coverHint}
                                </span>
                            </label>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor={descId} className="text-xs font-medium text-muted-foreground">
                                Description
                            </Label>
                            <textarea
                                id={descId}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter book description"
                                rows={4}
                                className={cn(
                                    "field-sizing-content min-h-[100px] w-full resize-y px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm",
                                    fieldShell
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <span className="text-xs font-medium text-muted-foreground">Select Type</span>
                            <div
                                role="radiogroup"
                                aria-label="Book type"
                                className="flex flex-wrap gap-8"
                            >
                                {(
                                    [
                                        { value: "novel" as const, label: "Novel" },
                                        { value: "short_stories" as const, label: "Short Stories" },
                                    ] as const
                                ).map((opt) => {
                                    const selected = type === opt.value
                                    return (
                                        <label
                                            key={opt.value}
                                            className="flex cursor-pointer items-center gap-2.5 text-sm font-medium"
                                        >
                                            <input
                                                type="radio"
                                                name={`${formId}-type`}
                                                value={opt.value}
                                                checked={selected}
                                                onChange={() => setType(opt.value)}
                                                className="sr-only"
                                            />
                                            <span
                                                className={cn(
                                                    "flex size-5 shrink-0 items-center justify-center rounded border transition-colors",
                                                    selected
                                                        ? "border-teal-700 bg-teal-700 text-white dark:border-teal-600 dark:bg-teal-600"
                                                        : "border-gray-300 bg-white dark:border-input dark:bg-background"
                                                )}
                                                aria-hidden
                                            >
                                                {selected ? <CheckIcon className="size-3.5 stroke-3" /> : null}
                                            </span>
                                            {opt.label}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-xs font-medium text-muted-foreground">Genre</Label>
                            <Select value={genre || undefined} onValueChange={setGenre}>
                                <SelectTrigger
                                    size="default"
                                    className={cn("h-10 w-full", fieldShell)}
                                >
                                    <SelectValue placeholder="Select Genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    {BOOK_GENRES.map((g) => (
                                        <SelectItem key={g} value={g}>
                                            {g}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor={ageId} className="text-xs font-medium text-muted-foreground">
                                Age Demand
                            </Label>
                            <Input
                                id={ageId}
                                value={ageDemand}
                                onChange={(e) => setAgeDemand(e.target.value)}
                                placeholder="13+"
                                className={cn("h-10", fieldShell)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-xs font-medium text-muted-foreground">
                                Tags
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className={cn("w-full justify-between h-10 font-normal", fieldShell)}>
                                        {tags.length > 0 ? `${tags.length} selected` : "Select tags"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Available Tags</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {BOOK_TAGS.map((tag) => (
                                        <DropdownMenuCheckboxItem
                                            key={tag}
                                            checked={tags.includes(tag)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setTags([...tags, tag])
                                                } else {
                                                    removeTag(tag)
                                                }
                                            }}
                                            className="capitalize"
                                        >
                                            {tag}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {tags.length > 0 ? (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="gap-1 pr-1 pl-2.5 font-normal capitalize"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                className="rounded-full p-0.5 hover:bg-foreground/10"
                                                aria-label={`Remove ${tag}`}
                                                onClick={() => removeTag(tag)}
                                            >
                                                <XIcon className="size-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className=" flex flex-row gap-2 justify-end border-t border-border bg-gray-100 p-4 ">
                    <Button type="button" variant="outline" className="bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-2 hover:cursor-pointer" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="bg-[#5D33FF] text-white hover:bg-[#5D33FF]/90"
                        onClick={handleSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Book"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
