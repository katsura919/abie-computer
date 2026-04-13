"use client"
import React, { useState, useEffect } from "react"
import { MenuBar } from "@/components/portfolio/menubar"
import { Desktop } from "@/components/portfolio/desktop"
import { Dock } from "@/components/portfolio/dock"
import { Spotlight } from "@/components/portfolio/spotlight"
import { WindowProvider, useWindowManager } from "@/hooks/use-window-manager"
import { SettingsProvider } from "@/hooks/use-settings"

function PageContent() {
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const { activeWindowId, closeWindow } = useWindowManager()

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSpotlightOpen(prev => !prev)
      }
      
      // Cmd/Ctrl + W: Close Active Window
      if ((e.metaKey || e.ctrlKey) && e.key === "w") {
        if (activeWindowId) {
          e.preventDefault()
          closeWindow(activeWindowId)
        }
      }

      // Escape: Close Spotlight
      if (e.key === "Escape") {
        setIsSpotlightOpen(false)
      }
    }

    window.addEventListener("keydown", handleGlobalKeys)
    return () => window.removeEventListener("keydown", handleGlobalKeys)
  }, [activeWindowId, closeWindow])

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-sans">
      <MenuBar onSearchClick={() => setIsSpotlightOpen(true)} />
      <Desktop>
        {/* Desktop Content Area */}
        <div className="p-8">
          <div className="grid grid-cols-1 gap-8 w-fit">
            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="w-16 h-16 rounded-xl bg-blue-500/80 glass shadow-lg flex items-center justify-center transition-all active:scale-95 group-hover:brightness-110">
                <div className="w-8 h-8 border-4 border-white rounded-full bg-white/20" />
              </div>
              <span className="text-white text-[11px] font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/_60%)]">Macintosh HD</span>
            </div>
          </div>
        </div>
      </Desktop>
      <Dock />
      <Spotlight isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />
    </div>
  )
}

export default function Page() {
  return (
    <SettingsProvider>
      <WindowProvider>
        <PageContent />
      </WindowProvider>
    </SettingsProvider>
  )
}
