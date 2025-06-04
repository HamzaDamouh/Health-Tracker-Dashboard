interface ExerciseSet {
  weight: string
  reps: string
  notes: string
}

interface WorkoutData {
  [exercise: string]: ExerciseSet[]
}

interface ExerciseHistory {
  date: string
  sets: ExerciseSet[]
}

// Get workout data for a specific day
export function getWorkoutData(day: string): WorkoutData {
  if (typeof window === "undefined") return {}

  const data = localStorage.getItem(`workout-${day}`)
  return data ? JSON.parse(data) : {}
}

// Save workout data for a specific day
export function saveWorkoutData(day: string, data: WorkoutData): void {
  if (typeof window === "undefined") return

  localStorage.setItem(`workout-${day}`, JSON.stringify(data))

  // Also save to exercise history
  Object.entries(data).forEach(([exercise, sets]) => {
    if (sets.some((set) => set.weight || set.reps)) {
      saveExerciseHistory(exercise, sets)
    }
  })
}

// Mark workout as completed
export function markWorkoutComplete(day: string): void {
  if (typeof window === "undefined") return

  const completedWorkouts = getCompletedWorkouts()
  completedWorkouts[day] = new Date().toISOString()
  localStorage.setItem("completed-workouts", JSON.stringify(completedWorkouts))
}

// Check if workout is completed
export function isWorkoutCompleted(day: string): boolean {
  if (typeof window === "undefined") return false

  const completedWorkouts = getCompletedWorkouts()
  return !!completedWorkouts[day]
}

// Get all completed workouts
function getCompletedWorkouts(): Record<string, string> {
  if (typeof window === "undefined") return {}

  const data = localStorage.getItem("completed-workouts")
  return data ? JSON.parse(data) : {}
}

// Save exercise history
function saveExerciseHistory(exercise: string, sets: ExerciseSet[]): void {
  if (typeof window === "undefined") return

  const history = getExerciseHistory(exercise)
  const newEntry: ExerciseHistory = {
    date: new Date().toISOString(),
    sets: sets.filter((set) => set.weight || set.reps), // Only save sets with data
  }

  // Add new entry and keep only last 10 entries
  history.unshift(newEntry)
  const trimmedHistory = history.slice(0, 10)

  localStorage.setItem(`exercise-history-${exercise}`, JSON.stringify(trimmedHistory))
}

// Get exercise history
export function getExerciseHistory(exercise: string): ExerciseHistory[] {
  if (typeof window === "undefined") return []

  const data = localStorage.getItem(`exercise-history-${exercise}`)
  return data ? JSON.parse(data) : []
}

// Get all exercise history (for progress charts)
export function getAllExerciseHistory(exercise: string): ExerciseHistory[] {
  return getExerciseHistory(exercise)
}

// Clear all data (for testing/reset)
export function clearAllData(): void {
  if (typeof window === "undefined") return

  const keys = Object.keys(localStorage).filter(
    (key) => key.startsWith("workout-") || key.startsWith("exercise-history-") || key === "completed-workouts",
  )

  keys.forEach((key) => localStorage.removeItem(key))
}
