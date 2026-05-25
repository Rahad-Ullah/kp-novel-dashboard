import VotesRatingsLayout from '@/src/super_admin/votes-ratings/VotesRatingsLayout'
import { nextFetch } from "@/utils/nextFetch";

async function VotesRatingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { searchTerm, type, mainType = "vote" } = await searchParams;

  const query = new URLSearchParams();
  if (searchTerm) query.set("searchTerm", searchTerm as string);
  if (type) query.set("type", type as string);
  if (mainType) query.set("mainType", mainType as string);

  const res = await nextFetch(`/book-vote/vote?${query.toString()}`);

  return <VotesRatingsLayout data={res?.data} />;
}

export default VotesRatingsPage