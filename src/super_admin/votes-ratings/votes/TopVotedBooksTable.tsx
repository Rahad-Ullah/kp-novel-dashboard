"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TopVotedBooksTable({ rows = [] }: { rows: any[] }) {
  if (!rows.length) {
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
              Book
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Author
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Category
            </TableHead>
            <TableHead className="text-base font-medium text-gray-700">
              Votes
            </TableHead>
            <TableHead className="pr-6 text-base font-medium text-gray-700">
              Views
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.rank}
              className="border-b border-gray-100 hover:bg-gray-50/40"
            >
              <TableCell className="pl-6 py-5 align-middle">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {row.rank}
                </div>
              </TableCell>
              <TableCell className="py-5 align-middle">
                <p className="font-semibold text-gray-900">{row.title}</p>
                <p className="mt-0.5 max-w-[280px] text-sm text-gray-500">
                  {row.description}
                </p>
              </TableCell>
              <TableCell className="py-5 text-base text-gray-600">
                {row.authorName}
              </TableCell>
              <TableCell className="py-5 text-base text-gray-600">
                <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                  {row.category}
                </span>
              </TableCell>
              <TableCell className="py-5 text-base tabular-nums text-gray-600">
                {(row.votes || 0).toLocaleString()}
              </TableCell>
              <TableCell className="pr-6 py-5 text-base tabular-nums text-gray-600">
                {(row.views || 0).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TopVotedBooksTable;
