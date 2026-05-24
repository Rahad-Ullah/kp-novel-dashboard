import Loading from "@/components/common/loading/Loading";
import ContentModerationLayout from "@/src/admin/content-moderation/ContentModerationLayout";
import { Suspense } from "react";

function ContentModerationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ContentModerationLayout data={{}} meta={{}} />
    </Suspense>
  );
}

export default ContentModerationPage;
