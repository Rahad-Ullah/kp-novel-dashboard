"use client";

import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import FilterSearch from "@/components/common/filter/FIlterSearch";
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
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/utils/revalidateTag";
import { Lock, LockOpen } from "lucide-react";
import PageLimit from "@/components/common/pagelimit/PageLimit";

function UsersLayout({ users, meta }: { users: any[]; meta: any }) {
  const updateSearchParams = useUpdateSearchParams();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    searchTerm: searchParams.get("searchTerm") || "",
    isActive: searchParams.get("isActive") || "",
  });

  const search = {
    placeholder: "Search",
    value: filters.searchTerm,
    onChange: (value: string) => {
      setFilters((prev) => ({ ...prev, searchTerm: value }));
      updateSearchParams({ searchTerm: value });
    },
  };
  const selects = [
    {
      placeholder: "Status",
      options: ["Active", "Inactive"],
      value: filters.isActive,
      onValueChange: (value: string) => {
        setFilters((prev) => ({ ...prev, isActive: value }));
        updateSearchParams({ isActive: value === "Active" ? "true" : "false" });
      },
    },
  ];

  // handle suspend user
  const handleSuspendUser = async (userId: string) => {
    toast.loading("Suspending user...", {
      id: "suspend-user",
    });
    try {
      const res = await nextFetch(`/users/blocked/${userId}`, {
        method: "PATCH",
      });
      if (res.success) {
        revalidate("users");
        toast.success("User updated successfully", {
          id: "suspend-user",
        });
      } else {
        toast.error("Failed to update user", {
          id: "suspend-user",
        });
      }
    } catch (error) {
      toast.error("Failed to update user", {
        id: "suspend-user",
      });
    }
  };
  return (
    <div className="space-y-4">
      <SmallPageInfo title="Users" description="Manage your users" />
      <FilterSearch search={search} selects={selects} />

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
            {users?.map((user) => (
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
                    {user.isActive ? (
                      <button
                        className="text-emerald-400 transition-colors hover:text-red-500 cursor-pointer"
                        aria-label="Suspend user"
                        onClick={() => handleSuspendUser(user._id)}
                      >
                        <LockOpen className="size-5" />
                      </button>
                    ) : (
                      <button
                        className="text-red-600 transition-colors hover:text-emerald-700 cursor-pointer"
                        aria-label="Activate user"
                        onClick={() => handleSuspendUser(user._id)}
                      >
                        <Lock className="size-5" />
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
    </div>
  );
}

export default UsersLayout;
