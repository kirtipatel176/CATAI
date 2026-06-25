"use client";

import React from "react";
import { 
  Radar, 
  RadarChart as RechartsRadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from "recharts";

const data = [
  { subject: "Arithmetic", A: 50, fullMark: 100 },
  { subject: "Algebra", A: 92, fullMark: 100 },
  { subject: "Geometry", A: 85, fullMark: 100 },
  { subject: "Numbers", A: 65, fullMark: 100 },
  { subject: "Modern Math", A: 70, fullMark: 100 },
];

export function RadarChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(0,0,0,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          />
          <Radar 
            name="Accuracy %" 
            dataKey="A" 
            stroke="#4F46E5" 
            fill="#4F46E5" 
            fillOpacity={0.4} 
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
