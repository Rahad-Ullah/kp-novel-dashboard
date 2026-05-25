"use client"

import { useState } from "react";
import { CirclePower } from "lucide-react"

import LogoutConfirmationModal from "@/components/common/logoutconfirmation/LogoutConfirmationModal"
import { NotificationsSheetTrigger } from "@/components/notifications-sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { deleteCookie } from "cookies-next";

export function AppHeader() {
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogoutConfirm = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    window.location.replace("/auth/login");
  };

  return (
    <TooltipProvider>
      <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-border bg-sidebar transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-2 hover:cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Sidebar</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex items-center gap-2 mr-4">
          <NotificationsSheetTrigger className="mr-2" />
          <Separator orientation="vertical" className="h-8 w-px bg-gray-200" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-xl text-red-400 hover:bg-gray-200 hover:text-red-700"
                aria-label="Log out"
                onClick={() => setLogoutOpen(true)}
              >
                <CirclePower className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      <LogoutConfirmationModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </TooltipProvider>
  );
}
