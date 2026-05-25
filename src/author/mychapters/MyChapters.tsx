"use client"
import React from "react"
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import FilterSearch from '@/components/common/filter/FIlterSearch'
import Stats from '@/components/common/stats/Stats'
import { BookIcon, EyeIcon, MessageCircleIcon } from 'lucide-react'
import ChaptersTable from './ChaptersTable'
import { Badge } from '@/components/ui/badge'
import type { ChapterRow, ColumnDef } from './ChaptersTable'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import AddEditChapterModal, { type AddChapterFormValues, type AddEditChapterInitialValues } from "@/components/common/chaptermodals/AddEditChapterModal"
import ChapterInfoModal from "@/components/common/chaptermodals/ChapterInfoModal"
import { createChapterAction, updateChapterAction, deleteChapterAction } from "./actions"

export interface ApiChapterItem {
  _id: string;
  userId?: string;
  bookId?: string;
  title?: string;
  chapterNumber?: number;
  totalCharacterCount?: number;
  readCharacterCount?: number;
  text?: string;
  scheduledDate?: string;
  status?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MyChaptersData {
  totalApprovedChapter?: number;
  totalPendingChapter?: number;
  totalRejectedChapter?: number;
  result?: ApiChapterItem[];
}

function MyChapters({ initialData }: { initialData?: MyChaptersData }) {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("All")
    const [viewingChapter, setViewingChapter] = React.useState<ChapterRow | null>(null)
    const [addEditModalOpen, setAddEditModalOpen] = React.useState(false)
    const [editingChapter, setEditingChapter] = React.useState<ChapterRow | null>(null)

    const modalInitialValues = React.useMemo(
        (): AddEditChapterInitialValues | undefined => 
            editingChapter ? {
                bookId: editingChapter.bookId,
                title: editingChapter.title,
                chapterNumber: editingChapter.chapterNumber,
                text: editingChapter.content,
                status: String(editingChapter.status),
                scheduledDate: editingChapter.scheduledDate,
            } : undefined,
        [editingChapter]
    )

    const search = {
        placeholder: "Search chapters...",
        value: searchTerm,
        onChange: setSearchTerm,
    }
    const selects = [
        {
            placeholder: "Status",
            options: ["All", "approved", "pending", "rejected"],
            value: statusFilter,
            onValueChange: setStatusFilter,
        }
    ]

    const totalChapters = 
        (initialData?.totalApprovedChapter || 0) + 
        (initialData?.totalPendingChapter || 0) + 
        (initialData?.totalRejectedChapter || 0);

    const stats = [
        {
            title: "Total Chapters",
            value: totalChapters,
            icon: <BookIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
        },
        {
            title: "Pending",
            value: initialData?.totalPendingChapter || 0,
            icon: <EyeIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-amber-500 to-orange-500! ",
        },
        {
            title: "Approved",
            value: initialData?.totalApprovedChapter || 0,
            icon: <MessageCircleIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-green-500 to-lime-500! ",
        }
    ]

    const chapters = (initialData?.result || []).map((apiChapter) => {
        return {
            id: apiChapter._id,
            title: apiChapter.title || "Untitled",
            bookId: apiChapter.bookId || "",
            book: "N/A", // API currently returns bookId only
            chapter: `Chapter ${apiChapter.chapterNumber || 0}`,
            chapterNumber: apiChapter.chapterNumber || 0,
            words: apiChapter.totalCharacterCount || 0,
            views: apiChapter.readCharacterCount || 0,
            likes: 0,
            comments: 0,
            rating: 0,
            reviews: 0,
            submittedAt: new Date(apiChapter.createdAt || new Date()),
            scheduledDate: apiChapter.scheduledDate || "",
            status: apiChapter.status || "pending",
            content: apiChapter.text || "<p>No description available.</p>",
        }
    }).filter((chapter) => {
        const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || chapter.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const columns: ColumnDef<ChapterRow>[] = [
        {
            key: "book",
            header: "Book",
            cell: (row) => row.book,
            className: "text-left text-gray-500",
            headClassName: "font-bold text-gray-500",
        },
        {
            key: "chapter",
            header: "Chapter",
            cell: (row) => (
                <div 
                    className="cursor-pointer group" 
                    onClick={() => setViewingChapter(row)}
                >
                    <div className="font-medium text-foreground group-hover:text-[#5D33FF] group-hover:underline transition-colors">{row.title}</div>
                    <div className="text-sm text-gray-500">{row.chapter}</div>
                </div>
            ),
            className: "text-left text-gray-500",
            headClassName: "font-bold",
        },
        {
            key: "words",
            header: "Words",
            cell: (row) => row.words,
            className: "text-left text-gray-500",
            headClassName: "font-bold",
        },
        {
            key: "status",
            header: "Status",
            cell: (row) => (
                <Badge className={cn(
                    "bg-gray-200 text-gray-500 capitalize", 
                    row.status === "pending" ? "bg-amber-500/10 text-amber-500" : 
                    row.status === "approved" ? "bg-green-500/10 text-green-500" :
                    "bg-red-500/10 text-red-500"
                )}>
                    {row.status}
                </Badge>
            ),
            headClassName: "font-bold",
        },
        {
            key: "views",
            header: "Views",
            cell: (row) => row.views,
            className: "text-left text-gray-500",
            headClassName: "font-bold",
        },
        {
            key: "submittedAt",
            header: "Submitted At",
            cell: (row) => <span className="text-gray-500">{row.submittedAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>,
            className: "text-right text-gray-500",
            headClassName: "font-bold text-right",
        },
    ]

    const handleSaveChapter = async (values: AddChapterFormValues) => {
        try {
            let res;
            if (editingChapter) {
                res = await updateChapterAction(editingChapter.id, values)
            } else {
                res = await createChapterAction(values)
            }

            if (res.success) {
                toast.success(`Chapter ${editingChapter ? "updated" : "created"} successfully!`)
                setAddEditModalOpen(false)
                router.refresh()
            } else {
                toast.error(res.message || `Failed to ${editingChapter ? "update" : "create"} chapter`)
            }
        } catch (error) {
            console.error("Save chapter error:", error)
            toast.error("An error occurred while saving the chapter.")
        }
    }

    const handleDeleteChapter = async (id: string) => {
        try {
            const res = await deleteChapterAction(id)
            if (res.success) {
                toast.success("Chapter deleted successfully!")
                setViewingChapter(null)
                router.refresh()
            } else {
                toast.error(res.message || "Failed to delete chapter")
            }
        } catch (error) {
            console.error("Delete chapter error:", error)
            toast.error("An error occurred while deleting the chapter.")
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <SmallPageInfo
                    title="My Chapters"
                    description="Manage your chapter collection"
                />
                <Button variant="outline" className="hover:bg-black hover:text-white" onClick={() => { setEditingChapter(null); setAddEditModalOpen(true); }}>Add New Chapter</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:w-1/2">
                {stats.map((stat) => (
                    <Stats key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                        iconBackgroundColor={stat.iconBackgroundColor}
                    />
                ))}
            </div>
            <FilterSearch
                search={search}
                selects={selects}
            />
            <ChaptersTable columns={columns} data={chapters as unknown as ChapterRow[]} />

            <ChapterInfoModal 
                open={!!viewingChapter} 
                onOpenChange={(open) => !open && setViewingChapter(null)} 
                chapter={viewingChapter} 
                onDelete={handleDeleteChapter}
                onEdit={(chapter) => {
                    setViewingChapter(null)
                    setEditingChapter(chapter)
                    setAddEditModalOpen(true)
                }}
            />
            
            <AddEditChapterModal 
                open={addEditModalOpen}
                onOpenChange={(open) => {
                    setAddEditModalOpen(open)
                    if (!open) setEditingChapter(null)
                }}
                initialValues={modalInitialValues}
                onSave={handleSaveChapter}
            />
        </div>
    )
}

export default MyChapters