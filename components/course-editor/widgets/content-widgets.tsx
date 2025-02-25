"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { WidgetCard } from "../widget-card"
import { IconPicker } from "../../course-editor/icon-picker"
import { RichTextEditor } from '../rich-text-editor'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { icons } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface IconWidgetProps {
  icon?: string
  text?: string
  iconSize?: number
  iconColor?: string
  backgroundColor?: string
  textColor?: string
  layout?: 'left' | 'top' | 'right' | 'bottom'
  onUpdate?: (data: {
    icon: string
    text: string
    iconSize: number
    iconColor: string
    backgroundColor: string
    textColor: string
    layout: 'left' | 'top' | 'right' | 'bottom'
  }) => void
}

const iconSizes = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
} as const

type IconKey = keyof typeof icons
type Layout = NonNullable<IconWidgetProps['layout']>

export function IconWidget({
  icon = 'Info',
  text = 'Icons are a powerful way to enhance your content. They can help guide attention, provide visual cues, and make your content more engaging. This icon widget allows you to combine meaningful icons with descriptive text.',
  iconSize = 48,
  iconColor = '#2563eb',
  backgroundColor = '#f0f7ff',
  textColor = '#000000',
  layout = 'left',
  onUpdate
}: IconWidgetProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(icon)
  const [content, setContent] = useState(text)
  const [currentIconSize, setCurrentIconSize] = useState(iconSize)
  const [currentIconColor, setCurrentIconColor] = useState(iconColor)
  const [currentBgColor, setCurrentBgColor] = useState(backgroundColor)
  const [currentTextColor, setCurrentTextColor] = useState(textColor)
  const [currentLayout, setCurrentLayout] = useState<Layout>(layout)

  const handleSave = () => {
    onUpdate?.({
      icon: selectedIcon,
      text: content,
      iconSize: currentIconSize,
      iconColor: currentIconColor,
      backgroundColor: currentBgColor,
      textColor: currentTextColor,
      layout: currentLayout
    })
    setIsEditing(false)
  }

  const Icon = icons[selectedIcon as IconKey] || icons.Info

  const containerStyles = {
    backgroundColor: currentBgColor,
    color: currentTextColor,
    minHeight: 'fit-content',
    height: '100%',
    width: '100%',
    transition: 'background-color 0.2s ease',
  }

  const contentStyles = {
    display: 'flex',
    gap: '1rem',
    padding: '2rem 1rem',
    flexDirection: currentLayout === 'top' || currentLayout === 'bottom' ? 'column' : 'row',
    alignItems: currentLayout === 'top' || currentLayout === 'bottom' ? 'center' : 'flex-start',
    height: '100%',
    width: '100%',
    ...(currentLayout === 'right' && { flexDirection: 'row-reverse' }),
    ...(currentLayout === 'bottom' && { flexDirection: 'column-reverse' }),
  }

  return (
    <WidgetCard onEdit={() => setIsEditing(true)}>
      <div style={containerStyles} className="overflow-hidden">
        <div style={contentStyles as React.CSSProperties}>
          <div className="flex-shrink-0 flex items-center justify-center">
            <Icon
              style={{ color: currentIconColor }}
              width={currentIconSize}
              height={currentIconSize}
            />
          </div>
          <div
            className="flex-grow prose prose-sm max-w-none"
            style={{ color: 'inherit' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Icon Widget</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label className="block mb-2">Icon</Label>
                <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Icon Size</Label>
              <Select
                value={currentIconSize.toString()}
                onValueChange={(value: string) => setCurrentIconSize(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(iconSizes).map(([size, value]) => (
                    <SelectItem key={size} value={value.toString()}>
                      {size.toUpperCase()} - {value}px
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Layout</Label>
              <Select
                value={currentLayout}
                onValueChange={(value: Layout) => setCurrentLayout(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Icon Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={currentIconColor}
                    onChange={(e) => setCurrentIconColor(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={currentBgColor === 'transparent' ? '#ffffff' : currentBgColor}
                    onChange={(e) => setCurrentBgColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={currentTextColor}
                    onChange={(e) => setCurrentTextColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </WidgetCard>
  )
}

export function TextWidget() {
  return (
    <Card className="p-4">
      <h3 className="text-xl font-semibold mb-2">Sample Text Content</h3>
      <p className="text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </Card>
  )
}

export function TableWidget() {
  return (
    <Card className="p-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Header 1</th>
            <th className="text-left p-2">Header 2</th>
            <th className="text-left p-2">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Row 1, Cell 1</td>
            <td className="p-2">Row 1, Cell 2</td>
            <td className="p-2">Row 1, Cell 3</td>
          </tr>
          <tr className="border-b">
            <td className="p-2">Row 2, Cell 1</td>
            <td className="p-2">Row 2, Cell 2</td>
            <td className="p-2">Row 2, Cell 3</td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}

export function ImageWidget() {
  return (
    <Card className="p-4">
      <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Sample Image Placeholder</span>
      </div>
    </Card>
  )
}

export function VideoWidget() {
  return (
    <Card className="p-4">
      <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Sample Video Player</span>
      </div>
    </Card>
  )
}

export function HtmlWidget() {
  return (
    <Card className="p-4">
      <div className="prose prose-sm max-w-none">
        <h1>HTML Sample</h1>
        <p>This is a sample of <strong>HTML</strong> content with some <em>formatting</em>.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </div>
    </Card>
  )
} 