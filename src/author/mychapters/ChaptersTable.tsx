import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import PageLimit from "@/components/common/pagelimit/PageLimit"
import { useState } from "react"

export type ChapterRow = {
    id: string
    title: string
    book: string
    chapter: string
    words: number
    views: number
    likes: number
    comments: number
    rating: number
    reviews: number
    submittedAt: Date
    status: React.ReactNode
    actions?: React.ReactNode
}

export type ColumnDef<T> = {
    key: string
    header: React.ReactNode
    cell: (row: T) => React.ReactNode
    className?: string
    headClassName?: string
    cellClassName?: string
}

type ChaptersTableProps<T extends { id: string }> = {
    columns: ColumnDef<T>[]
    data: T[]

}

function ChaptersTable<T extends { id: string }>({
    columns,
    data,
}: ChaptersTableProps<T>) {
    const [page, setPage] = useState(1)
    return (
        <Table className="w-full  rounded-lg p-4">
            <TableHeader className="bg-gray-200">
                <TableRow>
                    {columns.map((col) => (
                        <TableHead
                            key={col.key}
                            className={cn(" text-gray-500", col.headClassName)}
                        >
                            {col.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.id}>
                        {columns.map((col) => (
                            <TableCell
                                key={col.key}
                                className={cn(
                                    col.className,
                                    col.cellClassName,
                                    ""
                                )}
                            >
                                {col.cell(row)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={columns.length}>
                        <PageLimit
                            pagination={{
                                page,
                                pageSize: 10,
                                totalCount: data.length,
                            }}
                            onPaginationChange={(pagination) => setPage(pagination.page)}
                        />
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>

    )
}

export default ChaptersTable