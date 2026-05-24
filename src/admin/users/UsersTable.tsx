import React, { useState } from "react";
import { Eye, Ban, CheckCircle2 } from "lucide-react";
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

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: "Author" | "Reader";
  books: number;
  joined: string;
  status: "Active" | "Suspended";
};

function UsersTable({ users, meta }: { users: any[]; meta: any }) {
  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="pl-6 font-semibold text-base text-gray-700">
              User
            </TableHead>
            <TableHead className="font-semibold text-base text-gray-700">
              Age
            </TableHead>
            <TableHead className="font-semibold text-base text-gray-700">
              Joined
            </TableHead>
            <TableHead className="font-semibold text-base text-gray-700">
              Status
            </TableHead>
            <TableHead className="font-semibold text-base text-gray-700 text-right pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              className="border-b border-gray-100 hover:bg-transparent"
            >
              <TableCell className="pl-6 py-4">
                <p className="text-base font-medium text-gray-700">
                  {user.fullName}
                </p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </TableCell>
              <TableCell className="text-base text-gray-500">
                {user.age}
              </TableCell>
              <TableCell className="text-base text-gray-400">
                {new Date(user.createdAt).toDateString()}
              </TableCell>
              <TableCell>
                <span
                  className={
                    user.isActive
                      ? "inline-flex rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-500"
                      : "inline-flex rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-400"
                  }
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="pr-6">
                <div className="flex items-center justify-end gap-4">
                  <button
                    className="text-gray-400 transition-colors hover:text-gray-600"
                    aria-label="View user"
                  >
                    <Eye className="size-4" />
                  </button>
                  {user.status === "Active" ? (
                    <button
                      className="text-red-400 transition-colors hover:text-red-500"
                      aria-label="Suspend user"
                    >
                      <Ban className="size-4" />
                    </button>
                  ) : (
                    <button
                      className="text-emerald-600 transition-colors hover:text-emerald-700"
                      aria-label="Activate user"
                    >
                      <CheckCircle2 className="size-4" />
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell colSpan={6} className="px-6 py-4">
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

export default UsersTable;
