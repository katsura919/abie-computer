"use client"

import React, { useState } from "react"
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
import { motion, AnimatePresence } from "framer-motion"
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
      <div className="flex items-center gap-2 px-3 pt-2 pb-3 glass rounded-2xl border-white/20 shadow-2xl h-[70px]">
        {DOCK_ITEMS.map((item) => {
          if (item.type === "separator") {
            return (
              <Separator 
                key={item.id} 
                orientation="vertical" 
                className="h-10 w-[1px] bg-white/20 mx-1" 
              />
            )
          }

          return (
            <DockItem 
              key={item.id} 
              item={item} 
              isOpen={windows.some(w => w.id === item.id)}
              onOpen={() => item.label && openWindow(item.id, item.label)}
            />
          )
        })}
      </div>
    </div>
  )
}

function DockItem({ item, isOpen, onOpen }: { item: any, isOpen: boolean, onOpen: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon!

  return (
    <div
      className="relative flex flex-col items-center justify-center w-12 h-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
      {/* Tooltip with Smooth Pop-in */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", damping: 15, stiffness: 400 }}
            className="absolute -top-16 pointer-events-none glass px-2 py-1 rounded text-[12px] font-medium whitespace-nowrap shadow-md z-50"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon Container */}
      <motion.div 
        animate={isHovered ? { scale: 1.3, y: -12 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg cursor-default relative",
          item.color
        )}
      >
        <Icon className="w-6 h-6" />
      </motion.div>

      {/* Active Indicator with spacing */}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center h-1">
        <div className={cn(
          "w-1 h-1 bg-white/70 rounded-full transition-all duration-300 shadow-[0_0_4px_rgba(255,255,255,0.4)]",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
        )} />
      </div>
    </div>
  )
}
