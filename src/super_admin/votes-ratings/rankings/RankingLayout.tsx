"use client";

import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RankingStatistics from "./RankingStatistics";
import PeriodWiseData from "./PeriodWiseData";

function RankingLayout({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className="space-y-6">
      <RankingStatistics data={data} />
      <Tabs
        className="w-full gap-4"
        defaultValue={searchParams.get("type") || "daily"}
        onValueChange={(value: string) => updateSearchParams({ type: value })}
      >
        <TabsList className="w-fit bg-linear-to-r from-violet-500 to-indigo-500">
          <TabsTrigger value="daily" className="text-gray-100">
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="text-gray-100">
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="text-gray-100">
            Monthly
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="mt-4 outline-none">
          <PeriodWiseData data={data?.result} />
        </TabsContent>
        <TabsContent value="weekly" className="mt-4 outline-none">
          <PeriodWiseData data={data?.result} />
        </TabsContent>
        <TabsContent value="monthly" className="mt-4 outline-none">
          <PeriodWiseData data={data?.result} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default RankingLayout;
