import ContentModerationLayout from '@/src/admin/content-moderation/ContentModerationLayout'

function ContentsLayout({ data, meta }: { data: any, meta: any }) {
    return (
        <div>
            <ContentModerationLayout data={data} meta={meta} />
        </div>
    );
}

export default ContentsLayout;