"use client";

import UsersTable from "@/src/admin/users/UsersTable"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import FilterSearch from "@/components/common/filter/FIlterSearch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReadersTable from "./ReadersTable";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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
  return (
    <div className="space-y-4">
      <SmallPageInfo title="Users" description="Manage your users" />
      <FilterSearch search={search} selects={selects} />

      <Tabs
        defaultValue="user"
        onValueChange={(tab) =>
          updateSearchParams({ role: tab === "all" ? null : tab })
        }
      >
        <TabsList className="bg-linear-to-r from-violet-500 to-indigo-500 w-fit">
          <TabsTrigger
            value="all"
            className="text-gray-100 data-active:bg-linear-to-r from-green-500 to-lime-500"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="user"
            className="text-gray-100 data-active:bg-linear-to-r from-green-500 to-lime-500"
          >
            Readers
          </TabsTrigger>
          <TabsTrigger
            value="author"
            className="text-gray-100 data-active:bg-linear-to-r from-yellow-500 to-orange-500"
          >
            Book Authors
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <UsersTable users={users} meta={meta} />
        </TabsContent>
        <TabsContent value="user">
          <ReadersTable users={users} meta={meta} />
        </TabsContent>
        <TabsContent value="author">
          <UsersTable users={users} meta={meta} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UsersLayout;