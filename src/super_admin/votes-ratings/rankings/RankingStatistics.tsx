import { Card, CardContent } from "@/components/ui/card";

function RankingStatistics({ data }: { data: any }) {
  const topBooks = [
    {
      period: "Daily",
      title: data?.daily?.title,
      votes: data?.daily?.votes,
    },
    {
      period: "Weekly",
      title: data?.weekly?.title,
      votes: data?.weekly?.votes,
    },
    {
      period: "Monthly",
      title: data?.monthly?.title,
      votes: data?.monthly?.votes,
    },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {topBooks.map((item) => (
          <Card
            key={item.period}
            className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0"
          >
            <CardContent className="space-y-2 p-5">
              <p className="text-sm text-gray-500">Top Book ({item.period})</p>
              <p className="text-base font-bold text-gray-900">{item.title}</p>
              <p className="text-lg font-semibold text-amber-500">
                {item.votes} votes
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RankingStatistics;
