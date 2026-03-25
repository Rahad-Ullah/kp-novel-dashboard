import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import Stats from '@/components/common/stats/Stats'
import { BookIcon, EyeIcon, MessageCircleIcon } from 'lucide-react'
import TopChapters from './TopChapters'
import BookPerforming from './BookPerforming'
import ReaderDemogrtaph from './ReaderDemogrtaph'

function Analytics() {
    const stats = [
        {
            title: "Total Views",
            value: 100,
            icon: <EyeIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500! ",
        },
        {
            title: "Total Chapters",
            value: 100,
            icon: <BookIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-violet-500 to-pink-500! ",
        },
        {
            title: "Total Comments",
            value: 100,
            icon: <MessageCircleIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-green-500 to-lime-500! ",
        },
    ]
    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Analytics"
                description="Track your performance and reader engagement"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 2xl:w-1/2">
                {stats.map((stat) => (
                    <Stats key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} iconColor={stat.iconColor} iconBackgroundColor={stat.iconBackgroundColor} />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <BookPerforming />
                <ReaderDemogrtaph />
            </div>
            <TopChapters />
        </div>
    )
}

export default Analytics