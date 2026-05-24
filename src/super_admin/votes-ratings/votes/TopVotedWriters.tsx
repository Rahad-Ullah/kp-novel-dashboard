"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function TopVotedWriters({ items = [] }: { items: any[] }) {
  if (!items.length) {
    return (
      <p className="rounded-xl border border-dashed border-gray-200 bg-white py-12 text-center text-sm text-slate-500">
        No data available.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-slate-50 hover:bg-slate-50">
            <TableHead className="pl-6 text-base font-medium text-gray-700">
              Rank
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Author
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Daily Votes
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Weekly Votes
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Monthly Votes
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: any, index: number) => (
            <TableRow
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50/40"
            >
              <TableCell className="pl-6 py-5 align-middle">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
              </TableCell>
              <TableCell className="py-5 align-middle">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 shrink-0">
                    <AvatarImage src={item.profile} alt={item.fullName} />
                    <AvatarFallback className="bg-slate-100 text-xs font-medium text-slate-600">
                      {(item.fullName || "A").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.fullName}
                    </p>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5 text-base text-gray-600">
                {item.dailyVotes}
              </TableCell>
              <TableCell className="py-5 text-base text-gray-600">
                <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                  {item.weeklyVotes}
                </span>
              </TableCell>
              <TableCell className="py-5 text-base tabular-nums text-gray-600">
                {(item.monthlyVotes || 0).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TopVotedWriters;
