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

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: "Author" | "Reader";
  books: number;
  joined: string;
  status: "Active" | "Suspended";
};

const users: UserRow[] = [
  { id: "1", name: "Ava Anderson", email: "ava.a@gmail.com", role: "Author", books: 45, joined: "2025-06-15", status: "Active" },
  { id: "2", name: "Ava Anderson", email: "ava.a@gmail.com", role: "Author", books: 45, joined: "2025-06-15", status: "Active" },
  { id: "3", name: "Ava Anderson", email: "ava.a@gmail.com", role: "Reader", books: 0, joined: "2025-06-15", status: "Active" },
  { id: "4", name: "Ava Anderson", email: "ava.a@gmail.com", role: "Author", books: 45, joined: "2025-06-15", status: "Active" },
  { id: "5", name: "Ava Anderson", email: "ava.a@gmail.com", role: "Reader", books: 0, joined: "2025-06-15", status: "Active" },
  { id: "6", name: "Ava Anderson", email: "ava.a@gmail.com", role: "Author", books: 45, joined: "2025-06-15", status: "Suspended" },
  { id: "7", name: "Ava Anderson", email: "ava.a@gmail.com", role: "Author", books: 45, joined: "2025-06-15", status: "Suspended" },
  { id: "8", name: "Ava Anderson", email: "ava.a@gmail.com", role: "Author", books: 45, joined: "2025-06-15", status: "Suspended" },
];

function UsersTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(120);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="pl-6 font-semibold text-base text-gray-700">User</TableHead>
            <TableHead className="font-semibold text-base text-gray-700">Role</TableHead>
            <TableHead className="font-semibold text-base text-gray-700">Books</TableHead>
            <TableHead className="font-semibold text-base text-gray-700">Joined</TableHead>
            <TableHead className="font-semibold text-base text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-base text-gray-700 text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-b border-gray-100 hover:bg-transparent">
              <TableCell className="pl-6 py-4">
                <p className="text-base font-medium text-gray-700">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </TableCell>
              <TableCell className="text-base text-gray-500">{user.role}</TableCell>
              <TableCell className="text-base text-gray-500">{user.books}</TableCell>
              <TableCell className="text-base text-gray-400">{user.joined}</TableCell>
              <TableCell>
                <span
                  className={
                    user.status === "Active"
                      ? "inline-flex rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-500"
                      : "inline-flex rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-400"
                  }
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="pr-6">
                <div className="flex items-center justify-end gap-4">
                  <button className="text-gray-400 transition-colors hover:text-gray-600" aria-label="View user">
                    <Eye className="size-4" />
                  </button>
                  {user.status === "Active" ? (
                    <button className="text-red-400 transition-colors hover:text-red-500" aria-label="Suspend user">
                      <Ban className="size-4" />
                    </button>
                  ) : (
                    <button className="text-emerald-600 transition-colors hover:text-emerald-700" aria-label="Activate user">
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
                pagination={{ page, pageSize, totalCount }}
                onPaginationChange={(pagination) => {
                  setPage(pagination.page);
                  setPageSize(pagination.pageSize);
                  setTotalCount(pagination.totalCount);
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
