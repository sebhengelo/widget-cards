"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

// Add all icons to the library
library.add(fas, far, fab)

interface IconPickerProps {
  value: string
  onChange: (value: string) => void
}

// Define icon categories
const iconCategories = [
  { name: "Solid", prefix: "fas" },
  { name: "Regular", prefix: "far" },
  { name: "Brands", prefix: "fab" }
];

// Pre-defined common icons for quick access
const commonIcons = [
  { prefix: "fas" as IconPrefix, iconName: "circle-info" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "check" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "xmark" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "user" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "home" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "envelope" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "phone" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "calendar" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "clock" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "star" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "heart" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "bell" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "cog" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "search" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "arrow-right" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "arrow-left" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "arrow-up" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "arrow-down" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "plus" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "minus" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "circle-exclamation" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "circle-check" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "circle-xmark" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "thumbs-up" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "thumbs-down" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "file" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "folder" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "image" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "video" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "music" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "facebook" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "twitter" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "instagram" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "linkedin" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "youtube" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "github" as IconName },
];

// Additional icons by category
const solidIcons = [
  { prefix: "fas" as IconPrefix, iconName: "address-book" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "address-card" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "adjust" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "align-center" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "align-justify" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "align-left" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "align-right" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "anchor" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "archive" as IconName },
  { prefix: "fas" as IconPrefix, iconName: "at" as IconName },
];

const regularIcons = [
  { prefix: "far" as IconPrefix, iconName: "address-book" as IconName },
  { prefix: "far" as IconPrefix, iconName: "address-card" as IconName },
  { prefix: "far" as IconPrefix, iconName: "bell" as IconName },
  { prefix: "far" as IconPrefix, iconName: "bookmark" as IconName },
  { prefix: "far" as IconPrefix, iconName: "calendar" as IconName },
  { prefix: "far" as IconPrefix, iconName: "calendar-alt" as IconName },
  { prefix: "far" as IconPrefix, iconName: "chart-bar" as IconName },
  { prefix: "far" as IconPrefix, iconName: "check-circle" as IconName },
  { prefix: "far" as IconPrefix, iconName: "check-square" as IconName },
  { prefix: "far" as IconPrefix, iconName: "circle" as IconName },
];

const brandIcons = [
  { prefix: "fab" as IconPrefix, iconName: "500px" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "accessible-icon" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "accusoft" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "acquisitions-incorporated" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "adn" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "adobe" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "adversal" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "affiliatetheme" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "airbnb" as IconName },
  { prefix: "fab" as IconPrefix, iconName: "algolia" as IconName },
];

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string>(value || "")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  
  // Parse the icon string into prefix and name
  const getIconDetails = (iconString: string): { prefix: IconPrefix, iconName: IconName } => {
    if (!iconString) return { prefix: "fas" as IconPrefix, iconName: "circle-info" as IconName }
    
    const parts = iconString.split(" ")
    if (parts.length !== 2) return { prefix: "fas" as IconPrefix, iconName: "circle-info" as IconName }
    
    // Handle fa- prefix in the iconName part
    let iconName = parts[1]
    if (iconName.startsWith("fa-")) {
      iconName = iconName.substring(3)
    }
    
    return {
      prefix: parts[0] as IconPrefix,
      iconName: iconName as IconName
    }
  }
  
  const iconDetails = getIconDetails(selectedIcon)
  
  const handleIconSelect = (prefix: IconPrefix, iconName: IconName) => {
    const iconString = `${prefix} fa-${iconName}`
    setSelectedIcon(iconString)
    onChange(iconString)
    setOpen(false)
  }

  // Get all available icons
  const getAllIcons = () => {
    const allIcons = [...commonIcons];
    
    if (activeCategory === "All" || activeCategory === "Solid") {
      allIcons.push(...solidIcons);
    }
    
    if (activeCategory === "All" || activeCategory === "Regular") {
      allIcons.push(...regularIcons);
    }
    
    if (activeCategory === "All" || activeCategory === "Brands") {
      allIcons.push(...brandIcons);
    }
    
    return allIcons;
  };

  // Filter icons based on search query
  const filteredIcons = searchQuery 
    ? getAllIcons().filter(icon => 
        icon.iconName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        (activeCategory === "All" || icon.prefix === iconCategories.find(cat => cat.name === activeCategory)?.prefix)
      )
    : activeCategory === "All" 
      ? commonIcons 
      : activeCategory === "Solid"
        ? solidIcons
        : activeCategory === "Regular"
          ? regularIcons
          : brandIcons;

  // Limit to 100 results for performance
  const displayIcons = filteredIcons.slice(0, 100);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left font-normal h-auto py-2"
        >
          {selectedIcon ? (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon 
                icon={[iconDetails.prefix, iconDetails.iconName]} 
                className="h-5 w-5" 
              />
              <span>{selectedIcon}</span>
            </div>
          ) : (
            <span>Select an icon</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <div className="p-2 border-b">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex border-b">
          <Button 
            variant={activeCategory === "All" ? "default" : "ghost"} 
            size="sm" 
            className="flex-1 rounded-none"
            onClick={() => setActiveCategory("All")}
          >
            All
          </Button>
          {iconCategories.map(category => (
            <Button 
              key={category.name}
              variant={activeCategory === category.name ? "default" : "ghost"} 
              size="sm" 
              className="flex-1 rounded-none"
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-6 gap-2 p-2">
            {displayIcons.map((icon, index) => (
              <Button
                key={`${icon.prefix}-${icon.iconName}-${index}`}
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => handleIconSelect(icon.prefix, icon.iconName)}
                title={icon.iconName}
              >
                <FontAwesomeIcon 
                  icon={[icon.prefix, icon.iconName]} 
                  className="h-5 w-5" 
                />
              </Button>
            ))}
            {displayIcons.length === 0 && (
              <div className="col-span-6 p-4 text-center text-muted-foreground">
                No icons found. Try a different search term.
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 