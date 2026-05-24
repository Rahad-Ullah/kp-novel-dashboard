"use client";

import { useState } from "react";
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import Stats from "@/components/common/stats/Stats";
import { BookIcon, BookOpenIcon, EyeIcon, UserIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AuthorCards from "./AuthorCards";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import PageLimit from "@/components/common/pagelimit/PageLimit";




function AuthorsLayout({
  data,
  meta,
  stats,
}: {
  data: any[];
  meta: any;
  stats: any;
}) {
  const updateSearchParams = useUpdateSearchParams();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchTerm") || "",
  );

  const globalStats = [
    {
      title: "Total Authors",
      value: stats?.tatalAuthorCount || 0,
      icon: <UserIcon />,
    },
    {
      title: "Active Authors",
      value: stats?.tatalActiveAuthorCount || 0,
      icon: <UserIcon />,
    },
    {
      title: "Total Books",
      value: stats?.totalNewBook || 0,
      icon: <BookIcon />,
    },
    {
      title: "Total Chapters",
      value: stats?.totalNewChapter || 0,
      icon: <BookOpenIcon />,
    },
  ];

  const search = {
    placeholder: "Search authors here...",
    value: searchQuery,
    onChange: (val: string) => {
      setSearchQuery(val);
      updateSearchParams({ searchTerm: val });
    },
  };

  return (
    <div className="space-y-4">
      <SmallPageInfo title="Authors" description="Manage your authors" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {globalStats.map((stat) => (
          <Stats
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor="text-white"
            iconBackgroundColor="bg-linear-to-r from-blue-500 to-violet-500"
          />
        ))}
      </div>

      <Tabs
        defaultValue={searchParams.get("authorStatus") || "pending"}
        onValueChange={(v) => updateSearchParams({ authorStatus: v })}
        className="w-full gap-4"
      >
        <TabsList className="inline-flex h-11 w-full max-w-md items-center justify-start gap-1  border border-gray-200 bg-gray-50/90 p-1 shadow-none sm:w-auto">
          <TabsTrigger
            value="pending"
            className="data-active:bg-linear-to-r from-yellow-500 to-orange-500 px-5 py-2 text-sm font-medium text-gray-900 hover:text-gray-950 shadow-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="data-active:bg-linear-to-r from-green-500 to-lime-500 hover:text-gray-950 px-5 py-2 text-sm font-medium text-gray-900 shadow-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-active:bg-linear-to-r from-pink-500 to-red-500 hover:text-gray-950 px-5 py-2 text-sm font-medium text-gray-900 shadow-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Rejected
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <FilterSearch search={search} selects={[]} />
        </div>
        <TabsContent value="pending" className="mt-4 outline-none">
          <AuthorCards authors={data || []} />
        </TabsContent>
        <TabsContent value="approved" className="mt-4 outline-none">
          <AuthorCards authors={data || []} />
        </TabsContent>
        <TabsContent value="rejected" className="mt-4 outline-none">
          <AuthorCards authors={data || []} />
        </TabsContent>
      </Tabs>

      {meta && (
        <div className="mt-4">
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
            itemLabel="authors"
            mode="summary"
          />
        </div>
      )}
    </div>
  );
}

export default AuthorsLayout;
