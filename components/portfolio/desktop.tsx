"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useWindowManager } from "@/hooks/use-window-manager"
import { useSettings } from "@/hooks/use-settings"
import { useContextMenu } from "@/hooks/use-context-menu"
import { WindowFrame } from "./window-frame"
import { AboutMe } from "./apps/about-me"
import { Settings } from "./apps/settings"
import { Experience } from "./apps/experience"
import { Terminal } from "./apps/terminal"
import { AnimatePresence, motion } from "framer-motion"
import { Monitor, Image as ImageIcon, Info, Plus } from "lucide-react"

interface DesktopProps {
  children?: React.ReactNode
  className?: string
}

export function Desktop({ children, className }: DesktopProps) {
  const { windows, openWindow } = useWindowManager()
  const { wallpaper } = useSettings()
  const { isVisible, position, handleContextMenu, closeMenu } = useContextMenu()

  const handleContextAction = (action: string) => {
    closeMenu()
    switch (action) {
      case "settings":
        openWindow("settings", "Settings")
        break
      case "about":
        openWindow("about", "About Me")
        break
      case "terminal":
        openWindow("terminal", "Terminal")
        break
      case "note":
        openWindow("note", "New Note")
        break
    }
  }

  const renderWindowContent = (id: string) => {
    switch (id) {
      case "about":
        return <AboutMe />
      case "settings":
        return <Settings />
      case "experience":
        return <Experience />
      case "terminal":
        return <Terminal />
      case "note":
        return <div className="p-4 h-full"><textarea className="w-full h-full bg-transparent border-none outline-none resize-none text-sm font-medium" placeholder="Write a note..." autoFocus /></div>
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
      onContextMenu={handleContextMenu}
    >
      {/* Context Menu */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[100] w-52 glass border-white/20 shadow-2xl rounded-xl p-1 overflow-hidden"
            style={{ top: position.y, left: position.x }}
          >
            <div className="flex flex-col gap-0.5">
              <button onClick={() => handleContextAction("about")} className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors group">
                <Info className="w-4 h-4 opacity-70 group-hover:opacity-100" /> Get Info
              </button>
              <div className="h-[1px] bg-white/10 my-1 mx-2" />
              <button onClick={() => handleContextAction("note")} className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors group">
                <Plus className="w-4 h-4 opacity-70 group-hover:opacity-100" /> New Note
              </button>
              <button onClick={() => handleContextAction("terminal")} className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors group">
                <Monitor className="w-4 h-4 opacity-70 group-hover:opacity-100" /> Open Terminal
              </button>
              <div className="h-[1px] bg-white/10 my-1 mx-2" />
              <button onClick={() => handleContextAction("settings")} className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors group">
                <ImageIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" /> Change Wallpaper
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
