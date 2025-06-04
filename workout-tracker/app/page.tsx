"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Dumbbell, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { isWorkoutCompleted } from "@/lib/storage"

const workoutDays = [
  { day: "Monday", type: "Upper A", color: "bg-blue-500" },
  { day: "Tuesday", type: "Lower A", color: "bg-green-500" },
  { day: "Thursday", type: "Upper B", color: "bg-purple-500" },
  { day: "Friday", type: "Lower B", color: "bg-orange-500" },
]

export default function Dashboard() {
  const [completedWorkouts, setCompletedWorkouts] = useState<Record<string, boolean>>({})
  const [totalWorkouts, setTotalWorkouts] = useState(0)

  useEffect(() => {
    const completed: Record<string, boolean> = {}
    let total = 0

    workoutDays.forEach(({ day }) => {
      completed[day] = isWorkoutCompleted(day)
      if (completed[day]) total++
    })

    setCompletedWorkouts(completed)
    setTotalWorkouts(total)
  }, [])

  const getCurrentWeekProgress = () => {
    const today = new Date().getDay()
    const completedThisWeek = Object.entries(completedWorkouts).filter(([day, completed]) => {
      const dayIndex = workoutDays.findIndex((w) => w.day === day)
      return completed && dayIndex !== -1
    }).length

    return Math.round((completedThisWeek / 4) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-white rounded-2xl shadow-lg">
              <Dumbbell className="w-8 h-8 text-slate-700" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800">FitTracker Pro</h1>
          </div>
          <p className="text-slate-600 text-lg">Your premium workout companion</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{getCurrentWeekProgress()}%</div>
              <p className="text-sm text-slate-500 mt-1">Progress completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{totalWorkouts}/4</div>
              <p className="text-sm text-slate-500 mt-1">Workouts this cycle</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/progress">
                <Button variant="outline" className="w-full bg-white/50 hover:bg-white/80 transition-all duration-200">
                  View Charts
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Workout Days */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 text-center">Select Your Workout</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workoutDays.map(({ day, type, color }) => (
              <Link key={day} href={`/workout/${day.toLowerCase()}`}>
                <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${color}`} />
                          <h3 className="text-xl font-bold text-slate-800">{day}</h3>
                          {completedWorkouts[day] && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                          {type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-200">💪</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-slate-700">Quick Actions</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/progress">
              <Button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                View Progress Charts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
