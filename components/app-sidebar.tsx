"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TerminalSquareIcon, Settings2Icon, LayoutDashboardIcon, BookIcon, MessageCircleIcon, UsersIcon, ShieldCheckIcon, UserIcon, StarIcon, SettingsIcon } from "lucide-react"
import { BookOpenIcon } from "lucide-react"
import { BarChartIcon } from "lucide-react"
import { usePathname } from "next/navigation"


const authorViewItems = [
  {
    title: "Dashboard",
    url: "/author/dashboard",
    icon: (
      <LayoutDashboardIcon
      />
    ),
  },
  {
    title: "My Books",
    url: "/author/my-books",
    icon: (
      <BookIcon
      />
    ),
  },
  {
    title: "My Chapters",
    url: "/author/my-chapters",
    icon: (
      <BookOpenIcon
      />
    ),
  },
  {
    title: "Analytics",
    url: "/author/analytics",
    icon: (
      <BarChartIcon
      />
    ),
  },
  {
    title: "Comments",
    url: "/author/comments",
    icon: (
      <MessageCircleIcon
      />
    ),
  }
]

const adminViewItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: (
      <LayoutDashboardIcon
      />
    ),
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: (
      <UsersIcon
      />
    ),
  },
  {
    title: "Content Moderation",
    url: "/admin/content-moderation",
    icon: (
      <ShieldCheckIcon
      />
    ),
  },
  {
    title: "Content Management",
    url: "/admin/content-management",
    icon: (
      <LayoutDashboardIcon
      />
    ),
  },
  {
    title: "Comments/ Moderation",
    url: "/admin/comments-moderation",
    icon: (
      <MessageCircleIcon
      />
    ),
  },
]
const SuperAdminViewItems = [
  {
    title: "Dashboard",
    url: "/super-admin/dashboard",
    icon: (
      <LayoutDashboardIcon
      />
    ),
  },
  {
    title: "Users",
    url: "/super-admin/users",
    icon: (
      <UsersIcon
      />
    ),
  },
  {
    title: "Contents",
    url: "/super-admin/contents",
    icon: (
      <BookIcon
      />
    ),
  },
  {
    title: "Authors",
    url: "/super-admin/authors",
    icon: (
      <UserIcon
      />
    ),
  },
  {
    title: "Votes & Ratings",
    url: "/super-admin/votes-ratings",
    icon: (
      <StarIcon
      />
    ),
  },
  {
    title: "Comments & Moderation",
    url: "/super-admin/comments-moderation",
    icon: (
      <MessageCircleIcon
      />
    ),
  },
  {
    title: "Settings",
    url: "/super-admin/settings",
    icon: (
      <SettingsIcon
      />
    ),
  },
]

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: (
        <TerminalSquareIcon
        />
      ),
      isActive: true,
    },


    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userRole = localStorage.getItem("userRole")
  const navMain = userRole === "author" ? authorViewItems : userRole === "admin" ? adminViewItems : SuperAdminViewItems
  const pathname = usePathname()
  return (
    <Sidebar collapsible="icon" {...props} className="bg-linear-to-b from-violet-700 to-purple-600! text-white">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
