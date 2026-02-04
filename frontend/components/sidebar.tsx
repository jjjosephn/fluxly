"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  FileEdit,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface SidebarProps {
  className?: string
}

const navItems = [
   {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/ly/dashboard",
   },
   {
      label: "Post",
      icon: FileEdit,
      href: "/ly/post",
   },
   {
      label: "Calendar",
      icon: CalendarDays,
      href: "/ly/calendar",
   },
]

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "relative m-3 flex h-[calc(100vh-24px)] flex-col rounded-2xl bg-gray-100 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[72px]" : "w-[240px]",
          className
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-700">
            <Image
               src='/fluxlylogo.png'
               alt='Fluxly Logo'
               className="size-5"
               width={20}
               height={20}
            />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-semibold text-sidebar-foreground">
              Fluxly
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <span
            className={cn(
              "mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground",
              isCollapsed && "sr-only"
            )}
          >
            Menu
          </span>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const NavLink = (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-gray-200",
                    isCollapsed && "justify-center px-0",
                    isActive &&
                      "bg-emerald-700 text-white hover:bg-emerald-800"
                  )}
                >
                  <item.icon className="size-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )

              if (isCollapsed) {
                return (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>{NavLink}</TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                )
              }

              return NavLink
            })}
          </div>
        </nav>

        {/* Profile Section */}
        <div className="mt-auto p-3">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-center px-0"
                >
                  <Avatar className="size-9">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      TM
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div>
                  <p className="font-medium">Totok Michael</p>
                  <p className="text-xs text-muted-foreground">tmichael20@mail.com</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent">
              <Avatar className="size-9">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  TM
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  Totok Michael
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  tmichael20@mail.com
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 z-10 size-6 rounded-full border-gray-200 bg-white shadow-md"
        >
          {isCollapsed ? (
            <ChevronRight className="size-3" />
          ) : (
            <ChevronLeft className="size-3" />
          )}
          <span className="sr-only">
            {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
        </Button>
      </aside>
    </TooltipProvider>
  )
}
