"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  Moon,
  UtensilsCrossed,
  Dumbbell,
  Activity,
  Brain,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Droplets,
  Scale,
  Flame,
} from "lucide-react"
import { MorningCheckin } from "./components/morning-checkin"
import { MealsTracking } from "./components/meals-tracking"
import { WorkoutLogging } from "./components/workout-logging"
import { BodyMetrics } from "./components/body-metrics"
import { MentalHealthCheckin } from "./components/mental-health-checkin"
import { useApi } from "@/hooks/use-api"
import { dashboardApi, type DashboardSummary } from "@/lib/api"

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "morning", label: "Morning", icon: Moon },
  { id: "meals", label: "Meals", icon: UtensilsCrossed },
  { id: "workout", label: "Workout", icon: Dumbbell },
  { id: "body", label: "Body", icon: Activity },
  { id: "mental", label: "Mental", icon: Brain },
]

export default function WellnessDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "morning":
        return <MorningCheckin />
      case "meals":
        return <MealsTracking />
      case "workout":
        return <WorkoutLogging />
      case "body":
        return <BodyMetrics />
      case "mental":
        return <MentalHealthCheckin />
      default:
        return <DashboardOverview setActiveSection={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Wellness
            </h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveSection(item.id)}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full text-left transition-all ${
                            activeSection === item.id
                              ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                          }`}
                        >
                          <Icon className="h-6 w-6 shrink-0" />
                          {item.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800">
        <div className="grid grid-cols-3 gap-1 p-2">
          {navigationItems.slice(0, 3).map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
        <div className="grid grid-cols-3 gap-1 p-2 pt-0">
          {navigationItems.slice(3).map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="py-6 px-4 sm:px-6 lg:px-8 pb-32 lg:pb-6">{renderActiveSection()}</main>
      </div>
    </div>
  )
}

function DashboardOverview({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const { data: dashboardData, loading, error, refetch } = useApi<DashboardSummary>(dashboardApi.getSummary, [])

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-lg">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-400 text-lg">Error loading dashboard: {error}</div>
        <Button onClick={refetch} className="bg-blue-600 hover:bg-blue-700">
          Retry
        </Button>
      </div>
    )
  }

  // Fallback data if API is not available
  const fallbackData: DashboardSummary = {
    todayStats: {
      sleep: 7.3,
      weight: 74.5,
      water: 2.1,
      steps: 8432,
    },
    weeklyTrends: {
      weight: [
        { date: "Mon", weight: 75.2, mood: "😊", sleep: 7.5 },
        { date: "Tue", weight: 75.0, mood: "😐", sleep: 6.8 },
        { date: "Wed", weight: 75.1, mood: "😃", sleep: 8.2 },
        { date: "Thu", weight: 74.8, mood: "😔", sleep: 7.0 },
        { date: "Fri", weight: 74.9, mood: "😊", sleep: 7.8 },
        { date: "Sat", weight: 74.7, mood: "😃", sleep: 8.5 },
        { date: "Today", weight: 74.5, mood: "😊", sleep: 7.3 },
      ],
      mood: [],
      sleep: [],
    },
    streaks: [
      { name: "Workout", days: 5, icon: "💪" },
      { name: "Sleep 7h+", days: 12, icon: "😴" },
      { name: "Hydration", days: 3, icon: "💧" },
      { name: "Meals", days: 8, icon: "🥗" },
    ],
    progress: {
      hydration: 70,
      steps: 84,
      meals: 50,
      workout: 0,
    },
  }

  const data = dashboardData || fallbackData

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-white mb-2">Good morning! 🌅</h1>
        <p className="text-slate-400">{today}</p>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Moon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Sleep</p>
                <p className="text-lg font-semibold text-white">{data.todayStats.sleep}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Scale className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Weight</p>
                <p className="text-lg font-semibold text-white">{data.todayStats.weight}kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Droplets className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Water</p>
                <p className="text-lg font-semibold text-white">{data.todayStats.water}L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Steps</p>
                <p className="text-lg font-semibold text-white">{data.todayStats.steps.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Weekly Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Weight Trend */}
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-3">Weight Progress</h4>
              <div className="grid grid-cols-7 gap-2">
                {data.weeklyTrends.weight.map((day, index) => (
                  <div key={index} className="text-center p-2 bg-slate-800/50 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">{day.date.slice(0, 3)}</p>
                    <p className="text-sm font-semibold text-white">{day.weight}kg</p>
                    {index > 0 && (
                      <div className="mt-1">
                        {day.weight < data.weeklyTrends.weight[index - 1].weight ? (
                          <TrendingDown className="h-3 w-3 text-green-400 mx-auto" />
                        ) : day.weight > data.weeklyTrends.weight[index - 1].weight ? (
                          <TrendingUp className="h-3 w-3 text-red-400 mx-auto" />
                        ) : (
                          <div className="h-3 w-3 bg-slate-600 rounded-full mx-auto"></div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mood & Sleep */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Daily Mood</h4>
                <div className="grid grid-cols-7 gap-2">
                  {data.weeklyTrends.weight.map((day, index) => (
                    <div key={index} className="text-center p-2 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">{day.date.slice(0, 3)}</p>
                      <div className="text-lg">{day.mood}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Sleep Hours</h4>
                <div className="grid grid-cols-7 gap-2">
                  {data.weeklyTrends.weight.map((day, index) => (
                    <div key={index} className="text-center p-2 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">{day.date.slice(0, 3)}</p>
                      <p className="text-sm font-semibold text-blue-300">{day.sleep}h</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Streaks */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-400" />
            Current Streaks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.streaks.map((streak) => (
              <div key={streak.name} className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-2xl mb-2">{streak.icon}</div>
                <p className="text-sm text-slate-400 mb-1">{streak.name}</p>
                <p className="text-xl font-bold text-orange-300">{streak.days} days</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Daily Hydration</span>
              <span className="text-teal-400">{data.todayStats.water}L / 3.0L</span>
            </div>
            <Progress value={data.progress.hydration} className="h-2 bg-slate-800" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Step Goal</span>
              <span className="text-purple-400">{data.todayStats.steps.toLocaleString()} / 10,000</span>
            </div>
            <Progress value={data.progress.steps} className="h-2 bg-slate-800" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Meals Completed</span>
              <span className="text-green-400">2 / 4</span>
            </div>
            <Progress value={data.progress.meals} className="h-2 bg-slate-800" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Workout</span>
              <span className="text-orange-400">Pending</span>
            </div>
            <Progress value={data.progress.workout} className="h-2 bg-slate-800" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => setActiveSection("morning")}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
            >
              <Clock className="h-4 w-4 mr-2" />
              Morning Check-In
            </Button>
            <Button
              onClick={() => setActiveSection("meals")}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white border-0"
            >
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Log Meal
            </Button>
            <Button
              onClick={() => setActiveSection("body")}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white border-0"
            >
              <Activity className="h-4 w-4 mr-2" />
              Body Metrics
            </Button>
            <Button
              onClick={() => setActiveSection("mental")}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white border-0"
            >
              <Brain className="h-4 w-4 mr-2" />
              Mental Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
