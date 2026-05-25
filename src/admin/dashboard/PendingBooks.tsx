import PendingListCard from "./PendingListCard";

function PendingBooks({ data }: { data: any }) {
  const pendingBooks = data?.map((book: any) => ({
    title: book.title,
    description: book.description,
    type: book.type,
    image: book.coverImage,
    id: book._id,
  }));
  return (
    <PendingListCard
      heading="Pending Books"
      count={data?.length}
      items={pendingBooks}
    />
  );
}

export default PendingBooks;
