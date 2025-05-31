"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dumbbell, Check, Calendar, Target } from "lucide-react"

export function WorkoutLogging() {
  const [workoutCompleted, setWorkoutCompleted] = useState(false)
  const [exerciseData, setExerciseData] = useState<{ [key: string]: { sets: string; reps: string; weight: string } }>(
    {},
  )
  const [workoutNotes, setWorkoutNotes] = useState("")

  const workoutSchedule = {
    Monday: "A",
    Tuesday: "C",
    Wednesday: "Rest",
    Thursday: "A",
    Friday: "B",
    Saturday: "Rest",
    Sunday: "Rest",
  }

  const workouts = {
    A: [
      "Bench Press Incline",
      "Barbell Rows",
      "Overhead Press",
      "EZ Curl Biceps",
      "Triceps Pushdowns",
      "Kettlebell Swings",
    ],
    B: ["Squats", "Lateral Raises", "Leg Extension", "Hamstring Curls", "Lat Pulldown"],
    C: ["Trap Bar Deadlift", "Lateral Raises", "Leg Extension", "Hamstring Curls", "Lat Pulldown"],
  }

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
  const todaysWorkout = workoutSchedule[today as keyof typeof workoutSchedule]
  const exercises = todaysWorkout !== "Rest" ? workouts[todaysWorkout as keyof typeof workouts] : []

  const updateExerciseData = (exercise: string, field: string, value: string) => {
    setExerciseData((prev) => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        [field]: value,
      },
    }))
  }

  const getWeeklySchedule = () => {
    return Object.entries(workoutSchedule).map(([day, workout]) => ({
      day,
      workout,
      isToday: day === today,
    }))
  }

  if (todaysWorkout === "Rest") {
    return (
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Dumbbell className="h-8 w-8 text-purple-400" />
            Workout Logging
          </h1>
          <p className="text-slate-400">Track your training progress</p>
        </div>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🛌</div>
            <h2 className="text-2xl font-bold text-white mb-2">Rest Day</h2>
            <p className="text-slate-400">Take time to recover and recharge for tomorrow's workout!</p>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {getWeeklySchedule().map(({ day, workout, isToday }) => (
                <div
                  key={day}
                  className={`text-center p-3 rounded-lg ${
                    isToday
                      ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/50"
                      : "bg-slate-800/50"
                  }`}
                >
                  <p className="text-xs text-slate-400 mb-1">{day.slice(0, 3)}</p>
                  <p className={`font-semibold ${workout === "Rest" ? "text-green-300" : "text-purple-300"}`}>
                    {workout === "Rest" ? "Rest" : `Workout ${workout}`}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Dumbbell className="h-8 w-8 text-purple-400" />
          Workout Logging
        </h1>
        <p className="text-slate-400">Today's workout: Workout {todaysWorkout}</p>
      </div>

      {/* Workout Status */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>
              Workout {todaysWorkout} - {today}
            </span>
            {workoutCompleted && (
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <Check className="h-4 w-4 mr-1" />
                Completed
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-purple-400" />
            <span className="text-slate-300">{exercises.length} exercises planned</span>
          </div>

          <Button
            onClick={() => setWorkoutCompleted(!workoutCompleted)}
            className={`w-full ${
              workoutCompleted
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
            } border-0 py-3`}
          >
            {workoutCompleted ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Workout Completed
              </>
            ) : (
              "Mark Workout as Complete"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Exercise Logging */}
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <Card key={exercise} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <span className="text-2xl">💪</span>
                <div>
                  <h3 className="text-lg">{exercise}</h3>
                  <p className="text-sm text-slate-400">
                    Exercise {index + 1} of {exercises.length}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`sets-${index}`} className="text-slate-300">
                    Sets
                  </Label>
                  <Input
                    id={`sets-${index}`}
                    type="number"
                    placeholder="3"
                    value={exerciseData[exercise]?.sets || ""}
                    onChange={(e) => updateExerciseData(exercise, "sets", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`reps-${index}`} className="text-slate-300">
                    Reps
                  </Label>
                  <Input
                    id={`reps-${index}`}
                    type="number"
                    placeholder="10"
                    value={exerciseData[exercise]?.reps || ""}
                    onChange={(e) => updateExerciseData(exercise, "reps", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`weight-${index}`} className="text-slate-300">
                    Weight (kg)
                  </Label>
                  <Input
                    id={`weight-${index}`}
                    type="number"
                    placeholder="50"
                    value={exerciseData[exercise]?.weight || ""}
                    onChange={(e) => updateExerciseData(exercise, "weight", e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workout Notes */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Workout Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="How did the workout feel? Any observations or effort notes..."
            value={workoutNotes}
            onChange={(e) => setWorkoutNotes(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {getWeeklySchedule().map(({ day, workout, isToday }) => (
              <div
                key={day}
                className={`text-center p-3 rounded-lg ${
                  isToday
                    ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/50"
                    : "bg-slate-800/50"
                }`}
              >
                <p className="text-xs text-slate-400 mb-1">{day.slice(0, 3)}</p>
                <p className={`font-semibold ${workout === "Rest" ? "text-green-300" : "text-purple-300"}`}>
                  {workout === "Rest" ? "Rest" : `Workout ${workout}`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
