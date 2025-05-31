const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Types for API responses
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface DashboardSummary {
  todayStats: {
    sleep: number
    weight: number
    water: number
    steps: number
  }
  weeklyTrends: {
    weight: Array<{ date: string; weight: number; mood: string; sleep: number }>
    mood: Array<{ date: string; mood: string }>
    sleep: Array<{ date: string; sleep: number }>
  }
  streaks: Array<{ name: string; days: number; icon: string }>
  progress: {
    hydration: number
    steps: number
    meals: number
    workout: number
  }
}

export interface SleepLogRequest {
  bedtime: string
  wakeTime: string
  mood: string
  energy: number
  focus: number
  tags: string[]
}

export interface MealLogRequest {
  mealType: string
  completed: boolean
  photoUrl?: string
}

export interface BodyMetricsRequest {
  weight?: number
  waterIntake: number
  steps: number
}

export interface WorkoutLogRequest {
  workoutType: string
  completed: boolean
  exercises: Array<{
    name: string
    sets: number
    reps: number
    weight: number
  }>
  notes?: string
}

export interface MentalHealthLogRequest {
  mood: string
  stress: number
  focus: number
  anxiety: number
  journalEntries: {
    dayEmotionally: string
    recurringThoughts: string
    intrusiveThoughts: string
    cbtTools: string
    gratitude: string
  }
  practices: string[]
}

export interface BodyMeasurementsRequest {
  chest: number
  neck: number
  arms: number
  waist: number
  thighs: number
}

// Base API function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

// Dashboard API calls
export const dashboardApi = {
  getSummary: () => apiCall<DashboardSummary>("/dashboard/summary"),
  getWeeklyTrends: () => apiCall<any>("/dashboard/weekly-trends"),
  getStreaks: () => apiCall<any>("/dashboard/streaks"),
}

// Sleep API calls
export const sleepApi = {
  logSleep: (data: SleepLogRequest) =>
    apiCall("/sleep/log", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getToday: () => apiCall("/sleep/today"),
  getWeek: () => apiCall("/sleep/week"),
}

// Meal API calls
export const mealApi = {
  logMeal: (data: MealLogRequest) =>
    apiCall("/meals/log", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getToday: () => apiCall("/meals/today"),
  getProgress: () => apiCall("/meals/progress"),
  markComplete: (id: number) =>
    apiCall(`/meals/${id}/complete`, {
      method: "PUT",
    }),
}

// Workout API calls
export const workoutApi = {
  logWorkout: (data: WorkoutLogRequest) =>
    apiCall("/workouts/log", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getToday: () => apiCall("/workouts/today"),
  getSchedule: () => apiCall("/workouts/schedule"),
  markComplete: (id: number) =>
    apiCall(`/workouts/${id}/complete`, {
      method: "PUT",
    }),
}

// Body metrics API calls
export const bodyApi = {
  logDaily: (data: BodyMetricsRequest) =>
    apiCall("/body/daily", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  logMeasurements: (data: BodyMeasurementsRequest) =>
    apiCall("/body/measurements", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getToday: () => apiCall("/body/today"),
  getTrends: () => apiCall("/body/trends"),
  uploadPhoto: (formData: FormData) =>
    apiCall("/body/photos", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    }),
}

// Mental health API calls
export const mentalHealthApi = {
  logCheckin: (data: MentalHealthLogRequest) =>
    apiCall("/mental/checkin", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getToday: () => apiCall("/mental/today"),
  getWeek: () => apiCall("/mental/week"),
}
