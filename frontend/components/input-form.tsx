'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

interface InputFormProps {
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
  onInputChange: (field: string, value: string | number) => void
  onPredict: () => void
  loading: boolean
}

export default function InputForm({
  formData,
  onInputChange,
  onPredict,
  loading,
}: InputFormProps) {
  const numericFields = [
    { key: 'Temperature', label: 'Temperature (°F)', min: 50, max: 95, step: 1 },
    { key: 'Humidity', label: 'Humidity (%)', min: 20, max: 95, step: 1 },
    { key: 'SquareFootage', label: 'Square Footage', min: 1000, max: 50000, step: 100 },
    { key: 'Occupancy', label: 'Occupancy (people)', min: 0, max: 500, step: 5 },
    { key: 'RenewableEnergy', label: 'Renewable Energy (%)', min: 0, max: 100, step: 1 },
  ]

  const selectFields = [
    {
      key: 'HVACUsage',
      label: 'HVAC Usage',
      options: ['low', 'medium', 'high'],
    },
    {
      key: 'LightingUsage',
      label: 'Lighting Usage',
      options: ['low', 'medium', 'high'],
    },
    {
      key: 'DayOfWeek',
      label: 'Day of Week',
      options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    {
      key: 'Holiday',
      label: 'Holiday',
      options: ['Yes', 'No'],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {numericFields.map(field => (
          <div key={field.key}>
            <Label htmlFor={field.key} className="text-xs font-medium text-muted-foreground mb-1">
              {field.label}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id={field.key}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step}
                value={formData[field.key as keyof typeof formData]}
                onChange={e => onInputChange(field.key, parseFloat(e.target.value))}
                className="h-9 text-sm"
              />
              <span className="text-xs text-muted-foreground min-w-fit">
                {formData[field.key as keyof typeof formData]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        {selectFields.map(field => (
          <div key={field.key}>
            <Label htmlFor={field.key} className="text-xs font-medium text-muted-foreground mb-1">
              {field.label}
            </Label>
            <Select
              value={formData[field.key as keyof typeof formData] as string}
              onValueChange={value => onInputChange(field.key, value)}
            >
              <SelectTrigger id={field.key} className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {field.options.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <Button
        onClick={onPredict}
        disabled={loading}
        className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        <Zap className="w-4 h-4 mr-2" />
        {loading ? 'Predicting...' : 'Predict Energy Usage'}
      </Button>
    </div>
  )
}
