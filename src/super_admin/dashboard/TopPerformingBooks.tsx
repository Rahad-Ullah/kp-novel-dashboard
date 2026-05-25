import { StarIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function TopPerformingBooks({ data }: { data: any }) {
  const rows = data?.map((item: any) => ({
    title: item.title,
    author: item.userId.fullName,
    viewsLabel: item.readCount,
    votes: item.voteCount,
  }));
  return (
    <Card className="rounded-xl border border-indigo-100 bg-white shadow-xs">
      <CardHeader className="px-6 pb-4 pt-6">
        <CardTitle className="text-base font-bold text-gray-900">
          Top Performing Books
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-2 pt-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Author
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Views
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Votes
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i: number) => (
              <tr
                key={`${row.title}-${i}`}
                className="border-b border-gray-100 last:border-b-0"
              >
                <td className="px-6 py-4 text-left text-gray-500">
                  {row.title}
                </td>
                <td className="px-6 py-4 text-left text-gray-500">
                  {row.author}
                </td>
                <td className="px-6 py-4 text-right tabular-nums text-gray-500">
                  {row.viewsLabel}
                </td>
                <td className="px-6 py-4 text-right text-gray-500">
                  <span className="inline-flex items-center justify-end gap-1.5 tabular-nums">
                    <StarIcon
                      className="size-4 shrink-0 fill-yellow-400 text-yellow-400"
                      aria-hidden
                    />
                    {row.votes.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default TopPerformingBooks;
