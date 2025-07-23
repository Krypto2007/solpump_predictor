import { LineChart, Line, XAxis, YAxis } from 'recharts';
export default function Chart({ data }) {
  return <LineChart width={500} height={200} data={data}>
    <XAxis dataKey="index" />
    <YAxis domain={[0, 'dataMax']} />
    <Line type="monotone" dataKey="multiplier" stroke="#82ca9d" />
  </LineChart>;
}