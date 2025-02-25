"use client"

import { Card } from "@/components/ui/card"

export function Container11Widget() {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-accent/20 rounded-lg p-4 text-center">
          Column 1
        </div>
        <div className="bg-accent/20 rounded-lg p-4 text-center">
          Column 2
        </div>
      </div>
    </Card>
  )
}

export function Container21Widget() {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-accent/20 rounded-lg p-4 text-center">
          Column 1 (2/3)
        </div>
        <div className="bg-accent/20 rounded-lg p-4 text-center">
          Column 2 (1/3)
        </div>
      </div>
    </Card>
  )
}

export function Container12Widget() {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-accent/20 rounded-lg p-4 text-center">
          Column 1 (1/3)
        </div>
        <div className="col-span-2 bg-accent/20 rounded-lg p-4 text-center">
          Column 2 (2/3)
        </div>
      </div>
    </Card>
  )
}

export function Container111Widget() {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-accent/20 rounded-lg p-4 text-center">
          Column 1
        </div>
        <div className="bg-accent/20 rounded-lg p-4 text-center">
          Column 2
        </div>
        <div className="bg-accent/20 rounded-lg p-4 text-center">
          Column 3
        </div>
      </div>
    </Card>
  )
} 