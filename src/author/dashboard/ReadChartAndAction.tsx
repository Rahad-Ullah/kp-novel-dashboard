"use client"
import Link from "next/link"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"

const quickActions = [
    {
        title: "Create New Book",
        description: "Start writing your next masterpiece",
        href: "/author/my-books",
    },
    {
        title: "Add New Chapter",
        description: "Continue your existing books",
        href: "/author/my-chapters",
    },
    {
        title: "View Analytics",
        description: "Track your performance",
        href: "/author/analytics",
    },
] as const

interface ReadChartAndActionProps {
    readBook: Array<{ month: string; views: number }>;
}

function ReadChartAndAction({ readBook }: ReadChartAndActionProps) {
    return (
        <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <div className="flex min-h-0 flex-col lg:h-full">
                <div className="shrink-0">
                    <SmallPageInfo
                        title="Monthly Reads"
                        description="Your book views over the year"
                    />
                </div>
                <Card className="mt-4 flex min-h-0 flex-1 flex-col border border-violet-200/80 bg-white shadow-sm ring-0 dark:border-violet-500/25 dark:bg-card">
                    <CardContent className="flex flex-1 flex-col px-0 pb-4 pt-6">
                        <div className="h-[250px] w-full px-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={readBook}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis 
                                        dataKey="month" 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dx={-10}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: '#f3f4f6' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex min-h-0 flex-col lg:h-full">
                <div className="shrink-0">
                    <SmallPageInfo
                        title="Quick Actions"
                        description="Get started quickly"
                    />
                </div>
                <Card className="mt-4 flex min-h-0 flex-1 flex-col border-0 bg-linear-to-br from-blue-800 via-blue-700 to-purple-600 text-white shadow-md ring-0">

                    <CardContent className="flex flex-col gap-3 pb-4 lg:flex-1 pt-6">
                        {quickActions.map((action) => (
                            <Link
                                key={action.title}
                                href={action.href}
                                className={cn(
                                    "rounded-xl bg-white/15 px-4 py-3 ring-1 ring-white/25 backdrop-blur-sm",
                                    "transition-colors hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                                )}
                            >
                                <div className="font-bold text-white">{action.title}</div>
                                <div className="mt-1 text-sm text-white/80">
                                    {action.description}
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ReadChartAndAction
