"use client"

import { useState } from "react"
import { Clock, Moon, Sun } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SleepSection() {
  const [mood, setMood] = useState<string>("😴")
  const [bedtime, setBedtime] = useState<string>("22:30")
  const [wakeTime, setWakeTime] = useState<string>("06:45")

  // Calculate sleep duration
  const calculateSleepDuration = () => {
    const bedtimeParts = bedtime.split(":")
    const waketimeParts = wakeTime.split(":")

    const bedtimeHours = Number.parseInt(bedtimeParts[0])
    const bedtimeMinutes = Number.parseInt(bedtimeParts[1])

    let waketimeHours = Number.parseInt(waketimeParts[0])
    const waketimeMinutes = Number.parseInt(waketimeParts[1])

    // Convert to 24-hour format for calculation
    if (bedtimeHours > waketimeHours) {
      waketimeHours += 24
    }

    const totalBedtimeMinutes = bedtimeHours * 60 + bedtimeMinutes
    const totalWaketimeMinutes = waketimeHours * 60 + waketimeMinutes

    const diffMinutes = totalWaketimeMinutes - totalBedtimeMinutes

    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60

    return `${hours}h ${minutes}m`
  }

  const sleepDuration = calculateSleepDuration()
  const sleepQuality = 85 // Mock data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Sleep</h2>
        <span className="text-sm text-gray-400">Last Night</span>
      </div>

      <Card gradient>
        <CardHeader>
          <CardTitle>Sleep Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-white">{sleepDuration}</div>
            <div className="text-5xl">{mood}</div>
          </div>
          <div className="mt-4">
            <Progress value={sleepQuality} max={100} label="Sleep Quality" color="purple" showValue />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Moon className="mr-2 h-5 w-5 text-indigo-400" />
              Bedtime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="mr-2 h-5 w-5 text-amber-400" />
              Wake Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How did you feel this morning?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around">
            {["😴", "😫", "😐", "🙂", "😊"].map((emoji) => (
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
        </CardContent>
      </Card>
    </div>
  )
}
