"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, CheckCircle2, History, Plus } from "lucide-react"
import Link from "next/link"
import {
  getWorkoutData,
  saveWorkoutData,
  markWorkoutComplete,
  isWorkoutCompleted,
  getExerciseHistory,
} from "@/lib/storage"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const workoutPlans = {
  monday: {
    name: "Monday",
    type: "Upper A",
    color: "bg-blue-500",
    exercises: ["Incline Bench Press", "Lateral Raises", "Machine Row", "Lat Pulldown (Lats focus)"],
  },
  tuesday: {
    name: "Tuesday",
    type: "Lower A",
    color: "bg-green-500",
    exercises: ["Barbell Back Squat", "Lateral Raises", "Leg Extensions", "Hamstring Curls"],
  },
  thursday: {
    name: "Thursday",
    type: "Upper B",
    color: "bg-purple-500",
    exercises: ["Incline Bench Press", "Lateral Raises", "Machine Row", "Lat Pulldown (Biceps focus)"],
  },
  friday: {
    name: "Friday",
    type: "Lower B",
    color: "bg-orange-500",
    exercises: ["Trap Bar Deadlift", "Lateral Raises", "Leg Extensions", "Hamstring Curls"],
  },
}

interface ExerciseSet {
  weight: string
  reps: string
  notes: string
}

interface WorkoutData {
  [exercise: string]: ExerciseSet[]
}

export default function WorkoutPage() {
  const params = useParams()
  const router = useRouter()
  const day = params.day as string

  const [workoutData, setWorkoutData] = useState<WorkoutData>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [exerciseHistory, setExerciseHistory] = useState<any[]>([])

  const workout = workoutPlans[day as keyof typeof workoutPlans]

  useEffect(() => {
    if (!workout) return

    const data = getWorkoutData(workout.name)
    const completed = isWorkoutCompleted(workout.name)

    // Initialize with at least one set per exercise
    const initialData: WorkoutData = {}
    workout.exercises.forEach((exercise) => {
      initialData[exercise] = data[exercise] || [{ weight: "", reps: "", notes: "" }]
    })

    setWorkoutData(initialData)
    setIsCompleted(completed)
  }, [workout])

  const addSet = (exercise: string) => {
    setWorkoutData((prev) => ({
      ...prev,
      [exercise]: [...prev[exercise], { weight: "", reps: "", notes: "" }],
    }))
  }

  const updateSet = (exercise: string, setIndex: number, field: keyof ExerciseSet, value: string) => {
    setWorkoutData((prev) => ({
      ...prev,
      [exercise]: prev[exercise].map((set, index) => (index === setIndex ? { ...set, [field]: value } : set)),
    }))
  }

  const removeSet = (exercise: string, setIndex: number) => {
    setWorkoutData((prev) => ({
      ...prev,
      [exercise]: prev[exercise].filter((_, index) => index !== setIndex),
    }))
  }

  const saveWorkout = () => {
    saveWorkoutData(workout.name, workoutData)
  }

  const completeWorkout = () => {
    saveWorkoutData(workout.name, workoutData)
    markWorkoutComplete(workout.name)
    setIsCompleted(true)
  }

  const viewHistory = (exercise: string) => {
    const history = getExerciseHistory(exercise)
    setExerciseHistory(history)
    setSelectedExercise(exercise)
  }

  if (!workout) {
    return <div>Workout not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/50">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${workout.color}`} />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{workout.name}</h1>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                {workout.type}
              </Badge>
            </div>
            {isCompleted && <CheckCircle2 className="w-6 h-6 text-green-500" />}
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-6">
          {workout.exercises.map((exercise, exerciseIndex) => (
            <Card key={exercise} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800">{exercise}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewHistory(exercise)}
                    className="bg-white/50 hover:bg-white/80"
                  >
                    <History className="w-4 h-4 mr-2" />
                    History
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {workoutData[exercise]?.map((set, setIndex) => (
                  <div key={setIndex} className="grid grid-cols-12 gap-3 items-center p-4 bg-slate-50/50 rounded-xl">
                    <div className="col-span-1 text-sm font-medium text-slate-600">{setIndex + 1}</div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Weight"
                        value={set.weight}
                        onChange={(e) => updateSet(exercise, setIndex, "weight", e.target.value)}
                        className="bg-white/80 border-slate-200"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Reps"
                        value={set.reps}
                        onChange={(e) => updateSet(exercise, setIndex, "reps", e.target.value)}
                        className="bg-white/80 border-slate-200"
                      />
                    </div>
                    <div className="col-span-4">
                      <Input
                        placeholder="Notes (optional)"
                        value={set.notes}
                        onChange={(e) => updateSet(exercise, setIndex, "notes", e.target.value)}
                        className="bg-white/80 border-slate-200"
                      />
                    </div>
                    <div className="col-span-1">
                      {workoutData[exercise].length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSet(exercise, setIndex)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => addSet(exercise)}
                  className="w-full bg-white/50 hover:bg-white/80 border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Set
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            onClick={saveWorkout}
            variant="outline"
            className="bg-white/80 hover:bg-white text-slate-700 px-8 py-3 rounded-xl shadow-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Progress
          </Button>

          <Button
            onClick={completeWorkout}
            disabled={isCompleted}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-lg disabled:bg-green-400"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {isCompleted ? "Workout Completed" : "Complete Workout"}
          </Button>
        </div>

        {/* History Dialog */}
        <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedExercise} - Recent History</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {exerciseHistory.length > 0 ? (
                exerciseHistory.slice(0, 3).map((entry, index) => (
                  <Card key={index} className="bg-slate-50">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-600 mb-2">{new Date(entry.date).toLocaleDateString()}</div>
                      <div className="space-y-2">
                        {entry.sets.map((set: ExerciseSet, setIndex: number) => (
                          <div key={setIndex} className="flex gap-4 text-sm">
                            <span className="font-medium">Set {setIndex + 1}:</span>
                            <span>
                              {set.weight} lbs × {set.reps} reps
                            </span>
                            {set.notes && <span className="text-slate-500">({set.notes})</span>}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">No previous data found</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
