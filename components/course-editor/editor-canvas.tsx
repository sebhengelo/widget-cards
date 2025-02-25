"use client"

import { useState } from "react"
import type { DroppedWidget } from "./types"
import { cn } from "@/lib/utils"
import { TextWidget, TableWidget, ImageWidget, VideoWidget, HtmlWidget, IconWidget } from "./widgets/content-widgets"
import { SingleSelectWidget, MultiSelectWidget, DragDropWidget, OpenQuestionWidget } from "./widgets/question-widgets"
import { Container11Widget, Container21Widget, Container12Widget, Container111Widget } from "./widgets/container-widgets"
import { GripVertical } from "lucide-react"

function WidgetRenderer({ 
  widget, 
  isHovering, 
  onDrop 
}: { 
  widget: DroppedWidget; 
  isHovering: boolean;
  onDrop: (index: number, parentId?: string) => (e: React.DragEvent) => void;
}) {
  const content = () => {
    switch (widget.type) {
      // Content Widgets
      case "text":
        return <TextWidget />
      case "table":
        return <TableWidget />
      case "image":
        return <ImageWidget />
      case "video":
        return <VideoWidget />
      case "icon":
        return <IconWidget />
      case "html":
        return <HtmlWidget />
      
      // Question Widgets
      case "single-select":
        return <SingleSelectWidget />
      case "multi-select":
        return <MultiSelectWidget />
      case "drag-drop":
        return <DragDropWidget />
      case "open-question":
        return <OpenQuestionWidget />
      
      // Container Widgets
      case "container-1-1":
        return <Container11Widget />
      case "container-2-1":
        return <Container21Widget />
      case "container-1-2":
        return <Container12Widget />
      case "container-1-1-1":
        return <Container111Widget />
      
      default:
        return (
          <div className="p-4 rounded-lg border bg-destructive/10 text-destructive">
            Unknown widget type: {widget.type}
          </div>
        )
    }
  }

  return (
    <div className="rounded-lg border bg-card relative">
      {isHovering && (
        <DropZone 
          className="absolute -top-2 left-0 right-0 h-4"
          isInternal
          onDrop={(e) => {
            e.stopPropagation()
            onDrop(0, widget.id)(e)
          }}
        />
      )}
      {content()}
      {isHovering && (
        <DropZone 
          className="absolute -bottom-2 left-0 right-0 h-4"
          isInternal
          onDrop={(e) => {
            e.stopPropagation()
            onDrop(widget.children?.length || 0, widget.id)(e)
          }}
        />
      )}
    </div>
  )
}

interface DropZoneProps {
  onDrop?: (e: React.DragEvent) => void
  className?: string
  children?: React.ReactNode
  isInternal?: boolean
}

