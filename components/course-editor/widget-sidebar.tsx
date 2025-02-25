"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Table, Image as ImageIcon, Video, Code, CheckSquare, ListChecks, ArrowLeftRight, Type, Layout, LayoutPanelLeft, LayoutPanelTop, LayoutGrid, AlertCircle } from "lucide-react"
import type { WidgetItem } from "./types"

const contentWidgets: WidgetItem[] = [
  { name: "Text", icon: <FileText className="h-5 w-5" />, description: "Add formatted text content", type: "text" },
  { name: "Table", icon: <Table className="h-5 w-5" />, description: "Create data tables", type: "table" },
  { name: "Image", icon: <ImageIcon className="h-5 w-5" />, description: "Insert images", type: "image" },
  { name: "Video", icon: <Video className="h-5 w-5" />, description: "Embed video content", type: "video" },
  { name: "Icon", icon: <AlertCircle className="h-5 w-5" />, description: "Add an icon with optional text", type: "icon" },
  { name: "HTML", icon: <Code className="h-5 w-5" />, description: "Add custom HTML", type: "html" },
]

const questionWidgets: WidgetItem[] = [
  { name: "Single Select", icon: <CheckSquare className="h-5 w-5" />, description: "Single choice question", type: "single-select" },
  { name: "Multi Select", icon: <ListChecks className="h-5 w-5" />, description: "Multiple choice question", type: "multi-select" },
  { name: "Drag and Drop", icon: <ArrowLeftRight className="h-5 w-5" />, description: "Drag and drop interaction", type: "drag-drop" },
  { name: "Open Question", icon: <Type className="h-5 w-5" />, description: "Free text response", type: "open-question" },
]

const containerWidgets: WidgetItem[] = [
  { name: "1:1 Container", icon: <Layout className="h-5 w-5" />, description: "Two equal columns", type: "container-1-1" },
  { name: "2:1 Container", icon: <LayoutPanelLeft className="h-5 w-5" />, description: "Two columns, left wider", type: "container-2-1" },
  { name: "1:2 Container", icon: <LayoutPanelTop className="h-5 w-5" />, description: "Two columns, right wider", type: "container-1-2" },
  { name: "1:1:1 Container", icon: <LayoutGrid className="h-5 w-5" />, description: "Three equal columns", type: "container-1-1-1" },
]

function WidgetCategory({ title, items }: { title: string; items: WidgetItem[] }) {
  const handleDragStart = (e: React.DragEvent, widget: WidgetItem) => {
    console.log("Starting drag for widget:", widget.name)
    
    // Create a new object without the icon property
    const widgetWithoutIcon = {
      name: widget.name,
      description: widget.description,
      type: widget.type
    }
    const data = JSON.stringify(widgetWithoutIcon)
    console.log("Setting drag data:", data)
    
    e.dataTransfer.setData("application/json", data)
    e.dataTransfer.effectAllowed = "copy"
    
    // Add a visual drag image
    const dragPreview = document.createElement("div")
    dragPreview.className = "bg-background border rounded-lg p-2 shadow-lg"
    dragPreview.textContent = widget.name
    document.body.appendChild(dragPreview)
    e.dataTransfer.setDragImage(dragPreview, 0, 0)
    setTimeout(() => document.body.removeChild(dragPreview), 0)
  }

  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="px-4">{title}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2 p-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent cursor-grab active:cursor-grabbing"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item)}
            >
              {item.icon}
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export function WidgetSidebar() {
  return (
    <div className="h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Widgets</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-57px)]">
        <Accordion type="multiple" defaultValue={["Content Widgets", "Question Widgets", "Containers"]}>
          <WidgetCategory title="Content Widgets" items={contentWidgets} />
          <WidgetCategory title="Question Widgets" items={questionWidgets} />
          <WidgetCategory title="Containers" items={containerWidgets} />
        </Accordion>
      </ScrollArea>
    </div>
  )
} 