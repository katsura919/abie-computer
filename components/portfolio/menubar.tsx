"use client"

import * as React from "react"
import { Apple, Wifi, Battery, Search, ListFilter, Command } from "lucide-react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { cn } from "@/lib/utils"

export function MenuBar() {
  const [date, setDate] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <header className="bg-background fixed top-0 left-0 right-0 z-50 h-8 flex items-center justify-between px-4  text-foreground/90 text-[13px] font-medium select-none">
      <div className="flex items-center gap-4">
        <Menubar className="border-none bg-transparent shadow-none h-auto p-0 gap-0">
          <MenubarMenu>
            <MenubarTrigger className="px-2 focus:bg-white/20 data-[state=open]:bg-white/20 cursor-default">
              <Apple className="h-4 w-4 fill-current" />
            </MenubarTrigger>
            <MenubarContent className="bg-background/95 border-white/20 min-w-[200px] backdrop-blur-md">
              <MenubarItem>About This Portfolio</MenubarItem>
              <MenubarSeparator className="bg-white/10" />
              <MenubarItem>System Settings...</MenubarItem>
              <MenubarItem>App Store...</MenubarItem>
              <MenubarSeparator className="bg-white/10" />
              <MenubarItem>Recent Items</MenubarItem>
              <MenubarSeparator className="bg-white/10" />
              <MenubarItem>Force Quit...</MenubarItem>
              <MenubarSeparator className="bg-white/10" />
              <MenubarItem>Sleep</MenubarItem>
              <MenubarItem>Restart...</MenubarItem>
              <MenubarItem>Shut Down...</MenubarItem>
              <MenubarSeparator className="bg-white/10" />
              <MenubarItem>Lock Screen</MenubarItem>
              <MenubarItem>Log Out...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="px-3 font-bold focus:bg-white/20 data-[state=open]:bg-white/20 cursor-default">
              Portfolio
            </MenubarTrigger>
            <MenubarContent className="bg-background/95 border-white/20 backdrop-blur-md">
              <MenubarItem>Hide Portfolio</MenubarItem>
              <MenubarItem>Hide Others</MenubarItem>
              <MenubarItem>Show All</MenubarItem>
              <MenubarSeparator className="bg-white/10" />
              <MenubarItem>Quit Portfolio</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="px-3 focus:bg-white/20 data-[state=open]:bg-white/20 cursor-default hidden md:flex">
              File
            </MenubarTrigger>
            <MenubarContent className="bg-background/95 border-white/20 backdrop-blur-md">
              <MenubarItem>New Window</MenubarItem>
              <MenubarItem>New Tab</MenubarItem>
              <MenubarItem>Open...</MenubarItem>
              <MenubarSeparator className="bg-white/10" />
              <MenubarItem disabled>Close Window</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="px-3 focus:bg-white/20 data-[state=open]:bg-white/20 cursor-default hidden lg:flex">
              Edit
            </MenubarTrigger>
            <MenubarContent className="bg-background/95 border-white/20 backdrop-blur-md">
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
              <MenubarSeparator className="bg-white/10" />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 px-1 sm:px-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Wifi className="h-4 w-4 hidden sm:block" />
          <Battery className="h-4 w-4 rotate-90" />
          <Search className="h-4 w-4 hidden md:block" />
          <ListFilter className="h-4 w-4 hidden lg:block" />
        </div>
        <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default transition-colors whitespace-nowrap">
          <span className="hidden sm:inline">{formattedDate}</span>
          <span className="inline sm:hidden">{formattedTime}</span>
        </div>
      </div>
    </header>
  )
}