function DropZone({ onDrop, className, children, isInternal }: DropZoneProps) {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "copy"
    setIsOver(true)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOver(false)
    onDrop?.(e)
  }

  return (
    <div
      className={cn(
        "transition-all duration-200 relative",
        isOver ? "opacity-100" : isInternal ? "opacity-0" : "opacity-0 group-hover:opacity-100",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <div className={cn(
        "absolute inset-0 rounded border-2 border-primary border-dashed",
        isOver && "bg-primary/10"
      )} />
      {children}
    </div>
  )
}

interface WidgetWrapperProps {
  widget: DroppedWidget
  onDrop: (index: number, parentId?: string) => (e: React.DragEvent) => void
  onDragStart: (widgetId: string) => void
  onDragEnd: () => void
}

function WidgetWrapper({ widget, onDrop, onDragStart, onDragEnd }: WidgetWrapperProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div 
      className="group relative"
      draggable
      onDragStart={(e) => {
        e.stopPropagation()
        onDragStart(widget.id)
      }}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="opacity-0 group-hover:opacity-100 absolute -left-10 top-1/2 -translate-y-1/2 p-2 cursor-grab active:cursor-grabbing">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="relative">
        <WidgetRenderer 
          widget={widget} 
          isHovering={isHovering}
          onDrop={onDrop}
        />
      </div>

      {/* Render children if any */}
      {widget.children && widget.children.length > 0 && (
        <div className="pl-4 border-l mt-2 space-y-2">
          {widget.children.map((child, index) => (
            <div key={child.id} className="space-y-2">
              <WidgetWrapper
                widget={child}
                onDrop={onDrop}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
              <DropZone onDrop={(e) => {
                e.stopPropagation()
                onDrop(index + 1, widget.id)(e)
              }} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function EditorCanvas() {
  const [widgets, setWidgets] = useState<DroppedWidget[]>([])
  const [draggedWidgetId, setDraggedWidgetId] = useState<string | null>(null)

  const findWidgetById = (widgets: DroppedWidget[], id: string): DroppedWidget | null => {
    for (const widget of widgets) {
      if (widget.id === id) return widget
      if (widget.children) {
        const found = findWidgetById(widget.children, id)
        if (found) return found
      }
    }
    return null
  }

  const removeWidgetById = (widgets: DroppedWidget[], id: string): DroppedWidget[] => {
    return widgets.filter(widget => {
      if (widget.id === id) return false
      if (widget.children) {
        widget.children = removeWidgetById(widget.children, id)
      }
      return true
    })
  }

  const handleDrop = (index: number, parentId?: string) => (e: React.DragEvent) => {
    try {
      setWidgets(prev => {
        let targetArray = prev
        if (parentId) {
          const parent = findWidgetById(prev, parentId)
          if (!parent) return prev
          parent.children = parent.children || []
          targetArray = parent.children
        }

        // Handle dropping a new widget from the sidebar
        const jsonData = e.dataTransfer.getData("application/json")
        if (jsonData) {
          const widgetData = JSON.parse(jsonData)
          const newWidget: DroppedWidget = {
            ...widgetData,
            id: crypto.randomUUID(),
            content: ""
          }
          const newWidgets = [...targetArray]
          newWidgets.splice(index, 0, newWidget)
          
          if (parentId) {
            return prev.map(w => w.id === parentId ? { ...w, children: newWidgets } : w)
          }
          return newWidgets
        }

        // Handle reordering existing widgets
        if (draggedWidgetId) {
          const sourceWidget = findWidgetById(prev, draggedWidgetId)
          if (!sourceWidget) return prev

          const withoutSource = removeWidgetById(prev, draggedWidgetId)
          const newWidgets = parentId ? 
            [...targetArray] : 
            [...withoutSource]
          
          newWidgets.splice(index, 0, sourceWidget)

          if (parentId) {
            return withoutSource.map(w => w.id === parentId ? { ...w, children: newWidgets } : w)
          }
          return newWidgets
        }

        return prev
      })
    } catch (error) {
      console.error("Failed to handle widget drop:", error)
    }
  }

  const handleDragStart = (widgetId: string) => {
    setDraggedWidgetId(widgetId)
  }

  const handleDragEnd = () => {
    setDraggedWidgetId(null)
  }

  return (
    <div className="h-full bg-accent/20 p-8">
      <div className="mx-auto max-w-4xl min-h-full bg-background rounded-lg border shadow-sm p-8">
        {widgets.length === 0 ? (
          <DropZone 
            className="h-32 flex items-center justify-center"
            onDrop={handleDrop(0)} 
          >
            <div className="text-center text-muted-foreground">
              Drag and drop widgets here to start building your course
            </div>
          </DropZone>
        ) : (
          <div className="space-y-2">
            <DropZone onDrop={handleDrop(0)} />
            {widgets.map((widget, index) => (
              <div key={widget.id} className="space-y-2">
                <WidgetWrapper
                  widget={widget}
                  onDrop={handleDrop}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
                <DropZone onDrop={handleDrop(index + 1)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 