import FilterSearch from '@/components/common/filter/FIlterSearch'
import Stats from '@/components/common/stats/Stats'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VoteIcon } from 'lucide-react'
import TopVotedBooksTable from './TopVotedBooksTable'
import TopVotedWriters from './TopVotedWriters'

function VotesLayout({ data }: { data: any }) {
  const result = data?.result || [];

  const totalVotes = result.reduce(
    (sum: number, r: any) => sum + (r.votes || 0),
    0,
  );
  const totalViews = result.reduce(
    (sum: number, r: any) => sum + (r.views || 0),
    0,
  );
  const uniqueCategories = new Set(result.map((r: any) => r.category)).size;

  const stats = [
    {
      title: "Total Votes",
      value: totalVotes,
      icon: <VoteIcon />,
      iconColor: "text-white",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500",
    },
    {
      title: "Total Views",
      value: totalViews,
      icon: <VoteIcon />,
      iconColor: "text-white",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500",
    },
    {
      title: "Total Categories",
      value: uniqueCategories,
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
      <Tabs defaultValue="books">
        <TabsList className="bg-linear-to-r from-violet-500 to-indigo-500 w-fit">
          <TabsTrigger
            value="books"
            className="text-gray-100 data-active:bg-linear-to-r from-green-500 to-lime-500"
          >
            Top Voted Books
          </TabsTrigger>
          <TabsTrigger
            value="writers"
            className="text-gray-100 data-active:bg-linear-to-r from-yellow-500 to-orange-500"
          >
            Top Voted Writers
          </TabsTrigger>
        </TabsList>
        <FilterSearch
          search={{
            placeholder: "Search books",
            value: "",
            onChange: (value) => console.log(value),
          }}
        />
        <TabsContent value="books" className="mt-4 outline-none">
          <TopVotedBooksTable rows={result} />
        </TabsContent>
        <TabsContent value="writers" className="mt-4 outline-none">
          <TopVotedWriters rows={result} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default VotesLayout