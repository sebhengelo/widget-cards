"use client"

import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"

interface WidgetCardProps {
  children: React.ReactNode
  onEdit?: () => void
}

export function WidgetCard({ children, onEdit }: WidgetCardProps) {
  return (
    <div className="group relative h-full overflow-hidden">
      <div className="relative h-full">
        {children}
        {onEdit && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onEdit}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
} 