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
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { age: "13-17", readers: 2200 },
  { age: "18-24", readers: 1900 },
  { age: "25-34", readers: 1550 },
  { age: "35-44", readers: 1100 },
  { age: "45+", readers: 650 },
] as const

function TooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value?: number }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  const value = payload[0]?.value ?? 0

  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 text-foreground shadow-sm">
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-1 text-xs text-muted-foreground">
        {value.toLocaleString()} readers
      </div>
    </div>
  )
}

export default function ReaderDemogrtaph() {
  return (
    <Card className="border bg-white shadow-xs rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-500">
          Reader Demographics
        </CardTitle>
        <div className="mt-1 text-xs text-gray-400">
          Readers by age group
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                dataKey="age"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip cursor={false} content={<TooltipContent />} />
              <Bar
                dataKey="readers"
                fill="#4C59A6"
                barSize={24}
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}