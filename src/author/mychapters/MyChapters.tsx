"use client"
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import FilterSearch from '@/components/common/filter/FIlterSearch'
import Stats from '@/components/common/stats/Stats'
import { BookIcon } from 'lucide-react'
import ChaptersTable from './ChaptersTable'
import { Badge } from '@/components/ui/badge'
import type { ChapterRow, ColumnDef } from './ChaptersTable'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'


function MyChapters() {
    const search = {
        placeholder: "Search",
        value: "",
        onChange: (value: string) => {
            console.log(value)
        }
    }
    const selects = [
        {
            placeholder: "Select",
            options: ["Option 1", "Option 2", "Option 3"],
            value: "",
            onValueChange: (value: string) => {
                console.log(value)
            }
        }
    ]
    const stats = [
        {
            title: "Total Chapters",
            value: 100,
            icon: <BookIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
        },
        {
            title: "Pending",
            value: 100,
            icon: <BookIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
        },
        {
            title: "Published",
            value: 100,
            icon: <BookIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
        }
    ]
    const chapters = [
        {
            id: "1",
            title: "Chapter 1",
            book: "Book 1",
            chapter: "Chapter 1",
            words: 1000,
            views: 1000,
            likes: 1000,
            comments: 1000,
            rating: 4.5,
            reviews: 1000,
            submittedAt: new Date(),
            status: "pending",
        },
        {
            id: "2",
            title: "Chapter 2",
            book: "Book 2",
            chapter: "Chapter 2",
            words: 1000,
            views: 1000,
            likes: 1000,
            comments: 1000,
            rating: 4.5,
            reviews: 1000,
            submittedAt: new Date(),
            status: "published",
        }
    ]

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
            cell: (row) => row.chapter,
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
            cell: (row) => <Badge className={cn("bg-gray-200 text-gray-500", row.status === "pending" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500")}>{row.status}</Badge>,
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
            cell: (row) => <span className="text-gray-500">{row.submittedAt.toLocaleDateString()}</span>,
            className: "text-right text-gray-500",
            headClassName: "font-bold text-right",
        },

    ]
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <SmallPageInfo
                    title="My Chapters"
                    description="Manage your chapter collection"
                />
                <Button variant="outline" className="hover:bg-black hover:text-white">Add New Chapter</Button>
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
            <ChaptersTable columns={columns} data={chapters as ChapterRow[]} />
        </div>
    )
}

export default MyChapters