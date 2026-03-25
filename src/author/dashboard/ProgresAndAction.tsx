import Link from "next/link"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"

const writingGoals = [
    { label: "Chapters Published", value: "8/10", progress: 80 },
    { label: "Words Written", value: "54,000", progress: 40 },
    { label: "Reader Engagement", value: "68%", progress: 68 },
] as const

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

function ProgresAndAction() {
    return (
        <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <div className="flex min-h-0 flex-col lg:h-full">
                <div className="shrink-0">
                    <SmallPageInfo
                        title="Writing Progress"
                        description="Your monthly writing goals"
                    />
                </div>
                <Card className="mt-4 flex min-h-0 flex-1 flex-col border border-violet-200/80 bg-white shadow-sm ring-0 dark:border-violet-500/25 dark:bg-card">

                    <CardContent className="flex flex-1 flex-col px-0 pb-2 pt-0">
                        <div className="divide-y divide-border px-4 ">
                            {writingGoals.map((item) => (
                                <div key={item.label} className="space-y-2 py-4 first:pt-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-semibold text-sidebar-primary">
                                            {item.label}
                                        </span>
                                        <span className="text-sm text-sidebar-primary">{item.value}</span>
                                    </div>
                                    <Progress
                                        value={item.progress}
                                        className="h-2 bg-muted **:data-[slot=progress-indicator]:bg-blue-600"
                                    />
                                </div>
                            ))}
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

                    <CardContent className="flex flex-col gap-3 pb-4 lg:flex-1">
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

export default ProgresAndAction
