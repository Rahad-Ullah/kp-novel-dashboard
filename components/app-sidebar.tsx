"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, BookIcon, MessageCircleIcon, UsersIcon, ShieldCheckIcon, UserIcon, StarIcon, SettingsIcon, ChartScatter } from "lucide-react"
import { BookOpenIcon } from "lucide-react"
import { BarChartIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { getStoredUserRole, inferRoleFromPathname } from "@/lib/auth-storage"


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
    url: "/super_admin/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Users",
    url: "/super_admin/users",
    icon: <UsersIcon />,
  },
  {
    title: "Contents",
    url: "/super_admin/contents",
    icon: <BookIcon />,
  },
  {
    title: "Authors",
    url: "/super_admin/authors",
    icon: <UserIcon />,
  },
  {
    title: "Votes & Ratings",
    url: "/super_admin/votes-ratings",
    icon: <StarIcon />,
  },
  {
    title: "Comments & Moderation",
    url: "/super_admin/comments-moderation",
    icon: <MessageCircleIcon />,
  },
  {
    title: "Settings",
    url: "/super_admin/settings",
    icon: <SettingsIcon />,
  },
];



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [storedRole, setStoredRole] = React.useState<string | null>(null)
  React.useEffect(() => {
    setStoredRole(getStoredUserRole())
  }, [])
  const userRole = storedRole ?? inferRoleFromPathname(pathname)
  const navMain = userRole === "author" ? authorViewItems : userRole === "admin" ? adminViewItems : SuperAdminViewItems
  return (
    <Sidebar collapsible="icon" {...props} className={` text-white ${userRole === "admin" ? " bg-linear-to-b from-purple-700 to-pink-700!" : userRole === "super-admin" ? "bg-linear-to-b bg-blue-700 to-blue-900!" : "bg-violet-700 to-purple-600"}`}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} pathname={pathname} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
