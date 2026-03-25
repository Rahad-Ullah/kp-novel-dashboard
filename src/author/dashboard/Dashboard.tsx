import React from 'react'
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import { BookIcon, BookOpenIcon, EyeIcon, MessageCircleIcon } from 'lucide-react'
import Stats from '@/components/common/stats/Stats'
import ProgresAndAction from './ProgresAndAction'
import ChapterAndComment from './ChapterAndComment'

function Dashboard() {
    const stats = [
        {
            title: "Total Books",
            value: 100,
            icon: <BookIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
        },
        {
            title: "Total Chapters",
            value: 100,
            icon: <BookOpenIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-violet-500 to-pink-500! ",
        },
        {
            title: "Total Views",
            value: 100,
            icon: <EyeIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500! ",
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
            <ProgresAndAction />
            <ChapterAndComment />
        </div>
    )
}

export default Dashboard