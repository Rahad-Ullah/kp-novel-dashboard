"use client";
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import VotesLayout from './votes/VotesLayout'
import RankingLayout from './rankings/RankingLayout'
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

function VotesRatingsLayout({ data }: { data: any }) {
  const updateSearchParams = useUpdateSearchParams();
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Votes and Ratings"
        description="Track and manage voting and ranking activity across the platform"
      />
      <Tabs
        defaultValue="vote"
        onValueChange={(value: string) =>
          updateSearchParams({ mainType: value })
        }
      >
        <TabsList className="bg-linear-to-r from-violet-500 to-indigo-500 w-fit">
          <TabsTrigger value="vote">Votes</TabsTrigger>
          <TabsTrigger value="rank">Ratings</TabsTrigger>
        </TabsList>
        <TabsContent value="vote" className="mt-4 outline-none">
          <VotesLayout data={data} />
        </TabsContent>
        <TabsContent value="rank" className="mt-4 outline-none">
          <RankingLayout data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default VotesRatingsLayout