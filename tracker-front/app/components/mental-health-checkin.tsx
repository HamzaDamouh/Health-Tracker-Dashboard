"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, Lightbulb, Shield, Check } from "lucide-react"

export function MentalHealthCheckin() {
  const [selectedMood, setSelectedMood] = useState("")
  const [stress, setStress] = useState([5])
  const [focus, setFocus] = useState([6])
  const [anxiety, setAnxiety] = useState([4])
  const [journalResponses, setJournalResponses] = useState({
    dayEmotionally: "",
    recurringThoughts: "",
    intrusiveThoughts: "",
    cbtTools: "",
    gratitude: "",
  })
  const [practices, setPractices] = useState<string[]>([])

  const moodEmojis = [
    { emoji: "😃", label: "Great", color: "text-green-300" },
    { emoji: "😐", label: "Neutral", color: "text-yellow-300" },
    { emoji: "😔", label: "Low", color: "text-orange-300" },
    { emoji: "😫", label: "Struggling", color: "text-red-300" },
  ]

  const practiceOptions = [
    "Practiced mindfulness",
    "Took medication",
    "Avoided compulsions",
    "Used breathing exercises",
    "Journaled thoughts",
    "Exercised for mental health",
  ]

  const journalPrompts = [
    {
      key: "dayEmotionally",
      question: "How was your day emotionally?",
      placeholder: "Describe your emotional state throughout the day...",
    },
    {
      key: "recurringThoughts",
      question: "What thoughts kept coming up?",
      placeholder: "Any patterns or recurring thoughts you noticed...",
    },
    {
      key: "intrusiveThoughts",
      question: "Any intrusive thoughts?",
      placeholder: "Note any unwanted or distressing thoughts...",
    },
    {
      key: "cbtTools",
      question: "Did you use CBT tools today?",
      placeholder: "Which cognitive behavioral techniques did you practice...",
    },
    {
      key: "gratitude",
      question: "One thing you're grateful for?",
      placeholder: "Something positive from today...",
    },
  ]

  const updateJournalResponse = (key: string, value: string) => {
    setJournalResponses((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const togglePractice = (practice: string) => {
    setPractices((prev) => (prev.includes(practice) ? prev.filter((p) => p !== practice) : [...prev, practice]))
  }

  const getStressColor = (level: number) => {
    if (level <= 3) return "text-green-300"
    if (level <= 6) return "text-yellow-300"
    if (level <= 8) return "text-orange-300"
    return "text-red-300"
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Brain className="h-8 w-8 text-purple-400" />
          Mental Health Check-In
        </h1>
        <p className="text-slate-400">Evening reflection and emotional wellness tracking</p>
      </div>

      {/* Mood Selection */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-400" />
            Evening Mood
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {moodEmojis.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`p-4 rounded-xl text-center transition-all ${
                  selectedMood === mood.label
                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-400"
                    : "bg-slate-800/50 hover:bg-slate-700/50 border-2 border-transparent"
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className={`text-xs ${mood.color}`}>{mood.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mental Health Sliders */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-400" />
            Mental State Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="text-slate-300">Stress Level</Label>
                <Badge variant="outline" className={`bg-red-500/20 border-red-500/30 ${getStressColor(stress[0])}`}>
                  {stress[0]}/10
                </Badge>
              </div>
              <Slider value={stress} onValueChange={setStress} max={10} min={1} step={1} className="w-full" />
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

            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="text-slate-300">Anxiety Level</Label>
                <Badge
                  variant="outline"
                  className={`bg-orange-500/20 border-orange-500/30 ${getStressColor(anxiety[0])}`}
                >
                  {anxiety[0]}/10
                </Badge>
              </div>
              <Slider value={anxiety} onValueChange={setAnxiety} max={10} min={1} step={1} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mental Health Practices */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Today's Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {practiceOptions.map((practice) => (
              <button
                key={practice}
                onClick={() => togglePractice(practice)}
                className={`p-3 rounded-lg text-left transition-all ${
                  practices.includes(practice)
                    ? "bg-gradient-to-r from-green-600/30 to-teal-600/30 text-green-300 border border-green-400/50"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {practices.includes(practice) && <Check className="h-4 w-4" />}
                  <span className="text-sm">{practice}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Journal Prompts */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            Mental Health Journal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {journalPrompts.map((prompt) => (
            <div key={prompt.key} className="space-y-2">
              <Label className="text-slate-300 font-medium">{prompt.question}</Label>
              <Textarea
                placeholder={prompt.placeholder}
                value={journalResponses[prompt.key as keyof typeof journalResponses]}
                onChange={(e) => updateJournalResponse(prompt.key, e.target.value)}
                className="bg-slate-800 border-slate-700 text-white min-h-[80px]"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mental Health Summary */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Today's Mental Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400">Mood</p>
              <p className="text-lg font-bold text-purple-300">{selectedMood || "Not set"}</p>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400">Stress</p>
              <p className={`text-lg font-bold ${getStressColor(stress[0])}`}>{stress[0]}/10</p>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400">Practices</p>
              <p className="text-lg font-bold text-green-300">{practices.length}</p>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400">Journal</p>
              <p className="text-lg font-bold text-blue-300">
                {Object.values(journalResponses).filter((r) => r.trim()).length}/5
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 py-3">
        Save Mental Health Check-In
      </Button>
    </div>
  )
}
