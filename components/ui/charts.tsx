import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from 'recharts';

interface ChartData {
  [key: string]: string | number | Date;
}

interface ChartProps {
  data: ChartData[];
  xField: string;
  yField: string;
  height?: number;
}

export function LineChart({ data, xField, yField, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xField}
          tickFormatter={(value) => {
            if (value instanceof Date) {
              return new Date(value).toLocaleDateString();
            }
            return value.toString();
          }}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => {
            if (value instanceof Date) {
              return new Date(value).toLocaleDateString();
            }
            return value.toString();
          }}
        />
        <Line type="monotone" dataKey={yField} stroke="#8884d8" />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function BarChart({ data, xField, yField, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xField}
          tickFormatter={(value) => {
            if (value instanceof Date) {
              return new Date(value).toLocaleDateString();
            }
            return value.toString();
          }}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => {
            if (value instanceof Date) {
              return new Date(value).toLocaleDateString();
            }
            return value.toString();
          }}
        />
        <Bar dataKey={yField} fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
} 