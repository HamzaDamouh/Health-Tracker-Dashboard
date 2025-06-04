"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getAllExerciseHistory } from "@/lib/storage"

const allExercises = [
  "Incline Bench Press",
  "Lateral Raises",
  "Machine Row",
  "Lat Pulldown (Lats focus)",
  "Lat Pulldown (Biceps focus)",
  "Barbell Back Squat",
  "Leg Extensions",
  "Hamstring Curls",
  "Trap Bar Deadlift",
]

export default function ProgressPage() {
  const [selectedExercise, setSelectedExercise] = useState(allExercises[0])
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const history = getAllExerciseHistory(selectedExercise)

    const processedData = history
      .map((entry, index) => {
        // Calculate max weight for the session
        const maxWeight = Math.max(...entry.sets.map((set) => Number.parseFloat(set.weight) || 0))
        // Calculate total volume (weight × reps)
        const totalVolume = entry.sets.reduce((sum, set) => {
          return sum + (Number.parseFloat(set.weight) || 0) * (Number.parseInt(set.reps) || 0)
        }, 0)

        return {
          session: `Session ${index + 1}`,
          date: new Date(entry.date).toLocaleDateString(),
          maxWeight,
          totalVolume,
          fullDate: entry.date,
        }
      })
      .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())

    setChartData(processedData)
  }, [selectedExercise])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/50">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-slate-700" />
            <h1 className="text-2xl font-bold text-slate-800">Progress Tracking</h1>
          </div>
        </div>

        {/* Exercise Selection */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Select Exercise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allExercises.map((exercise) => (
                <Button
                  key={exercise}
                  variant={selectedExercise === exercise ? "default" : "outline"}
                  onClick={() => setSelectedExercise(exercise)}
                  className={`text-left justify-start h-auto p-3 ${
                    selectedExercise === exercise ? "bg-slate-800 text-white" : "bg-white/50 hover:bg-white/80"
                  }`}
                >
                  {exercise}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Max Weight Chart */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Max Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="session" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="maxWeight"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    No data available for this exercise
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Total Volume Chart */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Total Volume Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="session" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalVolume"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    No data available for this exercise
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        {chartData.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">{selectedExercise} Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">
                    {Math.max(...chartData.map((d) => d.maxWeight))} lbs
                  </div>
                  <div className="text-sm text-slate-600">Personal Best</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">
                    {Math.max(...chartData.map((d) => d.totalVolume)).toLocaleString()} lbs
                  </div>
                  <div className="text-sm text-slate-600">Best Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{chartData.length}</div>
                  <div className="text-sm text-slate-600">Total Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
