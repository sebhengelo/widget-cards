"use client"

import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function SingleSelectWidget() {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Sample Single Choice Question</h3>
      <p className="text-muted-foreground mb-4">What is the capital of France?</p>
      <RadioGroup defaultValue="paris">
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="london" id="london" />
          <Label htmlFor="london">London</Label>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="paris" id="paris" />
          <Label htmlFor="paris">Paris</Label>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="berlin" id="berlin" />
          <Label htmlFor="berlin">Berlin</Label>
        </div>
      </RadioGroup>
    </Card>
  )
}

export function MultiSelectWidget() {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Sample Multiple Choice Question</h3>
      <p className="text-muted-foreground mb-4">Which of these are programming languages?</p>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="python" defaultChecked />
          <Label htmlFor="python">Python</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="java" />
          <Label htmlFor="java">Java</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="html" />
          <Label htmlFor="html">HTML</Label>
        </div>
      </div>
    </Card>
  )
}

export function DragDropWidget() {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Sample Drag and Drop Question</h3>
      <p className="text-muted-foreground mb-4">Match the countries with their capitals</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="p-2 bg-accent rounded">France</div>
          <div className="p-2 bg-accent rounded">Germany</div>
          <div className="p-2 bg-accent rounded">Spain</div>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-accent rounded">Paris</div>
          <div className="p-2 bg-accent rounded">Berlin</div>
          <div className="p-2 bg-accent rounded">Madrid</div>
        </div>
      </div>
    </Card>
  )
}

export function OpenQuestionWidget() {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Sample Open Question</h3>
      <p className="text-muted-foreground mb-4">Explain the concept of object-oriented programming.</p>
      <Input placeholder="Type your answer here..." className="min-h-[100px]" />
    </Card>
  )
} 