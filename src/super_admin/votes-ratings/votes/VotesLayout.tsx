import FilterSearch from '@/components/common/filter/FIlterSearch'
import Stats from '@/components/common/stats/Stats'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VoteIcon } from 'lucide-react'
import TopVotedBooksTable from './TopVotedBooksTable'
import TopVotedWriters from './TopVotedWriters'
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

function VotesLayout({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );

  const stats = [
    {
      title: "Daily Votes",
      value: data?.dailyVoteCount,
      icon: <VoteIcon />,
      iconColor: "text-white",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500",
    },
    {
      title: "Weekly Votes",
      value: data?.weeklyVoteCount,
      icon: <VoteIcon />,
      iconColor: "text-white",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500",
    },
    {
      title: "Monthly Votes",
      value: data?.monthlyVoteCount,
      icon: <VoteIcon />,
      iconColor: "text-white",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500",
    },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
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
        defaultValue="book"
        onValueChange={(value: string) => updateSearchParams({ type: value })}
      >
        <TabsList className="bg-linear-to-r from-violet-500 to-indigo-500 w-fit">
          <TabsTrigger
            value="book"
            className="text-gray-100 data-active:bg-linear-to-r from-green-500 to-lime-500"
          >
            Top Voted Books
          </TabsTrigger>
          <TabsTrigger
            value="writer"
            className="text-gray-100 data-active:bg-linear-to-r from-yellow-500 to-orange-500"
          >
            Top Voted Writers
          </TabsTrigger>
        </TabsList>
        {/* <FilterSearch
          search={{
            placeholder: "Search books",
            value: searchTerm,
            onChange: (value) => {
              setSearchTerm(value);
              updateSearchParams({ searchTerm: value });
            },
          }}
        /> */}
        <TabsContent value="book" className="mt-4 outline-none">
          <TopVotedBooksTable rows={data?.data} />
        </TabsContent>
        <TabsContent value="writer" className="mt-4 outline-none">
          <TopVotedWriters items={data?.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default VotesLayout