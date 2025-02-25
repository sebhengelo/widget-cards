"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

export function ChapterSidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-4">Chapters</h2>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Chapter
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="text-sm text-muted-foreground">
            No chapters yet. Click the button above to add your first chapter.
          </div>
        </div>
      </ScrollArea>
    </div>
  )
} 