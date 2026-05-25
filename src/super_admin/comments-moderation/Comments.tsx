"use client";
import PageLimit from "@/components/common/pagelimit/PageLimit";
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Comments({ data, meta }: { data: any; meta: any }) {

  const deleteRow = async (id: string) => {
    // try {
    //   const res = await nextFetch(`/comments/${id}`, {
    //     method: "DELETE",
    //     tags: ["comments-moderation"],
    //   });
    //   if (res?.success) {
    //     toast.success("Comment deleted successfully");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Comments"
        description="Read and respond to reader feedback"
      />

      <div className="rounded-xl border border-gray-200 bg-white">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="w-[12%] pl-6 text-base font-medium text-gray-800">
                User
              </TableHead>
              <TableHead className="w-[18%] text-base font-medium text-gray-800">
                Book
              </TableHead>
              <TableHead className="w-[36%] text-base font-medium text-gray-800">
                Comment
              </TableHead>
              <TableHead className="w-[12%] text-base font-medium text-gray-800">
                Posted
              </TableHead>
              <TableHead className="w-[12%] text-base font-medium text-gray-800">
                Likes
              </TableHead>
              <TableHead className="w-[12%] text-base font-medium text-gray-800">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row: any) => (
              <TableRow
                key={row._id}
                className="border-b border-gray-100 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 py-4 align-top text-sm text-gray-500">
                  {row.userId?.fullName}
                </TableCell>
                <TableCell className="py-4 align-top text-sm font-semibold text-gray-900">
                  {row.bookId?.title}
                </TableCell>
                <TableCell className="py-4 align-top text-sm text-gray-500">
                  <p className="max-w-full wrap-break-word leading-relaxed line-clamp-3 md:line-clamp-none">
                    {row.message}
                  </p>
                </TableCell>
                <TableCell className="py-4 align-top text-sm text-gray-500 whitespace-nowrap">
                  {new Date(row.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="py-4 align-top text-sm text-gray-500 whitespace-nowrap">
                  {row.likes?.length}
                </TableCell>
                <TableCell className="py-4 align-top">
                  <span
                    className={
                      row.isDeleted === false
                        ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                        : "inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                    }
                  >
                    {row.isDeleted ? "Deleted" : "Active"}
                  </span>
                </TableCell>
                {/* <TableCell className="pr-6 py-4 align-top">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="flex size-9 items-center justify-center rounded-lg border border-red-300 bg-transparent text-red-500 transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete comment"
                      onClick={() => deleteRow(row.id)}
                    >
                      <Trash2 className="size-4" strokeWidth={1.75} />
                    </button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow className="border-0 hover:bg-transparent">
              <TableCell colSpan={6} className="px-6 py-4">
                <PageLimit
                  pagination={{ page: meta.page, pageSize: meta.limit, totalCount: meta.total }}
                  onPaginationChange={() => {}}
                  itemLabel="comments"
                  mode="summary"
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default Comments;
