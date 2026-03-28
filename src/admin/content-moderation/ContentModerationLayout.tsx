"use client";
import React from "react";
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import BookTable from "./BookTable";
import ChaptersTable from "./ChaptersTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

function ContentModerationLayout() {
  const search = {
    placeholder: "Search",
    value: "",
    onChange: (value: string) => {
      console.log(value);
    },
  };
  const selects = [
    {
      placeholder: "Select",
      options: ["Option 1", "Option 2", "Option 3"],
      value: "",
      onValueChange: (value: string) => {
        console.log(value);
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
        <div className="flex gap-2">
          <Button variant="outline" className="hover:bg-black hover:text-white">Add New Book</Button>
          <Button variant="outline" className="hover:bg-black hover:text-white">Add New Chapter</Button>
        </div>
      </div>

      <FilterSearch search={search} selects={selects} />
      <Tabs defaultValue="books">
        <TabsList>
          <TabsTrigger value="books" className="text-gray-700 hover:text-gray-800 data-[state=active]:bg-violet-500 data-[state=active]:text-white">Books</TabsTrigger>
          <TabsTrigger value="chapters" className="text-gray-700 hover:text-gray-800 data-[state=active]:bg-violet-500 data-[state=active]:text-white">Chapters</TabsTrigger>
        </TabsList>
        <TabsContent value="books">
          <BookTable />
        </TabsContent>
        <TabsContent value="chapters">
          <ChaptersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ContentModerationLayout;
