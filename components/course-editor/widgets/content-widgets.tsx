"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { WidgetCard } from "../widget-card"
import { IconPicker } from "../../course-editor/icon-picker"
import { RichTextEditor } from '../rich-text-editor'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core"

// Add all icons to the library
library.add(fas, far, fab)

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

export function IconWidget({
  icon = "fas fa-circle-info",
  text = "This is an icon widget with some text next to it. You can edit this text and change the icon.",
  iconSize = 24,
  iconColor = "#3b82f6",
  backgroundColor = "#dbeafe",
  textColor = "#000000",
  layout = "left",
  onUpdate
}: IconWidgetProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(icon)
  const [iconText, setIconText] = useState(text)
  const [currentIconSize, setCurrentIconSize] = useState(iconSize)
  const [currentIconColor, setCurrentIconColor] = useState(iconColor)
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(backgroundColor)
  const [currentTextColor, setCurrentTextColor] = useState(textColor)
  const [currentLayout, setCurrentLayout] = useState<'left' | 'top' | 'right' | 'bottom'>(layout)

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        icon: selectedIcon,
        text: iconText,
        iconSize: currentIconSize,
        iconColor: currentIconColor,
        backgroundColor: currentBackgroundColor,
        textColor: currentTextColor,
        layout: currentLayout
      })
    }
    setIsEditing(false)
  }

  const containerStyles = {
    backgroundColor: currentBackgroundColor,
    color: currentTextColor,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }

  const contentStyles = {
    display: 'flex' as const,
    gap: '1rem',
    padding: '2rem 1rem',
    flexDirection: currentLayout === 'top' || currentLayout === 'bottom' 
      ? 'column' as const 
      : 'row' as const,
    alignItems: currentLayout === 'top' || currentLayout === 'bottom' 
      ? 'center' as const 
      : 'flex-start' as const,
    height: '100%',
    width: '100%',
    ...(currentLayout === 'right' && { flexDirection: 'row-reverse' as const }),
    ...(currentLayout === 'bottom' && { flexDirection: 'column-reverse' as const }),
  }

  // Parse the icon string into prefix and name
  const getIconDetails = (iconString: string) => {
    if (!iconString) return { prefix: "fas", iconName: "circle-info" }
    
    const parts = iconString.split(" ")
    if (parts.length !== 2) return { prefix: "fas", iconName: "circle-info" }
    
    // Handle fa- prefix in the iconName part
    let iconName = parts[1]
    if (iconName.startsWith("fa-")) {
      iconName = iconName.substring(3)
    }
    
    return {
      prefix: parts[0],
      iconName: iconName
    }
  }
  
  const iconDetails = getIconDetails(selectedIcon)

  // Function to safely render the icon
  const renderIcon = () => {
    try {
      return (
        <FontAwesomeIcon 
          icon={[iconDetails.prefix as IconPrefix, iconDetails.iconName as IconName]} 
          style={{ width: `${currentIconSize}px`, height: `${currentIconSize}px` }}
        />
      )
    } catch (error) {
      console.error("Error rendering icon:", error)
      return (
        <FontAwesomeIcon 
          icon={["fas" as IconPrefix, "circle-info" as IconName]} 
          style={{ width: `${currentIconSize}px`, height: `${currentIconSize}px` }}
        />
      )
    }
  }

  return (
    <WidgetCard onEdit={() => setIsEditing(true)}>
      <div style={containerStyles} className="overflow-hidden">
        <div style={contentStyles}>
          <div style={{ 
            fontSize: `${currentIconSize}px`, 
            color: currentIconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {renderIcon()}
          </div>
          <div style={{ flex: 1 }} dangerouslySetInnerHTML={{ __html: iconText }} />
        </div>
      </div>

      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Icon Widget</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="icon">Icon</Label>
              <IconPicker 
                value={selectedIcon} 
                onChange={setSelectedIcon} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="iconSize">Icon Size</Label>
              <Input 
                id="iconSize" 
                type="number" 
                value={currentIconSize} 
                onChange={(e) => setCurrentIconSize(Number(e.target.value))} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="iconColor">Icon Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="iconColor" 
                  type="color" 
                  value={currentIconColor} 
                  onChange={(e) => setCurrentIconColor(e.target.value)} 
                  className="w-12 p-1 h-10"
                />
                <Input 
                  type="text" 
                  value={currentIconColor} 
                  onChange={(e) => setCurrentIconColor(e.target.value)} 
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="backgroundColor" 
                  type="color" 
                  value={currentBackgroundColor} 
                  onChange={(e) => setCurrentBackgroundColor(e.target.value)} 
                  className="w-12 p-1 h-10"
                />
                <Input 
                  type="text" 
                  value={currentBackgroundColor} 
                  onChange={(e) => setCurrentBackgroundColor(e.target.value)} 
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="textColor" 
                  type="color" 
                  value={currentTextColor} 
                  onChange={(e) => setCurrentTextColor(e.target.value)} 
                  className="w-12 p-1 h-10"
                />
                <Input 
                  type="text" 
                  value={currentTextColor} 
                  onChange={(e) => setCurrentTextColor(e.target.value)} 
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="layout">Layout</Label>
              <Select 
                value={currentLayout} 
                onValueChange={(value) => setCurrentLayout(value as 'left' | 'top' | 'right' | 'bottom')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Icon Left</SelectItem>
                  <SelectItem value="right">Icon Right</SelectItem>
                  <SelectItem value="top">Icon Top</SelectItem>
                  <SelectItem value="bottom">Icon Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="text">Text Content</Label>
              <RichTextEditor 
                content={iconText} 
                onChange={setIconText} 
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleSave}>Save Changes</Button>
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