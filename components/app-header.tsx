

import { SidebarTrigger } from "@/components/ui/sidebar"
import { BellIcon } from "lucide-react"

export function AppHeader() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center gap-2 border-b border-border bg-sidebar transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">

      <SidebarTrigger className="ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-2 hover:cursor-pointer" />
      <BellIcon className=" text-gray-500 hover:text-gray-700 ml-auto border rounded-xl p-1 mr-4 size-8 hover:cursor-pointer" />

    </header>
  )
}
