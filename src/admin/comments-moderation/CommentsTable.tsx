"use client";

import { useState } from "react";
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
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

type CommentRow = {
  id: string;
  user: string;
  bookTitle: string;
  comment: string;
  posted: string;
  status: "Normal" | "Reported";
};

function CommentsTable({ data, meta }: { data: any; meta: any }) {
  const updateSearchParams = useUpdateSearchParams();
  const initialComments = data.map((item: any) => ({
    id: item._id,
    user: item.userId.fullName,
    bookTitle: item.bookId.title,
    comment: item.message,
    posted: item.createdAt,
  }));
  const [rows, setRows] = useState<CommentRow[]>(() => [...initialComments]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="w-[12%] pl-6 text-base font-medium text-gray-800">
              User
            </TableHead>
            <TableHead className="w-[18%] text-base font-medium text-gray-800">
              Book
            </TableHead>
            <TableHead className="w-[36%] text-base font-medium text-gray-800">
              Comment
            </TableHead>
            <TableHead className="w-[12%] text-base font-medium text-gray-800">
              Posted
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="border-b border-gray-100 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 py-4 align-top text-sm text-gray-500">
                {row.user}
              </TableCell>
              <TableCell className="py-4 align-top text-sm font-semibold text-gray-900">
                {row.bookTitle}
              </TableCell>
              <TableCell className="py-4 align-top text-sm text-gray-500">
                <p className="max-w-full wrap-break-word leading-relaxed line-clamp-3 md:line-clamp-none">
                  {row.comment}
                </p>
              </TableCell>
              <TableCell className="py-4 align-top text-sm text-gray-500 whitespace-nowrap">
                {new Date(row.posted).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              {/* <TableCell className="py-4 align-top">
                <span
                  className={
                    row.status === "Normal"
                      ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                      : "inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                  }
                >
                  {row.status}
                </span>
              </TableCell> */}
              {/* <TableCell className="pr-6 py-4 align-top">
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-lg border border-red-300 bg-transparent text-red-500 transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete comment"
                    onClick={() => deleteRow(row.id)}
                  >
                    <Trash2 className="size-4" strokeWidth={1.75} />
                  </button>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell colSpan={6} className="px-6 py-4">
              <PageLimit
                pagination={{
                  page: Number(meta.page),
                  pageSize: Number(meta.limit),
                  totalCount: Number(meta.total),
                }}
                onPaginationChange={(pagination) => {
                  updateSearchParams({
                    page: pagination.page.toString(),
                    limit: pagination.pageSize.toString(),
                  });
                }}
                itemLabel="comments"
                mode="summary"
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default CommentsTable;
