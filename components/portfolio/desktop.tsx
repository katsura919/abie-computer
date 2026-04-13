"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useWindowManager } from "@/hooks/use-window-manager"
import { useSettings } from "@/hooks/use-settings"
import { WindowFrame } from "./window-frame"
import { AboutMe } from "./apps/about-me"
import { Settings } from "./apps/settings"
import { Experience } from "./apps/experience"
import { AnimatePresence } from "framer-motion"

interface DesktopProps {
  children?: React.ReactNode
  className?: string
}

export function Desktop({ children, className }: DesktopProps) {
  const { windows } = useWindowManager()
  const { wallpaper } = useSettings()

  const renderWindowContent = (id: string) => {
    switch (id) {
      case "about":
        return <AboutMe />
      case "settings":
        return <Settings />
      case "experience":
        return <Experience />
      default:
        return <div className="p-8 text-foreground/50">App content for {id} coming soon...</div>
    }
  }

  return (
    <main 
      className={cn(
        "relative h-screen w-screen overflow-hidden bg-cover bg-center flex flex-col transition-all duration-700 ease-in-out",
        className
      )}
      style={{ background: wallpaper }}
    >
      {/* Aesthetic macOS layer overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      
      {/* Windows Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <AnimatePresence>
          {windows.map((window) => (
            !window.isMinimized && (
              <div key={window.id} className="pointer-events-auto">
                <WindowFrame
                  id={window.id}
                  title={window.title}
                  zIndex={window.zIndex}
                  isMaximized={window.isMaximized}
                >
                  {renderWindowContent(window.id)}
                </WindowFrame>
              </div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* Desktop Icons Area */}
      <div className="flex-1 mt-8 relative z-0">
        {children}
      </div>
    </main>
  )
}
