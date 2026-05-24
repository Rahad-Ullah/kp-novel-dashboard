"use client";

import { Ban, Eye, StarIcon } from "lucide-react";
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

type ReaderRow = {
    id: string;
    name: string;
    email: string;
    booksRead: number;
    chaptersRead: number;
    powerStones: number;
    lastActive: string;
    status: "Active" | "Suspended";
};

function ReadersTable({ users, meta }: { users: any[]; meta: any }) {
  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="pl-6 text-base font-semibold text-gray-700">
              User
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Age
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Joined
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Power Stones
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Status
            </TableHead>
            <TableHead className="pr-6 text-base font-semibold text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((reader) => (
            <TableRow
              key={reader._id}
              className="border-b border-gray-100 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 py-5 align-middle">
                <p className="text-base font-medium text-gray-900">
                  {reader.fullName}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">{reader.email}</p>
              </TableCell>
              <TableCell className="py-5 text-base text-gray-600">
                {reader.age}
              </TableCell>
              <TableCell className="py-5 text-base tabular-nums text-gray-600">
                {new Date(reader.createdAt).toDateString()}
              </TableCell>
              <TableCell className="py-5 text-base tabular-nums text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <StarIcon
                    className="size-4 shrink-0 fill-yellow-400 text-yellow-400"
                    aria-hidden
                  />
                  {reader.powerStones.toLocaleString()}
                </span>
              </TableCell>
              <TableCell className="py-5 align-middle">
                <span
                  className={
                    reader.isActive
                      ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                      : "inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                  }
                >
                  {reader.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="pr-6 py-5">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="text-gray-400 transition-colors hover:text-gray-600"
                    aria-label="View reader"
                  >
                    <Eye className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 transition-colors hover:text-gray-600"
                    aria-label="Suspend reader"
                  >
                    <Ban className="size-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell colSpan={7} className="px-6 py-4">
              <PageLimit
                pagination={{
                  page: meta.page,
                  pageSize: meta.limit,
                  totalCount: meta.total,
                }}
                onPaginationChange={(pagination) => {
                  updateSearchParams({
                    page: pagination.page.toString(),
                    limit: pagination.pageSize.toString(),
                  });
                }}
                itemLabel="readers"
                mode="summary"
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default ReadersTable;
