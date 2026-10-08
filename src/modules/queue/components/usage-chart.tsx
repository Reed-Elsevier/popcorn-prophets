"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function UsageChart({ data }: { data: { month: string; sessions: number }[] }) {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={3} />
          <YAxis tick={{ fontSize: 10 }} width={40} />
          <Tooltip />
          <Line dataKey="sessions" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
