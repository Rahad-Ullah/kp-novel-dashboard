"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PaginationData = {
    page: number;
    pageSize: number;
    totalCount: number;
};

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;

type PageLimitProps = {
    pagination: PaginationData;
    onPaginationChange: (pagination: PaginationData) => void;
    itemLabel?: string;
    className?: string;
    mode?: "full" | "summary";
};

function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "ellipsis")[] = [];
    if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages);
    } else if (currentPage >= totalPages - 2) {
        pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
    }
    return pages;
}

export default function PageLimit({
    pagination,
    onPaginationChange,
    itemLabel = "items",
    className,
    mode = "full",
}: PageLimitProps) {
    const { page, pageSize, totalCount } = pagination;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalCount);

    const handlePageSizeChange = (value: string) => {
        const newPageSize = Number(value);
        const newPage = Math.min(page, Math.ceil(totalCount / newPageSize) || 1);
        onPaginationChange({
            page: newPage,
            pageSize: newPageSize,
            totalCount,
        });
    };

    const goToPage = (newPage: number) => {
        const clamped = Math.max(1, Math.min(newPage, totalPages));
        onPaginationChange({ page: clamped, pageSize, totalCount });
    };

    const pageNumbers = getPageNumbers(page, totalPages);

    if (mode === "summary") {
        return (
          <div className={cn("w-full", className)}>
            <p className="text-sm text-gray-500">
              Showing {end} of {totalCount?.toLocaleString()} {itemLabel}
            </p>
          </div>
        );
    }

    return (
        <div
            className={cn(
                "flex flex-wrap items-center justify-between gap-4 rounded-lg border-0 bg-transparent px-0 py-0 w-full",
                className
            )}
        >
            <p className="text-sm text-gray-400">
                Showing {totalCount === 0 ? 0 : start} to {end} of {totalCount.toLocaleString()} {itemLabel}
            </p>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Rows per page</span>
                <Select
                    value={String(pageSize)}
                    onValueChange={handlePageSizeChange}
                >
                    <SelectTrigger className="h-8 w-[70px] rounded-md border-gray-500/60 bg-gray-300/50 text-gray-500 focus:ring-gray-500/20 [&_svg]:text-gray-400">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-gray-500/60 bg-white/50">
                        {ROWS_PER_PAGE_OPTIONS.map((size) => (
                            <SelectItem key={size} value={String(size)} className="text-gray-500 focus:bg-gray-300/50 focus:text-gray-100">
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-0.5">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-md text-gray-300 hover:bg-gray-500/40 hover:text-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                    onClick={() => goToPage(1)}
                    disabled={page <= 1}
                    aria-label="First page"
                >
                    <ChevronsLeft className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-md text-gray-300 hover:bg-gray-500/40 hover:text-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="size-4" />
                </Button>
                {pageNumbers.map((p, i) =>
                    p === "ellipsis" ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="flex size-8 items-center justify-center text-sm text-gray-400"
                        >
                            ...
                        </span>
                    ) : (
                        <Button
                            key={p}
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "size-8 rounded-md text-sm font-medium",
                                p === page
                                    ? "bg-gray-500/80 text-white hover:bg-gray-500/90 hover:text-white"
                                    : "text-gray-300 hover:bg-gray-500/40 hover:text-gray-100"
                            )}
                            onClick={() => goToPage(p)}
                            aria-label={`Page ${p}`}
                            aria-current={p === page ? "page" : undefined}
                        >
                            {p}
                        </Button>
                    )
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-md text-gray-300 hover:bg-gray-500/40 hover:text-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Next page"
                >
                    <ChevronRight className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-md text-gray-300 hover:bg-gray-500/40 hover:text-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                    onClick={() => goToPage(totalPages)}
                    disabled={page >= totalPages}
                    aria-label="Last page"
                >
                    <ChevronsRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}
