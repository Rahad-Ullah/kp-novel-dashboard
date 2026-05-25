
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import {
  BookIcon,
  BookOpenIcon,
  EyeIcon,
  MessageCircleIcon,
  User,
  Users,
} from "lucide-react";
import Stats from '@/components/common/stats/Stats'
import UserActivityTrend from './UserActivityTrend'
import BooksByCategory from './BooksByCategory'
import TopPerformingBooks from './TopPerformingBooks'
import RecentComments from './RecentComments'

function Dashboard({ data }: { data: any }) {
  const stats = [
    {
      title: "Total Books",
      value: data?.totalBooks,
      icon: <BookIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
    },
    {
      title: "Total Chapters",
      value: data?.totalChapters,
      icon: <BookOpenIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-violet-500 to-pink-500! ",
    },
    {
      title: "Total Publish Books",
      value: data?.totalPublishBooks,
      icon: <EyeIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500! ",
    },
    {
      title: "Total Active Users",
      value: data?.totalActiveUsers,
      icon: <Users />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-green-500 to-lime-500! ",
    },
  ];
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Dashboard Overview"
        description="Welcome back! Here's your overview"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Stats
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBackgroundColor={stat.iconBackgroundColor}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <UserActivityTrend data={data?.usersByMonth} />
        <BooksByCategory data={data?.categorybyBookCount} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <TopPerformingBooks data={data?.topBooks} />
        <RecentComments data={data?.recentComments} />
      </div>
    </div>
  );
}

export default Dashboard