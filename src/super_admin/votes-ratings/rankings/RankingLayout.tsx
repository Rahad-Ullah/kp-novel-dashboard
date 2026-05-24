"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import PeriodWiseData from "./PeriodWiseData";
import RankingStatistics from "./RankingStatistics";

function RankingLayout({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <RankingStatistics />
      <Tabs defaultValue="daily" className="w-full gap-4">
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
          <PeriodWiseData data={data} />
        </TabsContent>
        <TabsContent value="weekly" className="mt-4 outline-none">
          <PeriodWiseData data={data} />
        </TabsContent>
        <TabsContent value="monthly" className="mt-4 outline-none">
          <PeriodWiseData data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default RankingLayout;
