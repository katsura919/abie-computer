"use client"

import React from "react"
import { 
  User, 
  Settings, 
  Briefcase, 
  Layout, 
  Zap, 
  FolderLock, 
  Mail, 
  FileText 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useWindowManager } from "@/hooks/use-window-manager"

const DOCK_ITEMS = [
  { id: "about", icon: User, label: "About", color: "bg-blue-500" },
  { id: "experience", icon: Briefcase, label: "Experience", color: "bg-gray-700" },
  { id: "works", icon: Layout, label: "Works", color: "bg-pink-500" },
  { id: "skills", icon: Zap, label: "Skills", color: "bg-yellow-500" },
  { id: "projects", icon: FolderLock, label: "Projects", color: "bg-orange-500" },
  { id: "contact", icon: Mail, label: "Contact", color: "bg-green-500" },
  { id: "separator", type: "separator" },
  { id: "settings", icon: Settings, label: "Settings", color: "bg-gray-400" },
  { id: "resume", icon: FileText, label: "Resume", color: "bg-red-500" },
]

export function Dock() {
  const { openWindow, windows } = useWindowManager()

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-2 px-3 py-2 glass rounded-2xl border-white/20 shadow-2xl overflow-visible">
        {DOCK_ITEMS.map((item) => {
          if (item.type === "separator") {
            return (
              <Separator 
                key={item.id} 
                orientation="vertical" 
                className="h-10 w-[1px] bg-white/20 mx-1 mb-1" 
              />
            )
          }

          const Icon = item.icon!
          const isOpen = windows.some(w => w.id === item.id)
          
          return (
            <div
              key={item.id}
              className="group relative flex flex-col items-center gap-1"
              onClick={() => item.label && openWindow(item.id, item.label)}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none glass px-2 py-1 rounded text-[12px] font-medium whitespace-nowrap shadow-md">
                {item.label}
              </div>

              {/* Icon Container */}
              <div 
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg cursor-default transition-all duration-300 ease-out",
                  "group-hover:w-16 group-hover:h-16 group-hover:-translate-y-2",
                  "active:scale-90 active:brightness-90",
                  item.color
                )}
              >
                <Icon className={cn("transition-all duration-300", "w-6 h-6 group-hover:w-8 group-hover:h-8")} />
              </div>

              {/* Active Indicator */}
              <div className={cn(
                "w-1 h-1 bg-white/60 rounded-full transition-all duration-300",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
