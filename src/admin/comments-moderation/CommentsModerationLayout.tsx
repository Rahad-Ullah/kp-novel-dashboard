"use client";
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import FilterSearch from '@/components/common/filter/FIlterSearch'
import CommentsTable from './CommentsTable'

function CommentsModerationLayout() {
    const search = {
        placeholder: "Search",
        value: "",
        onChange: (value: string) => {
            console.log(value);
        },
    };
    const selects = [
        {
            placeholder: "Select",
            options: ["Option 1", "Option 2", "Option 3"],
            value: "",
            onValueChange: (value: string) => {
                console.log(value);
            },
        },
    ];
    return (
        <div className="space-y-4">
            <SmallPageInfo title="Comments Moderation" description="Manage your comments moderation" />
            <FilterSearch search={search} selects={selects} />

            <CommentsTable />
        </div>
    )
}

export default CommentsModerationLayout