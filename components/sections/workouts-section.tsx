import { Dumbbell, Flame } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function WorkoutsSection() {
  const workoutPlan = {
    day: "Monday",
    focus: "Upper Body",
    exercises: [
      {
        id: 1,
        name: "Bench Press",
        sets: 4,
        reps: 8,
        weight: "185 lbs",
        intensity: "moderate",
      },
      {
        id: 2,
        name: "Pull-ups",
        sets: 3,
        reps: 10,
        weight: "Bodyweight",
        intensity: "hard",
      },
      {
        id: 3,
        name: "Shoulder Press",
        sets: 3,
        reps: 12,
        weight: "65 lbs",
        intensity: "moderate",
      },
      {
        id: 4,
        name: "Bicep Curls",
        sets: 3,
        reps: 12,
        weight: "35 lbs",
        intensity: "light",
      },
      {
        id: 5,
        name: "Tricep Extensions",
        sets: 3,
        reps: 15,
        weight: "30 lbs",
        intensity: "light",
      },
    ],
  }

  const intensityColors = {
    light: "bg-green-500 bg-opacity-20 text-green-400",
    moderate: "bg-yellow-500 bg-opacity-20 text-yellow-400",
    hard: "bg-red-500 bg-opacity-20 text-red-400",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Workouts</h2>
        <span className="text-sm text-gray-400">Today</span>
      </div>

      <Card gradient>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Dumbbell className="mr-2 h-5 w-5 text-purple-400" />
            {workoutPlan.day}: {workoutPlan.focus}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-400">
            Complete all exercises with proper form and adequate rest between sets.
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {workoutPlan.exercises.map((exercise) => (
          <Card key={exercise.id} className="hover:border-gray-700 hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{exercise.name}</h3>
                <span
                  className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    intensityColors[exercise.intensity as keyof typeof intensityColors]
                  }`}
                >
                  <Flame className="mr-1 h-3 w-3" />
                  {exercise.intensity}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">{exercise.sets} sets</span>
                <span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">{exercise.reps} reps</span>
                <span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">{exercise.weight}</span>
              </div>
              <div className="mt-3 flex items-center justify-end">
                <button className="rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300 hover:bg-gray-700">
                  Complete
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700">
          Log Workout
        </button>
      </div>
    </div>
  )
}
