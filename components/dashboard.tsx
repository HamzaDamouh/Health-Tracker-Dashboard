"use client"

import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import Sidebar from "@/components/sidebar"
import BottomNav from "@/components/bottom-nav"
import SleepSection from "@/components/sections/sleep-section"
import MealsSection from "@/components/sections/meals-section"
import WorkoutsSection from "@/components/sections/workouts-section"
import TransformationSection from "@/components/sections/transformation-section"
import MentalHealthSection from "@/components/sections/mental-health-section"

export type Section = "sleep" | "meals" | "workouts" | "transformation" | "mental"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("sleep")
  const isMobile = useIsMobile()

  const renderSection = () => {
    switch (activeSection) {
      case "sleep":
        return <SleepSection />
      case "meals":
        return <MealsSection />
      case "workouts":
        return <WorkoutsSection />
      case "transformation":
        return <TransformationSection />
      case "mental":
        return <MentalHealthSection />
      default:
        return <SleepSection />
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
      {!isMobile && <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />}
      <main className="flex-1 overflow-auto pb-20 md:pb-0 md:pl-64">
        <div className="container mx-auto max-w-4xl p-4 md:p-6">{renderSection()}</div>
      </main>
      {isMobile && <BottomNav activeSection={activeSection} setActiveSection={setActiveSection} />}
    </div>
  )
}
