"use client"

import { Moon, Utensils, Dumbbell, LineChart, Brain } from "lucide-react"
import type { Section } from "@/components/dashboard"

interface BottomNavProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

export default function BottomNav({ activeSection, setActiveSection }: BottomNavProps) {
  const navItems = [
    { id: "sleep" as Section, label: "Sleep", icon: Moon },
    { id: "meals" as Section, label: "Meals", icon: Utensils },
    { id: "workouts" as Section, label: "Workouts", icon: Dumbbell },
    { id: "transformation" as Section, label: "Transform", icon: LineChart },
    { id: "mental" as Section, label: "Mental", icon: Brain },
  ]

  return (
    <nav className="fixed bottom-0 left-0 z-10 w-full border-t border-gray-800 bg-gray-900 bg-opacity-90 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center justify-center px-3 py-2 ${
              activeSection === item.id ? "text-white" : "text-gray-400"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="mt-1 text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
