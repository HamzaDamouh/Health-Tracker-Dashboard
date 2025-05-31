"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Scale, Camera, Droplets, Activity, Plus, Minus, Calendar } from "lucide-react"
import { useMutation } from "@/hooks/use-api"
import { bodyApi, type BodyMetricsRequest, type BodyMeasurementsRequest } from "@/lib/api"

export function BodyMetrics() {
  const [todayWeight, setTodayWeight] = useState("")
  const [waterIntake, setWaterIntake] = useState(2.1)
  const [steps, setSteps] = useState(8432)
  const [measurements, setMeasurements] = useState({
    chest: "",
    neck: "",
    arms: "",
    waist: "",
    thighs: "",
  })

  const {
    mutate: logDailyMetrics,
    loading: dailyLoading,
    error: dailyError,
  } = useMutation<BodyMetricsRequest, any>(bodyApi.logDaily)
  const {
    mutate: logMeasurements,
    loading: measurementsLoading,
    error: measurementsError,
  } = useMutation<BodyMeasurementsRequest, any>(bodyApi.logMeasurements)

  const waterGoal = 3.0
  const stepGoal = 10000
  const waterProgress = Math.min((waterIntake / waterGoal) * 100, 100)
  const stepProgress = Math.min((steps / stepGoal) * 100, 100)

  const addWater = (amount: number) => {
    setWaterIntake((prev) => Math.max(0, Math.min(prev + amount, 5)))
  }

  const updateMeasurement = (key: string, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const isWeeklyMeasurementDay = () => {
    // Always show weekly measurements for demo purposes
    return true
    // Uncomment below to only show on Sundays
    // const today = new Date().getDay()
    // return today === 0 // Sunday
  }

  const handleSaveDailyMetrics = async () => {
    const dailyData: BodyMetricsRequest = {
      weight: todayWeight ? Number.parseFloat(todayWeight) : undefined,
      waterIntake,
      steps,
    }

    const result = await logDailyMetrics(dailyData)
    if (result) {
      console.log("Daily metrics saved successfully:", result)
    }
  }

  const handleSaveMeasurements = async () => {
    const measurementsData: BodyMeasurementsRequest = {
      chest: Number.parseFloat(measurements.chest),
      neck: Number.parseFloat(measurements.neck),
      arms: Number.parseFloat(measurements.arms),
      waist: Number.parseFloat(measurements.waist),
      thighs: Number.parseFloat(measurements.thighs),
    }

    const result = await logMeasurements(measurementsData)
    if (result) {
      console.log("Measurements saved successfully:", result)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Activity className="h-8 w-8 text-orange-400" />
          Body & Metrics
        </h1>
        <p className="text-slate-400">Track your physical progress and daily metrics</p>
      </div>

      {(dailyError || measurementsError) && (
        <Card className="bg-red-900/20 border-red-500/30">
          <CardContent className="p-4">
            <p className="text-red-300">Error: {dailyError || measurementsError}</p>
          </CardContent>
        </Card>
      )}

      {/* Daily Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weight */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Scale className="h-5 w-5 text-orange-400" />
              Weight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-slate-300">
                Today's Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="74.5"
                value={todayWeight}
                onChange={(e) => setTodayWeight(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white text-lg"
              />
            </div>

            {todayWeight && (
              <div className="text-center p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg border border-orange-500/30">
                <p className="text-sm text-slate-300 mb-1">Current Weight</p>
                <p className="text-3xl font-bold text-orange-300">{todayWeight} kg</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Water Intake */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Droplets className="h-5 w-5 text-teal-400" />
              Hydration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-300 mb-2">{waterIntake.toFixed(1)}L</p>
              <p className="text-slate-400">of {waterGoal}L goal</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Progress</span>
                <span className="text-teal-400">{Math.round(waterProgress)}%</span>
              </div>
              <Progress value={waterProgress} className="h-3 bg-slate-800" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => addWater(0.25)}
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                <Plus className="h-4 w-4" />
                250ml
              </Button>
              <Button
                onClick={() => addWater(0.5)}
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                <Plus className="h-4 w-4" />
                500ml
              </Button>
              <Button
                onClick={() => addWater(-0.25)}
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                <Minus className="h-4 w-4" />
                250ml
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-300 mb-2">{steps.toLocaleString()}</p>
              <p className="text-slate-400">of {stepGoal.toLocaleString()} goal</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Progress</span>
                <span className="text-purple-400">{Math.round(stepProgress)}%</span>
              </div>
              <Progress value={stepProgress} className="h-3 bg-slate-800" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="steps" className="text-slate-300">
                Update Step Count
              </Label>
              <Input
                id="steps"
                type="number"
                value={steps}
                onChange={(e) => setSteps(Number.parseInt(e.target.value) || 0)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400">Distance</p>
              <p className="text-xl font-bold text-teal-300">{(steps * 0.0008).toFixed(1)} km</p>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400">Calories</p>
              <p className="text-xl font-bold text-orange-300">{Math.round(steps * 0.04)}</p>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400">Active Time</p>
              <p className="text-xl font-bold text-green-300">{Math.round(steps / 120)} min</p>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400">Hydration</p>
              <p className="text-xl font-bold text-blue-300">{Math.round(waterProgress)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Measurements & Photos */}
      {isWeeklyMeasurementDay() && (
        <>
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                Weekly Body Measurements
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Weekly Tracking</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest" className="text-slate-300">
                    Chest (cm)
                  </Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    placeholder="102.0"
                    value={measurements.chest}
                    onChange={(e) => updateMeasurement("chest", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neck" className="text-slate-300">
                    Neck (cm)
                  </Label>
                  <Input
                    id="neck"
                    type="number"
                    step="0.1"
                    placeholder="38.0"
                    value={measurements.neck}
                    onChange={(e) => updateMeasurement("neck", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arms" className="text-slate-300">
                    Arms (cm)
                  </Label>
                  <Input
                    id="arms"
                    type="number"
                    step="0.1"
                    placeholder="35.0"
                    value={measurements.arms}
                    onChange={(e) => updateMeasurement("arms", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist" className="text-slate-300">
                    Waist (cm)
                  </Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    placeholder="85.0"
                    value={measurements.waist}
                    onChange={(e) => updateMeasurement("waist", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="thighs" className="text-slate-300">
                    Thighs (cm)
                  </Label>
                  <Input
                    id="thighs"
                    type="number"
                    step="0.1"
                    placeholder="58.0"
                    value={measurements.thighs}
                    onChange={(e) => updateMeasurement("thighs", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveMeasurements}
                disabled={measurementsLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
              >
                {measurementsLoading ? "Saving..." : "Save Measurements"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Camera className="h-5 w-5 text-green-400" />
                Weekly Progress Photos
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Weekly Tracking</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-32 bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 border-dashed"
                >
                  <div className="text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Front View</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-32 bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 border-dashed"
                >
                  <div className="text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Side View</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-32 bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 border-dashed"
                >
                  <div className="text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Back View</p>
                  </div>
                </Button>
              </div>

              <div className="text-center p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
                <p className="text-purple-300 font-semibold">📸 Weekly photo day! Capture your progress.</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Save Button */}
      <Button
        onClick={handleSaveDailyMetrics}
        disabled={dailyLoading}
        className="w-full bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white border-0 py-3"
      >
        {dailyLoading ? "Saving..." : "Save Daily Metrics"}
      </Button>

      {/* Motivational Message */}
      {stepProgress >= 80 && waterProgress >= 80 && (
        <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30 backdrop-blur-sm">
          <CardContent className="text-center py-6">
            <div className="text-4xl mb-2">🌟</div>
            <h3 className="text-xl font-bold text-green-300 mb-2">Amazing Progress!</h3>
            <p className="text-green-200">You're crushing both your movement and hydration goals today!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
