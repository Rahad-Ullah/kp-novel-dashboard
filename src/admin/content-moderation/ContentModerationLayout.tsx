"use client";

import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import BookTable from "./BookTable";
import ChaptersTable from "./ChaptersTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


function ContentModerationLayout({ data, meta }: { data: any; meta: any }) {
  const updateSearchParams = useUpdateSearchParams();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState({
    searchTerm: searchParams.get("searchTerm") || "",
    status: searchParams.get("status") || "",
  });

  const search = {
    placeholder: "Search",
    value: filter.searchTerm,
    onChange: (value: string) => {
      setFilter((prev) => ({ ...prev, searchTerm: value }));
      updateSearchParams({ searchTerm: value });
    },
  };
  const selects = [
    {
      placeholder: "Status",
      options: ["approved", "rejected", "pending"],
      value: filter.status,
      onValueChange: (value: string) => {
        setFilter((prev) => ({ ...prev, status: value }));
        updateSearchParams({ status: value });
      },
    },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SmallPageInfo
          title="Content Moderation"
          description="Manage your content moderation"
        />
        {/* <div className="flex gap-2">
          <Button variant="outline" className="hover:bg-black hover:text-white">Add New Book</Button>
          <Button variant="outline" className="hover:bg-black hover:text-white">Add New Chapter</Button>
        </div> */}
      </div>

      {/* <FilterSearch search={search} selects={selects} /> */}
      <Tabs
        defaultValue="book"
        value={searchParams.get("type") || "book"}
        onValueChange={(value) => {
          updateSearchParams({ type: value });
        }}
      >
        <TabsList>
          <TabsTrigger
            value="book"
            className="text-gray-700 hover:text-gray-800 data-[state=active]:bg-violet-500 data-[state=active]:text-white"
          >
            Books
          </TabsTrigger>
          <TabsTrigger
            value="chapter"
            className="text-gray-700 hover:text-gray-800 data-[state=active]:bg-violet-500 data-[state=active]:text-white"
          >
            Chapters
          </TabsTrigger>
        </TabsList>
        <TabsContent value="book">
          <BookTable data={data} meta={meta} />
        </TabsContent>
        <TabsContent value="chapter">
          <ChaptersTable data={data} meta={meta} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ContentModerationLayout;
