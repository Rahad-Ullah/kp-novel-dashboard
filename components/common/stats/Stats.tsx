import * as React from "react"

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type StatsProps = {
  icon: React.ReactNode
  title: string
  value: string | number
  description?: string
  /** Tailwind background classes, default `bg-white` */
  backgroundColor?: string
  /** Tailwind text classes for title, value, icon (card root) */
  textColor?: string
  /** Tailwind classes for the icon glyph */
  iconColor?: string
  /** Tailwind classes for the icon backdrop */
  iconBackgroundColor?: string
  className?: string
}

export default function Stats({
  icon,
  title,
  value,
  description,
  backgroundColor = "bg-white",
  textColor,
  iconColor,
  iconBackgroundColor = "bg-muted/50",
  className,
}: StatsProps) {
  return (
    <Card
      className={cn(
        "gap-3 rounded-lg border-0 shadow-none ring-0",
        backgroundColor,
        textColor,
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-bold leading-snug flex flex-col  gap-2">
          {title}
          <span className="text-2xl font-bold tabular-nums tracking-tight">
            {value}
          </span>
        </CardTitle>
        {description ? (
          <CardDescription
            className={cn(textColor && "text-current opacity-80")}
          >
            {description}
          </CardDescription>
        ) : null}
        <CardAction
          className={cn(
            "flex size-15 p-2 items-center justify-center rounded-lg [&_svg]:size-50",
            iconBackgroundColor,
            iconColor
          )}
          aria-hidden
        >
          {icon}
        </CardAction>
      </CardHeader>

    </Card>
  )
}
