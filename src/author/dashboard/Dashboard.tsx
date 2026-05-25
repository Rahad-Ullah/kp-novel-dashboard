import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import { BookIcon, BookOpenIcon, StarIcon, CheckCircleIcon } from 'lucide-react'
import Stats from '@/components/common/stats/Stats'
import ReadChartAndAction from './ReadChartAndAction'
import ChapterAndComment from './ChapterAndComment'

export interface DashboardData {
    totalBooks?: number;
    totalChapters?: number;
    totalPublishBooks?: number;
    totalVotes?: number;
    readBook?: Array<{ month: string; views: number }>;
    recentChapters?: Array<{ _id: string; title: string; chapterNumber: number; status: string }>;
    recentComments?: Array<{ _id: string; userId: { fullName: string; profile: string }; message: string; createdAt?: string }>;
}

function Dashboard({ data }: { data: DashboardData }) {
    const stats = [
        {
            title: "Total Books",
            value: data?.totalBooks || 0,
            icon: <BookIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
        },
        {
            title: "Total Chapters",
            value: data?.totalChapters || 0,
            icon: <BookOpenIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-violet-500 to-pink-500! ",
        },
        {
            title: "Published Books",
            value: data?.totalPublishBooks || 0,
            icon: <CheckCircleIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500! ",
        },
        {
            title: "Total Votes",
            value: data?.totalVotes || 0,
            icon: <StarIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-green-500 to-lime-500! ",
        },
    ]
    return (
        <div>
            <SmallPageInfo
                title="Dashboard Overview"
                description="Welcome back! Here's your overview"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Stats key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                        iconBackgroundColor={stat.iconBackgroundColor}
                    />
                ))}
            </div>
            <ReadChartAndAction readBook={data?.readBook || []} />
            <ChapterAndComment 
                recentChapters={data?.recentChapters || []}
                recentComments={data?.recentComments || []}
            />
        </div>
    )
}

export default Dashboard