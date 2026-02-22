'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TrendingDown, AlertTriangle, Lightbulb, Wind } from 'lucide-react'

interface AnalysisSummaryProps {
  prediction: number
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

export default function AnalysisSummary({ prediction, formData }: AnalysisSummaryProps) {
  const perSquareFoot = prediction / formData.SquareFootage
  const perPerson = formData.Occupancy > 0 ? prediction / formData.Occupancy : 0
  const renewableContribution = prediction * (formData.RenewableEnergy / 100)
  const gridDependency = prediction - renewableContribution

  let efficiencyStatus = 'Moderate'
  let efficiencyColor = 'text-yellow-600'
  if (perSquareFoot < 3) {
    efficiencyStatus = 'Excellent'
    efficiencyColor = 'text-green-600'
  } else if (perSquareFoot > 5) {
    efficiencyStatus = 'Poor'
    efficiencyColor = 'text-red-600'
  }

  const recommendations = []
  
  if (formData.Temperature > 78) {
    recommendations.push('Consider lowering thermostat by 2-3°F to reduce cooling costs')
  }
  if (formData.HVACUsage === 'high') {
    recommendations.push('High HVAC usage detected - review insulation and maintenance')
  }
  if (formData.LightingUsage === 'high') {
    recommendations.push('Switch to LED lighting to reduce energy consumption by 40-50%')
  }
  if (formData.RenewableEnergy < 20) {
    recommendations.push('Consider installing solar panels to reduce grid dependency')
  }
  if (formData.Occupancy > 200) {
    recommendations.push('High occupancy - ensure proper ventilation and cooling capacity')
  }

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle>Energy Analysis & Insights</CardTitle>
        <CardDescription>Key metrics and recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Efficiency Status */}
        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Efficiency Rating</p>
            <p className={`text-lg font-semibold ${efficiencyColor}`}>{efficiencyStatus}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Per Sq Ft</p>
            <p className="text-2xl font-bold">{perSquareFoot.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">kWh/sqft</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Per Person</p>
            <p className="text-xl font-bold text-primary">
              {perPerson.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">kWh/person</p>
          </div>
          <div className="p-3 border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Renewable</p>
            <p className="text-xl font-bold text-accent">
              {renewableContribution.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">kWh</p>
          </div>
          <div className="p-3 border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Grid Dependent</p>
            <p className="text-xl font-bold text-red-600">
              {gridDependency.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">kWh</p>
          </div>
          <div className="p-3 border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Est. Cost</p>
            <p className="text-xl font-bold text-foreground">
              ${(prediction * 0.14).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">@$0.14/kWh</p>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="space-y-2 border-t border-border pt-4">
            <p className="text-sm font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              Recommendations
            </p>
            <ul className="space-y-2">
              {recommendations.map((rec, i) => (
                <li key={i} className="text-xs text-muted-foreground p-2 bg-secondary/20 rounded border border-secondary/40 flex gap-2">
                  <span className="text-accent flex-shrink-0">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
