"use client"

import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { icons } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
  disabled?: boolean
}

type IconKey = keyof typeof icons

export function IconPicker({ value, onChange, disabled }: IconPickerProps) {
  const [search, setSearch] = useState('')
  
  const Icon = icons[value as IconKey] || icons.Info

  const filteredIcons = Object.entries(icons)
    .filter(([name]) => 
      name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-[40px] h-[40px]"
          disabled={disabled}
        >
          <Icon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="p-2 border-b">
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
        </div>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-6 gap-2 p-2">
            {filteredIcons.map(([name, Icon]) => (
              <Button
                key={name}
                variant="ghost"
                size="icon"
                className={cn(
                  'h-10 w-10',
                  value === name && 'bg-muted'
                )}
                onClick={() => {
                  onChange(name)
                  setSearch('')
                }}
              >
                <Icon className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 