import PendingListCard from "./PendingListCard";

function PendingChapters({ data }: { data: any }) {
  const pendingChapters = data?.map((chapter: any) => ({
    title: chapter.title,
    description: chapter.description,
    type: chapter.type,
  }));

  return (
    <div>
      <PendingListCard
        heading="Pending Chapters"
        count={data?.length}
        items={pendingChapters}
      />
    </div>
  );
}

export default PendingChapters;
