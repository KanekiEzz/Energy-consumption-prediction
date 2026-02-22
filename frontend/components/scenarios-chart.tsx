'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ScenariosChartProps {
  baselinePrediction: number
  formData: {
    Temperature: number
    Humidity: number
    SquareFootage: number
    Occupancy: number
    RenewableEnergy: number
    HVACUsage: string
    LightingUsage: string
    DayOfWeek: string
    Holiday: string
  }
}

export default function ScenariosChart({ baselinePrediction, formData }: ScenariosChartProps) {
  // Create scenario data - simulate different conditions
  const scenarios = [
    {
      name: 'Current',
      consumption: baselinePrediction,
      savings: 0,
    },
    {
      name: 'High Efficiency',
      consumption: baselinePrediction * 0.75, // 25% reduction
      savings: baselinePrediction * 0.25,
    },
    {
      name: 'Solar 50%',
      consumption: baselinePrediction * 0.5, // With 50% renewable
      savings: baselinePrediction * 0.5,
    },
    {
      name: 'Optimized HVAC',
      consumption: baselinePrediction * 0.85, // 15% reduction
      savings: baselinePrediction * 0.15,
    },
    {
      name: 'Full Optimization',
      consumption: baselinePrediction * 0.55, // 45% reduction
      savings: baselinePrediction * 0.45,
    },
  ]

  return (
    <Card className="border-accent/10">
      <CardHeader>
        <CardTitle>What-If Scenarios</CardTitle>
        <CardDescription>Explore potential energy savings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64 -mx-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scenarios} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke="var(--color-muted-foreground)"
                angle={-15}
                textAnchor="end"
                height={60}
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
                formatter={(value: any) => `${value.toFixed(1)} kWh`}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
              <Legend
                wrapperStyle={{ color: 'var(--color-foreground)', fontSize: 12 }}
              />
              <Bar
                dataKey="consumption"
                fill="var(--color-primary)"
                name="Energy Consumption"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="savings"
                fill="var(--color-accent)"
                name="Potential Savings"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
