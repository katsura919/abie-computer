"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useWindowManager } from "@/hooks/use-window-manager"
import { APPS } from "@/lib/constants"

const DOCK_ITEMS = [
  ...APPS.filter(app => app.id !== "settings").map(app => ({ ...app, type: "app" })),
  { id: "separator", type: "separator" },
  { ...(APPS.find(app => app.id === "settings") || APPS[APPS.length - 1]), type: "app" },
]

export function Dock() {
  const { openWindow, windows } = useWindowManager()

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 flex justify-center">
      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 pt-2 pb-3 glass rounded-2xl border-white/20 shadow-2xl h-[60px] sm:h-[70px] max-w-full no-scrollbar">
        {DOCK_ITEMS.map((item) => {
          if (item.type === "separator") {
            return (
              <Separator 
                key={item.id} 
                orientation="vertical" 
                className="h-8 sm:h-10 w-[1px] bg-white/20 mx-0.5 sm:mx-1 shrink-0" 
              />
            )
          }

          return (
            <DockItem 
              key={item.id} 
              item={item} 
              isOpen={windows.some(w => w.id === item.id)}
              onOpen={() => {
                const app = item as { id: string; label: string }
                if (app.label) openWindow(app.id, app.label)
              }}
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
      className="relative flex flex-col items-center justify-center w-10 sm:w-12 h-10 sm:h-12 shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
      {/* Tooltip - Hide on touch devices/mobile usually, or keep small */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", damping: 15, stiffness: 400 }}
            className="absolute -top-14 sm:-top-16 pointer-events-none glass px-2 py-1 rounded text-[10px] sm:text-[12px] font-medium whitespace-nowrap shadow-md z-50 hidden sm:block"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon Container */}
      <motion.div 
        animate={isHovered ? { scale: 1.2, y: -8 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg cursor-default relative",
          item.color
        )}
      >
        <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
      </motion.div>

      {/* Active Indicator */}
      <div className="absolute -bottom-2 sm:-bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center h-1">
        <div className={cn(
          "w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white/70 rounded-full transition-all duration-300 shadow-[0_0_4px_rgba(255,255,255,0.4)]",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
        )} />
      </div>
    </div>
  )
}
