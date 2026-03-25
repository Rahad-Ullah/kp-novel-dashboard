"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type FilterSelectProps = {
  placeholder?: string
  options: string[]
  value: string
  onValueChange: (value: string) => void
  className?: string
  width?: "sm" | "md" | "lg"
}

const widthClasses = {
  sm: "w-[120px]",
  md: "w-[160px]",
  lg: "w-[180px]",
}

/**
 * Self-contained select for filter bars. Reports selected value to parent via onValueChange.
 */
function FilterSelect({
  placeholder = "Select...",
  options,
  value,
  onValueChange,
  className,
  width = "md",
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "h-10! rounded-lg border border-border bg-gray-100 text-zinc-300 cursor-pointer",
          "focus:ring-border",
          widthClasses[width],
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterSelect
