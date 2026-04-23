"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Search, Command, ArrowRight } from "lucide-react"
import { APPS } from "@/lib/constants"
import { useWindowManager } from "@/hooks/use-window-manager"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  isOpen: boolean
  onClose: () => void
}

export function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { openWindow } = useWindowManager()
  const shouldReduceMotion = useReducedMotion()

  // Filter apps based on query
  const filteredApps = APPS.filter(app => 
    app.label.toLowerCase().includes(query.toLowerCase()) ||
    app.description.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery("")
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Accessibility & Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "ArrowDown") {
        setSelectedIndex(prev => (prev + 1) % filteredApps.length)
      } else if (e.key === "ArrowUp") {
        setSelectedIndex(prev => (prev - 1 + filteredApps.length) % filteredApps.length)
      } else if (e.key === "Enter") {
        const activeApp = filteredApps[selectedIndex]
        if (activeApp) {
          openWindow(activeApp.id, activeApp.label)
          onClose()
        }
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredApps, selectedIndex, openWindow, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] sm:pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
          />

          {/* Search Box */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-[600px] glass border-white/20 shadow-2xl overflow-hidden rounded-2xl flex flex-col"
          >
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <Search className="w-5 h-5 text-foreground/40" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Spotlight Search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-foreground/30"
              />
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 text-[10px] text-foreground/40 border border-white/10">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            <div className="max-h-[40vh] sm:max-h-[400px] overflow-y-auto p-2">
              {filteredApps.length > 0 ? (
                filteredApps.map((app, index) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      openWindow(app.id, app.label)
                      onClose()
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
                      selectedIndex === index ? "bg-primary text-primary-foreground" : "hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center p-2", app.color)}>
                        <app.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm">{app.label}</div>
                        <div className={cn("text-xs", selectedIndex === index ? "text-primary-foreground/70" : "text-foreground/50")}>
                          {app.description}
                        </div>
                      </div>
                    </div>
                    {selectedIndex === index && (
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    )}
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-foreground/40 text-sm">
                  No results found for "{query}"
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-white/5 flex items-center justify-between text-[10px] text-foreground/30 font-medium">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3 rotate-90" /> Navigate</span>
                <span className="flex items-center gap-1"><span className="px-1 border border-white/20 rounded">⏎</span> Open</span>
              </div>
              <div>Abie Computer Spotlight</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
