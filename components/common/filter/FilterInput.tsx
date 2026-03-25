"use client"

import React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type FilterInputProps = {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

/**
 * Self-contained search input for filter bars. Reports value to parent via onChange.
 */
function FilterInput({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: FilterInputProps) {
  return (
    <div className={cn("relative flex-1 min-w-[200px]", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
      <Input
        className={cn(
          "h-10! w-full rounded-lg  pl-10 pr-4 text-gray-700 placeholder:text-gray-400",
          "focus-visible:border-border focus-visible:ring-border focus-visible:ring-2 bg-gray-100"
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default FilterInput
