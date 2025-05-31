"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Clock, Zap, Brain } from "lucide-react"
import { useMutation } from "@/hooks/use-api"
import { sleepApi, type SleepLogRequest } from "@/lib/api"

export function MorningCheckin() {
  const [bedtime, setBedtime] = useState("22:30")
  const [wakeTime, setWakeTime] = useState("06:00")
  const [selectedMood, setSelectedMood] = useState("")
  const [energy, setEnergy] = useState([7])
  const [focus, setFocus] = useState([6])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { mutate: logSleep, loading, error } = useMutation<SleepLogRequest, any>(sleepApi.logSleep)

  const moodEmojis = [
    { emoji: "😴", label: "Sleepy" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😫", label: "Tired" },
    { emoji: "😊", label: "Good" },
    { emoji: "🤩", label: "Energized" },
  ]

  const sleepTags = ["Slept well", "Bad dreams", "Restless", "Deep sleep", "Woke up early", "Hard to fall asleep"]

  const calculateSleepDuration = () => {
    const bedtimeParts = bedtime.split(":")
    const waketimeParts = wakeTime.split(":")

    const bedtimeMinutes = Number.parseInt(bedtimeParts[0]) * 60 + Number.parseInt(bedtimeParts[1])
    let waketimeMinutes = Number.parseInt(waketimeParts[0]) * 60 + Number.parseInt(waketimeParts[1])

    if (waketimeMinutes < bedtimeMinutes) {
      waketimeMinutes += 24 * 60
    }

    const totalMinutes = waketimeMinutes - bedtimeMinutes
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}h ${minutes}m`
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSubmit = async () => {
    const sleepData: SleepLogRequest = {
      bedtime,
      wakeTime,
      mood: selectedMood,
      energy: energy[0],
      focus: focus[0],
      tags: selectedTags,
    }

    const result = await logSleep(sleepData)
    if (result) {
      // Success - could show a toast notification
      console.log("Sleep logged successfully:", result)
      // Reset form or navigate away
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Moon className="h-8 w-8 text-blue-400" />
          Morning Check-In
        </h1>
        <p className="text-slate-400">How did you sleep? How are you feeling?</p>
      </div>

      {error && (
        <Card className="bg-red-900/20 border-red-500/30">
          <CardContent className="p-4">
            <p className="text-red-300">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Sleep Tracking */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Sleep Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bedtime" className="text-slate-300">
                Bedtime
              </Label>
              <Input
                id="bedtime"
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waketime" className="text-slate-300">
                Wake Time
              </Label>
              <Input
                id="waketime"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
            <p className="text-sm text-slate-300 mb-1">Total Sleep</p>
            <p className="text-2xl font-bold text-blue-300">{calculateSleepDuration()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Mood Selection */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-400" />
            How do you feel?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-3">
            {moodEmojis.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`p-4 rounded-xl text-center transition-all ${
                  selectedMood === mood.label
                    ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-2 border-blue-400"
                    : "bg-slate-800/50 hover:bg-slate-700/50 border-2 border-transparent"
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-xs text-slate-300">{mood.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Energy & Focus Sliders */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Energy & Focus Levels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="text-slate-300">Energy Level</Label>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  {energy[0]}/10
                </Badge>
              </div>
              <Slider value={energy} onValueChange={setEnergy} max={10} min={1} step={1} className="w-full" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="text-slate-300">Focus Level</Label>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {focus[0]}/10
                </Badge>
              </div>
              <Slider value={focus} onValueChange={setFocus} max={10} min={1} step={1} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Tags */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            Sleep Quality Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sleepTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-2 rounded-full text-sm transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-300 border border-purple-400/50"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-3"
      >
        {loading ? "Saving..." : "Save Morning Check-In"}
      </Button>
    </div>
  )
}
