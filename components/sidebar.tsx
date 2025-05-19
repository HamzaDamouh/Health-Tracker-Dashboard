"use client"

import { Moon, Utensils, Dumbbell, LineChart, Brain } from "lucide-react"
import type { Section } from "@/components/dashboard"

interface SidebarProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const navItems = [
    { id: "sleep" as Section, label: "Sleep", icon: Moon },
    { id: "meals" as Section, label: "Meals", icon: Utensils },
    { id: "workouts" as Section, label: "Workouts", icon: Dumbbell },
    { id: "transformation" as Section, label: "Transformation", icon: LineChart },
    { id: "mental" as Section, label: "Mental Health", icon: Brain },
  ]

  return (
    <aside className="fixed left-0 top-0 z-10 h-full w-64 bg-gray-900 bg-opacity-70 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">Health Dashboard</h1>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex w-full items-center rounded-xl px-4 py-3 transition-all ${
                  activeSection === item.id
                    ? "bg-gray-800 bg-opacity-70 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:bg-opacity-40 hover:text-white"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
