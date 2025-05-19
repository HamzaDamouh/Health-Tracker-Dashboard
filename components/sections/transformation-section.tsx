"use client"

import { useState } from "react"
import { LineChart, Upload, Ruler } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TransformationSection() {
  const [weight, setWeight] = useState<number>(185)
  const [measurements, setMeasurements] = useState({
    waist: 34,
    chest: 42,
    arms: 15,
    thighs: 24,
  })

  // Mock weight history data
  const weightHistory = [
    { date: "Jan", weight: 195 },
    { date: "Feb", weight: 192 },
    { date: "Mar", weight: 190 },
    { date: "Apr", weight: 188 },
    { date: "May", weight: 185 },
    { date: "Jun", weight: 183 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Transformation</h2>
        <span className="text-sm text-gray-400">Progress Tracking</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card gradient>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-blue-400" />
              Current Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-white">{weight} lbs</div>
                <div className="text-sm text-green-400">-10 lbs since January</div>
              </div>
              <div className="flex">
                <button
                  onClick={() => setWeight(weight - 0.5)}
                  className="rounded-l-md bg-gray-800 px-3 py-1 text-gray-300 hover:bg-gray-700"
                >
                  -
                </button>
                <button
                  onClick={() => setWeight(weight + 0.5)}
                  className="rounded-r-md bg-gray-800 px-3 py-1 text-gray-300 hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5 text-purple-400" />
              Progress Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-800 p-6">
              <Upload className="mb-2 h-8 w-8 text-gray-500" />
              <p className="text-sm text-gray-400">Upload your latest progress photo</p>
              <button className="mt-3 rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
                Upload
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weight History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <div className="flex h-full items-end justify-between">
              {weightHistory.map((entry, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-10 rounded-t-md bg-gradient-to-t from-blue-600 to-purple-600"
                    style={{
                      height: `${((entry.weight - 180) / 20) * 180}px`,
                    }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-400">{entry.date}</div>
                  <div className="text-xs font-medium text-white">{entry.weight}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ruler className="mr-2 h-5 w-5 text-yellow-400" />
            Body Measurements (inches)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Object.entries(measurements).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-gray-800 p-4 text-center">
                <div className="text-sm capitalize text-gray-400">{key}</div>
                <div className="text-xl font-bold text-white">{value}"</div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-md bg-gray-800 py-2 text-sm font-medium text-white hover:bg-gray-700">
            Update Measurements
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
