"use client"

import { ChapterSidebar } from "./chapter-sidebar"
import { EditorCanvas } from "./editor-canvas"
import { WidgetSidebar } from "./widget-sidebar"

export function CourseEditor() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Chapters */}
      <div className="w-64 border-r border-border">
        <ChapterSidebar />
      </div>

      {/* Main Canvas */}
      <div className="flex-1">
        <EditorCanvas />
      </div>

      {/* Right Sidebar - Widgets */}
      <div className="w-80 border-l border-border">
        <WidgetSidebar />
      </div>
    </div>
  )
} 