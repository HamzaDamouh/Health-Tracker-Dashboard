"use client"

import { useState } from "react"
import { Brain, BookOpen } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function MentalHealthSection() {
  const [mood, setMood] = useState<string>("😊")
  const [stressLevel, setStressLevel] = useState<number>(3)
  const [energyLevel, setEnergyLevel] = useState<number>(7)
  const [focusLevel, setFocusLevel] = useState<number>(8)
  const [reflection, setReflection] = useState<string>("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Mental Health</h2>
        <span className="text-sm text-gray-400">Daily Check-in</span>
      </div>

      <Card gradient>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-400" />
            Today's Mood
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-6xl">{mood}</div>
            <div className="mt-4 flex justify-center space-x-4">
              {["😫", "😔", "😐", "🙂", "😊"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setMood(emoji)}
                  className={`text-3xl transition-transform ${
                    mood === emoji ? "scale-125" : "opacity-50 hover:opacity-75"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Stress Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-2xl font-bold text-white">{stressLevel}/10</div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number.parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #22c55e ${
                    ((10 - stressLevel) / 9) * 100
                  }%, #4b5563 ${((10 - stressLevel) / 9) * 100}%, #4b5563 100%)`,
                }}
              />
              <div className="mt-2 flex w-full justify-between text-xs text-gray-400">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-2xl font-bold text-white">{energyLevel}/10</div>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number.parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    ((energyLevel - 1) / 9) * 100
                  }%, #4b5563 ${((energyLevel - 1) / 9) * 100}%, #4b5563 100%)`,
                }}
              />
              <div className="mt-2 flex w-full justify-between text-xs text-gray-400">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-2xl font-bold text-white">{focusLevel}/10</div>
              <input
                type="range"
                min="1"
                max="10"
                value={focusLevel}
                onChange={(e) => setFocusLevel(Number.parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
                style={{
                  background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${
                    ((focusLevel - 1) / 9) * 100
                  }%, #4b5563 ${((focusLevel - 1) / 9) * 100}%, #4b5563 100%)`,
                }}
              />
              <div className="mt-2 flex w-full justify-between text-xs text-gray-400">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-blue-400" />
            Daily Reflection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your thoughts, feelings, and reflections for today..."
            className="h-32 w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </CardContent>
        <CardFooter>
          <button className="ml-auto rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-purple-700">
            Save Reflection
          </button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-gray-300">
            <p>
              <span className="font-medium text-white">Mood:</span>{" "}
              {mood === "😊"
                ? "Happy"
                : mood === "🙂"
                  ? "Good"
                  : mood === "😐"
                    ? "Neutral"
                    : mood === "😔"
                      ? "Sad"
                      : "Stressed"}
            </p>
            <p>
              <span className="font-medium text-white">Stress level:</span>{" "}
              {stressLevel <= 3 ? "Low" : stressLevel <= 7 ? "Moderate" : "High"}
            </p>
            <p>
              <span className="font-medium text-white">Energy level:</span>{" "}
              {energyLevel <= 3 ? "Low" : energyLevel <= 7 ? "Moderate" : "High"}
            </p>
            <p>
              <span className="font-medium text-white">Focus level:</span>{" "}
              {focusLevel <= 3 ? "Low" : focusLevel <= 7 ? "Moderate" : "High"}
            </p>
          </div>
          <div className="mt-4 rounded-lg bg-gray-800 p-4">
            <p className="text-sm text-gray-400">
              Based on your inputs today, consider taking short breaks between tasks to maintain your focus and energy
              levels. Your stress level is manageable, which is great for productivity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
