"use client"

import * as React from "react"
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const chartData = [
    { name: "Last Warrior", views: 140, votes: 18 },
    { name: "Mystic Academy", views: 160, votes: 26 },
    { name: "The Immortal's Path", views: 180, votes: 30 },
]

function TooltipContent({
    active,
    payload,
    label,
}: {
    active?: boolean
    payload?: { name?: string; value?: number; fill?: string }[]
    label?: string
}) {
    if (!active || !payload?.length) return null

    const views = payload.find((p) => p.name === "Views")?.value ?? 0
    const votes = payload.find((p) => p.name === "Votes")?.value ?? 0

    return (
        <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-sm">
            <div className="text-sm font-semibold text-foreground">{label}</div>
            <div className="mt-1 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span
                        className="inline-block size-2.5 rounded-sm"
                        style={{ backgroundColor: payload[0]?.fill }}
                    />
                    <span className="text-xs text-muted-foreground">Views</span>
                </div>
                <div className="text-xs font-medium text-foreground">
                    {views.toLocaleString()}
                </div>
            </div>
            <div className="mt-1 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span
                        className="inline-block size-2.5 rounded-sm"
                        style={{
                            backgroundColor:
                                payload.find((p) => p.name === "Votes")?.fill ??
                                payload[1]?.fill ??
                                "#A5B9A7",
                        }}
                    />
                    <span className="text-xs text-muted-foreground">Votes</span>
                </div>
                <div className="text-xs font-medium text-foreground">
                    {votes.toLocaleString()}
                </div>
            </div>
        </div>
    )
}

function BookPerforming() {
    return (
        <Card className="border bg-white shadow-xs rounded-xl">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-500">
                    Book Performing
                </CardTitle>
                <div className="mt-1 text-xs text-gray-400">
                    Views and votes by book
                </div>
            </CardHeader>

            <CardContent className="px-4 pb-4 pt-0">
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#6B7280", fontSize: 12 }}
                            />
                            <YAxis
                                ticks={[0, 60, 120, 180, 240]}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#6B7280", fontSize: 12 }}
                            />
                            <Tooltip cursor={false} content={<TooltipContent />} />
                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="square"
                                wrapperStyle={{ paddingTop: 8 }}
                            />
                            <Bar
                                dataKey="views"
                                name="Views"
                                fill="#4C59A6"
                                barSize={32}
                            />
                            <Bar
                                dataKey="votes"
                                name="Votes"
                                fill="#9DB49A"
                                barSize={32}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default BookPerforming