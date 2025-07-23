import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function MultiplierChart({ data }) {
  const chartData = data.map((m, idx) => ({ idx, multiplier: m }));
  return (
    <LineChart width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="idx" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="multiplier" />
    </LineChart>
  );
}
