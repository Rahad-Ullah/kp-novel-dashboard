"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

type BackButtonProps = {
  href?: string
  label?: string
  className?: string
}

function BackButton({ href, label = "Back", className }: BackButtonProps) {
  const router = useRouter()

  const content = (
    <>
      <ArrowLeft className="size-4 shrink-0" />
      {label && <span>{label}</span>}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors",
          className
        )}
      >
        {content}
      </Link>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 text-zinc-300 hover:text-zinc-100 hover:bg-emerald-800/40 gap-2",
        className
      )}
      onClick={() => router.back()}
    >
      {content}
    </Button>
  )
}

export default BackButton
