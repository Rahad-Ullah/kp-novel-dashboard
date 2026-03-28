"use client";

import React, { useState } from "react";
import { Eye, Ban, CheckCircle2, Trash2 } from "lucide-react";
import BookInfoModal, {
  bookInfoFromModerationRow,
} from "./BookInfoModal";
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

type ModerationRow = {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  submitted: string;
  status: "Pending" | "Approved" | "Rejected";
};

const initialBooks: ModerationRow[] = [
  { id: "1", title: "The Immortal’s Path", description: "An epic tale of magic and destiny...", author: "Chen Wei", genre: "Fantasy", submitted: "1 day ago", status: "Pending" },
  { id: "2", title: "The Immortal’s Path", description: "An epic tale of magic and destiny...", author: "Chen Wei", genre: "Fantasy", submitted: "1 day ago", status: "Pending" },
  { id: "3", title: "The Immortal’s Path", description: "An epic tale of magic and destiny...", author: "Chen Wei", genre: "Fantasy", submitted: "1 day ago", status: "Pending" },
  { id: "4", title: "The Immortal’s Path", description: "An epic tale of magic and destiny...", author: "Chen Wei", genre: "Fantasy", submitted: "1 day ago", status: "Approved" },
  { id: "5", title: "The Immortal’s Path", description: "An epic tale of magic and destiny...", author: "Chen Wei", genre: "Fantasy", submitted: "1 day ago", status: "Pending" },
  { id: "6", title: "The Immortal’s Path", description: "An epic tale of magic and destiny...", author: "Chen Wei", genre: "Fantasy", submitted: "1 day ago", status: "Pending" },
  { id: "7", title: "The Immortal’s Path", description: "An epic tale of magic and destiny...", author: "Chen Wei", genre: "Fantasy", submitted: "1 day ago", status: "Rejected" },
  { id: "8", title: "The Immortal’s Path", description: "An epic tale of magic and destiny...", author: "Chen Wei", genre: "Fantasy", submitted: "1 day ago", status: "Pending" },
];

function BookTable() {
  const [rows, setRows] = useState<ModerationRow[]>(() => [...initialBooks]);
  const [selected, setSelected] = useState<ModerationRow | null>(null);

  function deleteRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSelected((s) => (s?.id === id ? null : s));
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="pl-6 text-base font-medium text-gray-700">Title</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Author</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Genre</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Submitted</TableHead>
            <TableHead className="text-base font-medium text-gray-700">Status</TableHead>
            <TableHead className="pr-6 text-right text-base font-medium text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((book) => (
            <TableRow key={book.id} className="border-b border-gray-100 hover:bg-transparent">
              <TableCell className="pl-6 py-4">
                <p className="text-[24px] leading-tight font-medium text-gray-800">{book.title}</p>
                <p className="mt-1 text-sm leading-tight text-gray-400 max-w-[220px]">{book.description}</p>
              </TableCell>
              <TableCell className="text-sm text-gray-500">{book.author}</TableCell>
              <TableCell>
                <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-500">
                  {book.genre}
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-500">{book.submitted}</TableCell>
              <TableCell>
                <span
                  className={
                    book.status === "Approved"
                      ? "inline-flex rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-500"
                      : book.status === "Rejected"
                        ? "inline-flex rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-400"
                        : "inline-flex rounded-md bg-amber-50 px-3 py-1 text-xs font-medium text-amber-500"
                  }
                >
                  {book.status}
                </span>
              </TableCell>
              <TableCell className="pr-6">
                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    className="text-gray-400 transition-colors hover:text-gray-600"
                    aria-label="View book"
                    onClick={() => setSelected(book)}
                  >
                    <Eye className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="text-emerald-600 transition-colors hover:text-emerald-700"
                    aria-label="Approve book"
                  >
                    <CheckCircle2 className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="text-red-400 transition-colors hover:text-red-500"
                    aria-label="Reject book"
                  >
                    <Ban className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500 transition-colors hover:border-red-300 hover:bg-red-100 hover:text-red-600"
                    aria-label="Delete book"
                    onClick={() => deleteRow(book.id)}
                  >
                    <Trash2 className="size-4" strokeWidth={1.75} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell colSpan={6} className="px-6 py-4">
              <PageLimit
                pagination={{ page: 1, pageSize: 12, totalCount: 120 }}
                onPaginationChange={() => { }}
                itemLabel="books"
                mode="summary"
              />
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
