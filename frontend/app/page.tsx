'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Zap, TrendingUp } from 'lucide-react'
import PredictionChart from '@/components/prediction-chart'
import ScenariosChart from '@/components/scenarios-chart'
import AnalysisSummary from '@/components/analysis-summary'
import InputForm from '@/components/input-form'

export default function Home() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    Temperature: 72,
    Humidity: 45,
    SquareFootage: 5000,
    Occupancy: 50,
    RenewableEnergy: 10,
    HVACUsage: 'medium',
    LightingUsage: 'medium',
    DayOfWeek: 'Monday',
    Holiday: 'No',
  })

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePredict = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail?.error || 'Prediction failed')
      }

      const data = await response.json()
      setPrediction(data.prediction[0])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setPrediction(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Energy Predictor</h1>
          </div>
          <p className="text-muted-foreground">Predict and analyze building energy consumption using machine learning</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Input Form Card */}
          <Card className="lg:col-span-1 border-primary/10">
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
              <CardDescription>Configure building conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <InputForm 
                formData={formData}
                onInputChange={handleInputChange}
                onPredict={handlePredict}
                loading={loading}
              />
            </CardContent>
          </Card>

          {/* Prediction Result Card */}
          <Card className="lg:col-span-2 border-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Prediction Result
              </CardTitle>
              <CardDescription>Estimated energy consumption</CardDescription>
            </CardHeader>
            <CardContent>
              {prediction !== null ? (
                <div className="space-y-6">
                  <div className="flex items-end gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Predicted Energy Usage</p>
                      <p className="text-5xl font-bold text-primary">
                        {prediction.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">kWh</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-24 rounded-lg bg-primary/10 flex items-end justify-center p-4">
                        <div 
                          className="bg-gradient-to-t from-primary to-accent rounded-md w-16"
                          style={{height: `${Math.min((prediction / 500) * 100, 100)}%`}}
                        />
                      </div>
                    </div>
                  </div>
                  <PredictionChart prediction={prediction} />
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Enter parameters and click predict to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        {prediction !== null && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ScenariosChart baselinePrediction={prediction} formData={formData} />
            <AnalysisSummary prediction={prediction} formData={formData} />
          </div>
        )}
      </div>
    </main>
  )
}
