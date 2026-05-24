"use client";

import { useState } from "react";
import { Eye, X, Check } from "lucide-react";
import BookInfoModal, {
  bookInfoFromModerationRow,
} from "../../../components/common/bookinfomodal/BookInfoModal";
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
import { truncateText } from "@/utils/truncateText";
import { toast } from "sonner";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/utils/revalidateTag";

function BookTable({ data, meta }: { data: any; meta: any }) {
  const [selected, setSelected] = useState(null);

  // handle approve/reject
  const handleApproveReject = async (id: string, status: string) => {
    toast.loading("Processing...", {
      id: "approve-reject",
    });

    try {
      const res = await nextFetch(
        `/book/approved-reject/${id}?status=${status}`,
        {
          method: "PATCH",
        },
      );
      if (res.success) {
        revalidate("contents");
        toast.success("Book updated successfully", {
          id: "approve-reject",
        });
      } else {
        toast.error("Failed to update book", {
          id: "approve-reject",
        });
      }
    } catch (error) {
      toast.error("Failed to update book", {
        id: "approve-reject",
      });
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="pl-6 text-base font-medium text-gray-700">
              Title
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Type
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Genre
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Chapter
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Page
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Review
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Rating
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Status
            </TableHead>
            <TableHead className="pr-6 text-right text-base font-medium text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((book: any) => (
            <TableRow
              key={book._id}
              className="border-b border-gray-100 hover:bg-transparent"
            >
              <TableCell className="pl-6 py-4">
                <p className="text-[24px] leading-tight font-medium text-gray-800">
                  {book.title}
                </p>
                <p className="mt-1 text-sm leading-tight text-gray-400 max-w-[220px]">
                  {truncateText(book.description, 10)}
                </p>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {book.type}
              </TableCell>
              <TableCell>
                <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-500 capitalize">
                  {book.genre}
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {book.chapterCount}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {book.pageCount}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {book.reviewCount}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {book.ratingCount?.toFixed(1)}
              </TableCell>
              <TableCell>
                <span
                  className={
                    book.status === "approved"
                      ? "inline-flex rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-500 capitalize"
                      : book.status === "rejected"
                        ? "inline-flex rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-400 capitalize"
                        : "inline-flex rounded-md bg-amber-50 px-3 py-1 text-xs font-medium text-amber-500 capitalize"
                  }
                >
                  {book.status}
                </span>
              </TableCell>
              <TableCell className="pr-6">
                {book.status === "approved_request" && (
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleApproveReject(book?._id, "approved")}
                      type="button"
                      className={`text-emerald-600 transition-colors hover:bg-emerald-100 p-2 rounded-lg cursor-pointer ${book.status !== "pending" ? "opacity-40 cursor-not-allowed" : ""}`}
                      aria-label="Approve book"
                    >
                      <Check className="size-5" />
                    </button>
                    <button
                      onClick={() => handleApproveReject(book?._id, "rejected")}
                      type="button"
                      className={`text-red-400 transition-colors hover:bg-red-100 p-2 rounded-lg cursor-pointer ${book.status !== "pending" ? "opacity-40 cursor-not-allowed" : ""}`}
                      aria-label="Reject book"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelected(book)}
                    type="button"
                    className={`text-gray-400 transition-colors hover:bg-gray-100 p-2 rounded-lg cursor-pointer`}
                    aria-label="Reject book"
                  >
                    <Eye className="size-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell colSpan={6} className="px-6 py-4">
              {meta && (
                <PageLimit
                  pagination={{
                    page: meta?.page,
                    pageSize: meta?.limit,
                    totalCount: meta?.total,
                  }}
                  onPaginationChange={() => {}}
                  itemLabel="books"
                  mode="summary"
                />
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <BookInfoModal
        open={selected !== null}
        onOpenChange={(next) => {
          if (!next) setSelected(null);
        }}
        book={selected ? bookInfoFromModerationRow(selected) : null}
      />
    </div>
  );
}

export default BookTable;
