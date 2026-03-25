"use client"

import React from "react"
import { cn } from "@/lib/utils"
import FilterInput from "./FilterInput"
import FilterSelect from "./FilterSelect"

export type FilterSelectConfig = {
    placeholder?: string
    options: string[]
    value: string
    onValueChange: (value: string) => void
    width?: "sm" | "md" | "lg"
}

export type FilterSearchProps = {
    /** Search field config. When provided, a search input is rendered. */
    search?: {
        placeholder?: string
        value: string
        onChange: (value: string) => void
    }
    /** Select dropdowns. Each item is rendered as a FilterSelect. */
    selects?: FilterSelectConfig[]
    /** Extra content (e.g. buttons) rendered after search and selects. */
    children?: React.ReactNode
    className?: string
}

/**
 * Presentational filter bar. Parent passes config via props (search placeholder/value/onChange,
 * select placeholders/options/value/onValueChange). This component only renders layout and
 * delegates to FilterInput and FilterSelect.
 */
function FilterSearch({ search, selects = [], children, className }: FilterSearchProps) {
    return (
        <div
            className={cn(
                "flex flex-wrap items-center gap-3 w-full rounded-2xl border border-border bg-white  px-4 py-3",
                className
            )}
        >
            {search && (
                <FilterInput
                    placeholder={search.placeholder}
                    value={search.value}
                    onChange={search.onChange}
                />
            )}
            {selects.map((sel, index) => (
                <FilterSelect
                    key={index}
                    placeholder={sel.placeholder}
                    options={sel.options}
                    value={sel.value}
                    onValueChange={sel.onValueChange}
                    width={sel.width}
                />
            ))}
            {children}
        </div>
    )
}

export default FilterSearch
