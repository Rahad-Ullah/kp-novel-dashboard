"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LINE_COLOR = "#0066FF";
const GRID_STROKE = "#E5E7EB";
const AXIS_STROKE = "#6B7280";

function UserActivityTrend({ data }: { data: any }) {
  
  const chartData = data?.map((item: any) => ({
    month: item.month,
    value: item.count,
  }));

  return (
    <Card className="rounded-xl border border-slate-200/80 bg-white shadow-xs">
      <CardHeader className="px-6 pb-2 pt-6">
        <CardTitle className="text-base font-bold text-gray-900">
          User Activity Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <div className="h-[280px] w-full min-w-0">
          <ResponsiveContainer
            width="100%"
            height={280}
            minWidth={0}
            minHeight={280}
            initialDimension={{ width: 800, height: 280 }}
          >
            <LineChart
              data={chartData}
              margin={{ top: 12, right: 12, left: 4, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={GRID_STROKE}
                vertical
                horizontal
              />
              <XAxis
                dataKey="month"
                tickLine={{ stroke: AXIS_STROKE }}
                axisLine={{ stroke: AXIS_STROKE }}
                tick={{ fill: AXIS_STROKE, fontSize: 12 }}
                padding={{ left: 4, right: 4 }}
              />
              <YAxis
                domain={[0, 6000]}
                ticks={[0, 1500, 3000, 4500, 6000]}
                tickLine={{ stroke: AXIS_STROKE }}
                axisLine={{ stroke: AXIS_STROKE }}
                tick={{ fill: AXIS_STROKE, fontSize: 12 }}
                width={44}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#111827", fontWeight: 600 }}
                formatter={(value) =>
                  value != null
                    ? [Number(value).toLocaleString(), "Activity"]
                    : ["", ""]
                }
              />
              <Line
                type="linear"
                dataKey="value"
                stroke={LINE_COLOR}
                strokeWidth={2}
                dot={{
                  fill: LINE_COLOR,
                  strokeWidth: 0,
                  r: 5,
                }}
                activeDot={{ r: 6, fill: LINE_COLOR, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserActivityTrend;
