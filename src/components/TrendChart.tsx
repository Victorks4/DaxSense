import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

interface TrendChartProps {
  pumpId: string;
}

export const TrendChart = ({ pumpId }: TrendChartProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Generate sample historical data for the last 24 hours
    const generateHistoricalData = () => {
      const points = 24; // 24 hours of data
      const newData = [];
      
      for (let i = points - 1; i >= 0; i--) {
        const time = new Date();
        time.setHours(time.getHours() - i);
        
        // Generate realistic trend data
        const basePump = parseInt(pumpId.slice(-3)) || 1;
        const timeOffset = i * 0.1;
        
        newData.push({
          time: time.getHours() + ":00",
          temperature: 45 + Math.sin(timeOffset + basePump) * 8 + Math.random() * 4,
          vibration: 2.5 + Math.sin(timeOffset * 2 + basePump) * 0.8 + Math.random() * 0.4,
          noise: 65 + Math.sin(timeOffset * 1.5 + basePump) * 5 + Math.random() * 3,
          pressure: 5 + Math.sin(timeOffset * 0.8 + basePump) * 1.2 + Math.random() * 0.6,
        });
      }
      
      return newData;
    };

    setData(generateHistoricalData());
  }, [pumpId]);

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            name="Temperatura (°C)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};