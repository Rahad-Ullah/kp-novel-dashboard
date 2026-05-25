"use client"

import * as React from "react"
import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { fetchNotificationsAction, markNotificationAsReadAction } from "@/src/actions/notifications"

type ApiNotification = {
  _id: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays} days ago`
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths} months ago`
}

const tabTriggerClass =
  "flex-0 rounded-full border-0 bg-transparent px-3  text-sm font-medium text-gray-500  shadow-none transition-colors data-active:bg-blue-600 data-active:text-white  data-active:shadow-none hover:text-black dark:data-active:text-primary-foreground"

function NotificationCard({ item, onClick }: { item: ApiNotification; onClick?: () => void }) {
  return (
    <Card
      className={cn(
        "relative gap-0 py-3.5 cursor-pointer transition-colors hover:bg-gray-50",
        "bg-card"
      )}
      size="sm"
      onClick={onClick}
    >
      {!item.isRead ? (
        <span
          className="bg-primary absolute top-3.5 right-3.5 size-2 shrink-0 rounded-full"
          aria-hidden
        />
      ) : null}
      <CardHeader className="gap-1.5 pr-8">
        <CardTitle className="text-sm font-semibold text-gray-900">
          {item.title}
        </CardTitle>
        <CardDescription className="text-[13px] leading-snug">
          {item.message}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-0">
        <p className="text-gray-500 text-xs">{formatTimeAgo(item.createdAt)}</p>
      </CardContent>
    </Card>
  )
}

export function NotificationsSheetTrigger({
  className,
}: {
  className?: string
}) {
  const [notifications, setNotifications] = React.useState<ApiNotification[]>([])
  const [unreadCount, setUnreadCount] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    if (isRead) return;
    
    // Optimistic UI update
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
    setUnreadCount(prev => Math.max(0, prev - 1))

    try {
      const res = await markNotificationAsReadAction(id)
      if (!res.success) {
        console.error(res.message)
      }
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    setIsLoading(true)
    fetchNotificationsAction().then(res => {
      if (res.success && res.data) {
        setNotifications(res.data.result || [])
        setUnreadCount(res.data.unReadCount || 0)
      }
    }).catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const all = notifications.length
  const readCount = all - unreadCount

  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "mr-4 size-8 rounded-xl border text-gray-900 hover:bg-gray-200 hover:text-gray-700 relative",
                className
              )}
              aria-label="Open notifications"
            >
              <BellIcon className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-lg bg-gray-100"
      >
        <SheetHeader className="border-border shrink-0 space-y-1 border-b px-4 py-5 text-left">
          <SheetTitle className="font-heading text-xl font-semibold tracking-tight text-gray-900">
            Notifications
          </SheetTitle>
          <SheetDescription>
            Stay updated with your latest activities
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-4">
          <Tabs defaultValue="all">
            <TabsList
              variant="default"
              className="bg-gray-200 grid h-auto w-full grid-cols-3 gap-0 rounded-full border border-border p-1"
            >
              <TabsTrigger value="all" className={tabTriggerClass}>
                All ({all})
              </TabsTrigger>
              <TabsTrigger value="unread" className={tabTriggerClass}>
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="read" className={tabTriggerClass}>
                Read ({readCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="all"
              className="mt-0 min-h-0 flex-1 overflow-y-auto outline-none"
            >
              <ul className="flex flex-col gap-3">
                {isLoading ? (
                  <li className="text-center text-gray-500 py-4">Loading...</li>
                ) : notifications.length === 0 ? (
                  <li className="text-center text-gray-500 py-4">No notifications yet</li>
                ) : (
                  notifications.map((item) => (
                    <li key={item._id}>
                      <NotificationCard item={item} onClick={() => handleMarkAsRead(item._id, item.isRead)} />
                    </li>
                  ))
                )}
              </ul>
            </TabsContent>
            <TabsContent
              value="unread"
              className="mt-0 min-h-0 flex-1 overflow-y-auto outline-none"
            >
              <ul className="flex flex-col gap-3">
                {notifications.filter((n) => !n.isRead).length === 0 ? (
                  <li className="text-center text-gray-500 py-4">No unread notifications</li>
                ) : (
                  notifications.filter((n) => !n.isRead).map((item) => (
                    <li key={item._id}>
                      <NotificationCard item={item} onClick={() => handleMarkAsRead(item._id, item.isRead)} />
                    </li>
                  ))
                )}
              </ul>
            </TabsContent>
            <TabsContent
              value="read"
              className="mt-0 min-h-0 flex-1 overflow-y-auto outline-none"
            >
              <ul className="flex flex-col gap-3">
                {notifications.filter((n) => n.isRead).length === 0 ? (
                  <li className="text-center text-gray-500 py-4">No read notifications</li>
                ) : (
                  notifications.filter((n) => n.isRead).map((item) => (
                    <li key={item._id}>
                      <NotificationCard item={item} onClick={() => handleMarkAsRead(item._id, item.isRead)} />
                    </li>
                  ))
                )}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
