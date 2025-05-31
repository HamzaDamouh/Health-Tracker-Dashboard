"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UtensilsCrossed, Camera, Check, Clock } from "lucide-react"

export function MealsTracking() {
  const [completedMeals, setCompletedMeals] = useState<string[]>([])

  const meals = [
    {
      id: "breakfast",
      name: "Breakfast/Post-Workout Smoothie",
      time: "7:00 AM",
      ingredients: ["250ml milk", "30g oats", "2 scoops protein powder", "100g blueberries"],
      macros: { protein: 45, carbs: 52, fats: 8, calories: 445 },
      icon: "🥤",
    },
    {
      id: "lunch",
      name: "Lunch",
      time: "12:30 PM",
      ingredients: ["2 cans sardines", "4 eggs"],
      macros: { protein: 52, carbs: 2, fats: 28, calories: 456 },
      icon: "🐟",
    },
    {
      id: "dinner",
      name: "Dinner",
      time: "6:30 PM",
      ingredients: ["200g chicken breast", "200g rice", "100g broccoli", "Peppers & shallots", "30g olive oil"],
      macros: { protein: 55, carbs: 72, fats: 32, calories: 748 },
      icon: "🍗",
    },
    {
      id: "bedtime",
      name: "Before Bed",
      time: "9:30 PM",
      ingredients: ["Greek yogurt (20g protein)"],
      macros: { protein: 20, carbs: 6, fats: 0, calories: 104 },
      icon: "🥛",
    },
  ]

  const toggleMealCompletion = (mealId: string) => {
    setCompletedMeals((prev) => (prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]))
  }

  const totalMacros = meals.reduce(
    (total, meal) => {
      if (completedMeals.includes(meal.id)) {
        return {
          protein: total.protein + meal.macros.protein,
          carbs: total.carbs + meal.macros.carbs,
          fats: total.fats + meal.macros.fats,
          calories: total.calories + meal.macros.calories,
        }
      }
      return total
    },
    { protein: 0, carbs: 0, fats: 0, calories: 0 },
  )

  const completionPercentage = (completedMeals.length / meals.length) * 100

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <UtensilsCrossed className="h-8 w-8 text-green-400" />
          Meals Tracking
        </h1>
        <p className="text-slate-400">Track your daily nutrition and meal completion</p>
      </div>

      {/* Daily Progress */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Daily Progress</span>
            <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
              {completedMeals.length}/{meals.length} meals
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Meal Completion</span>
              <span className="text-green-400">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3 bg-slate-800" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-400">Protein</p>
              <p className="text-xl font-bold text-blue-300">{totalMacros.protein}g</p>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-400">Carbs</p>
              <p className="text-xl font-bold text-green-300">{totalMacros.carbs}g</p>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-400">Fats</p>
              <p className="text-xl font-bold text-yellow-300">{totalMacros.fats}g</p>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-400">Calories</p>
              <p className="text-xl font-bold text-purple-300">{totalMacros.calories}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Cards */}
      <div className="space-y-4">
        {meals.map((meal) => {
          const isCompleted = completedMeals.includes(meal.id)

          return (
            <Card
              key={meal.id}
              className={`bg-slate-900/50 border-slate-800 backdrop-blur-sm transition-all ${
                isCompleted ? "ring-2 ring-green-500/50 bg-green-900/20" : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{meal.icon}</span>
                    <div>
                      <h3 className="text-lg">{meal.name}</h3>
                      <p className="text-sm text-slate-400 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meal.time}
                      </p>
                    </div>
                  </div>
                  {isCompleted && (
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      <Check className="h-4 w-4 mr-1" />
                      Completed
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ingredients */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-600">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Macros */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-slate-800/30 rounded">
                    <p className="text-xs text-slate-400">Protein</p>
                    <p className="font-semibold text-blue-300">{meal.macros.protein}g</p>
                  </div>
                  <div className="p-2 bg-slate-800/30 rounded">
                    <p className="text-xs text-slate-400">Carbs</p>
                    <p className="font-semibold text-green-300">{meal.macros.carbs}g</p>
                  </div>
                  <div className="p-2 bg-slate-800/30 rounded">
                    <p className="text-xs text-slate-400">Fats</p>
                    <p className="font-semibold text-yellow-300">{meal.macros.fats}g</p>
                  </div>
                  <div className="p-2 bg-slate-800/30 rounded">
                    <p className="text-xs text-slate-400">Calories</p>
                    <p className="font-semibold text-purple-300">{meal.macros.calories}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                  <Button
                    onClick={() => toggleMealCompletion(meal.id)}
                    className={`flex-1 ${
                      isCompleted
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                    } border-0`}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Mark as Eaten"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
