import React from "react";
import { Eye, Ban, CheckCircle2, Check, X } from "lucide-react";
import PageLimit from "@/components/common/pagelimit/PageLimit";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ChaptersTable({ data, meta }: { data: any[]; meta: any }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="pl-6 text-base font-medium text-gray-700">
              Book Title
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Chapter Number
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Total Character Count
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Read Character Count
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Scheduled Date
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Status
            </TableHead>
            {/* <TableHead className="pr-6 text-right text-base font-medium text-gray-700">
              Action
            </TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((chapter) => (
            <TableRow
              key={chapter._id}
              className="border-b border-gray-100 hover:bg-transparent"
            >
              <TableCell className="pl-6 py-4 text-[24px] leading-tight font-medium text-gray-800">
                {chapter.title}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {chapter.chapterNumber}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {chapter.totalCharacterCount}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {chapter.readCharacterCount}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {new Date(chapter.scheduledDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <span
                  className={
                    chapter.status === "approved"
                      ? "inline-flex rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-500 capitalize"
                      : chapter.status === "rejected"
                        ? "inline-flex rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-400 capitalize"
                        : "inline-flex rounded-md bg-amber-50 px-3 py-1 text-xs font-medium text-amber-500 capitalize"
                  }
                >
                  {chapter.status}
                </span>
              </TableCell>
              {/* <TableCell className="pr-6">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    className="text-emerald-600 transition-colors hover:bg-emerald-100 p-2 rounded-lg cursor-pointer"
                    aria-label="Approve book"
                  >
                    <Check className="size-5" />
                  </button>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell colSpan={7} className="px-6 py-4">
              <PageLimit
                pagination={{
                  page: meta?.page,
                  pageSize: meta?.limit,
                  totalCount: meta?.total,
                }}
                onPaginationChange={() => {}}
                itemLabel="users"
                mode="summary"
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default ChaptersTable;
