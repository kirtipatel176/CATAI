"use client";

import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Mock 1", percentile: 80 },
  { name: "Mock 2", percentile: 82 },
  { name: "Mock 3", percentile: 81 },
  { name: "Mock 4", percentile: 85 },
  { name: "Mock 5", percentile: 84 },
  { name: "Mock 6", percentile: 88 },
  { name: "Mock 7", percentile: 87 },
  { name: "Mock 8", percentile: 89 },
  { name: "Mock 9", percentile: 90 },
  { name: "Mock 10", percentile: 91.4 },
];

export function ProgressChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPercentile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            domain={['dataMin - 5', 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="percentile" 
            stroke="#2563EB" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPercentile)" 
            activeDot={{ r: 6, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
