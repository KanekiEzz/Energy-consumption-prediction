'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface PredictionChartProps {
  prediction: number
}

export default function PredictionChart({ prediction }: PredictionChartProps) {
  // Simulate hourly usage pattern based on prediction
  const data = Array.from({ length: 24 }, (_, i) => {
    // Peak hours: 9am-5pm (9-17)
    const isPeakHour = i >= 9 && i <= 17
    const isMorningPeak = i >= 6 && i <= 9
    const isEveningPeak = i >= 17 && i <= 20
    
    let baseValue = prediction * 0.3 // Minimum baseline
    
    if (isEveningPeak) {
      baseValue = prediction * 0.8 // Evening peak
    } else if (isPeakHour) {
      baseValue = prediction * 0.9 // Peak hours
    } else if (isMorningPeak) {
      baseValue = prediction * 0.6 // Morning ramp up
    }
    
    // Add some variation
    const variation = baseValue * (0.8 + Math.random() * 0.4)
    
    return {
      time: `${i}:00`,
      energy: Math.round(variation * 10) / 10,
    }
  })

  return (
    <div className="w-full h-64 -mx-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            stroke="var(--color-muted-foreground)"
            interval={2}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="var(--color-muted-foreground)"
            label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: `1px solid var(--color-border)`,
              borderRadius: 'var(--radius)',
              color: 'var(--color-foreground)',
            }}
            formatter={(value: any) => `${value.toFixed(2)} kWh`}
            labelStyle={{ color: 'var(--color-foreground)' }}
          />
          <Area
            type="monotone"
            dataKey="energy"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorEnergy)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
