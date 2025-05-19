import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function MealsSection() {
  const meals = [
    {
      id: 1,
      name: "Breakfast",
      time: "07:30",
      description: "Oatmeal with berries and nuts",
      macros: {
        protein: 15,
        carbs: 45,
        fats: 12,
      },
    },
    {
      id: 2,
      name: "Lunch",
      time: "12:30",
      description: "Grilled chicken salad with avocado",
      macros: {
        protein: 35,
        carbs: 20,
        fats: 18,
      },
    },
    {
      id: 3,
      name: "Snack",
      time: "15:30",
      description: "Greek yogurt with honey",
      macros: {
        protein: 18,
        carbs: 24,
        fats: 5,
      },
    },
    {
      id: 4,
      name: "Dinner",
      time: "19:00",
      description: "Salmon with roasted vegetables",
      macros: {
        protein: 30,
        carbs: 25,
        fats: 15,
      },
    },
  ]

  // Calculate total macros
  const totalMacros = meals.reduce(
    (acc, meal) => {
      acc.protein += meal.macros.protein
      acc.carbs += meal.macros.carbs
      acc.fats += meal.macros.fats
      return acc
    },
    { protein: 0, carbs: 0, fats: 0 },
  )

  // Calculate calories (rough estimate)
  const calories = totalMacros.protein * 4 + totalMacros.carbs * 4 + totalMacros.fats * 9

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Meals</h2>
        <span className="text-sm text-gray-400">Today</span>
      </div>

      <Card gradient>
        <CardHeader>
          <CardTitle>Daily Nutrition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-center">
            <div className="text-3xl font-bold text-white">{calories}</div>
            <div className="text-sm text-gray-400">calories</div>
          </div>
          <div className="space-y-3">
            <Progress value={totalMacros.protein} max={150} label="Protein" color="pink" showValue size="md" />
            <Progress value={totalMacros.carbs} max={200} label="Carbs" color="blue" showValue size="md" />
            <Progress value={totalMacros.fats} max={80} label="Fats" color="orange" showValue size="md" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {meals.map((meal) => (
          <Card key={meal.id} className="hover:border-gray-700 hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{meal.name}</h3>
                  <p className="text-sm text-gray-400">{meal.time}</p>
                </div>
                <button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-300">{meal.description}</p>
              <div className="mt-3 flex space-x-2">
                <span className="rounded-full bg-pink-500 bg-opacity-20 px-2 py-1 text-xs font-medium text-pink-400">
                  {meal.macros.protein}g protein
                </span>
                <span className="rounded-full bg-blue-500 bg-opacity-20 px-2 py-1 text-xs font-medium text-blue-400">
                  {meal.macros.carbs}g carbs
                </span>
                <span className="rounded-full bg-orange-500 bg-opacity-20 px-2 py-1 text-xs font-medium text-orange-400">
                  {meal.macros.fats}g fats
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700">
          Add Meal
        </button>
      </div>
    </div>
  )
}
