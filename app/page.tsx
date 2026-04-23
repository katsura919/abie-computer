"use client"
import React, { useState, useEffect } from "react"
import { MenuBar } from "@/components/portfolio/menubar"
import { Desktop } from "@/components/portfolio/desktop"
import { Dock } from "@/components/portfolio/dock"
import { Spotlight } from "@/components/portfolio/spotlight"
import { WindowProvider, useWindowManager } from "@/hooks/use-window-manager"
import { SettingsProvider } from "@/hooks/use-settings"
import { BootScreen } from "@/components/portfolio/boot-screen"
import { DesktopWidgets } from "@/components/portfolio/desktop-widgets"
import { DesktopFileIcons } from "@/components/portfolio/desktop-file-icons"
import { StickyNotesManager } from "@/components/portfolio/sticky-notes-manager"
import { motion, AnimatePresence } from "framer-motion"

function PageContent({ onShutdown }: { onShutdown: () => void }) {
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
      <MenuBar 
        onSearchClick={() => setIsSpotlightOpen(true)} 
        onShutdown={onShutdown}
      />
      <Desktop>
        <div className="relative h-full w-full overflow-hidden">
          {/* Left column — file icons */}
          <div className="absolute top-4 left-4 z-10">
            <DesktopFileIcons />
          </div>

          {/* Right column — widgets (hidden on small screens) */}
          <div className="absolute top-4 right-4 z-10 hidden sm:block">
            <DesktopWidgets />
          </div>

          {/* Sticky notes — draggable, hidden on small screens */}
          <div className="hidden sm:block">
            <StickyNotesManager />
          </div>
        </div>
      </Desktop>
      <Dock />
      <Spotlight isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />
    </div>
  )
}

export default function Page() {
  const [powerStatus, setPowerStatus] = useState<"off" | "booting" | "on" | "shutting-down">("off")
  const [isHydrated, setIsHydrated] = useState(false)

  // Sync with localStorage on mount
  useEffect(() => {
    const savedStatus = localStorage.getItem("macbook-power-status") as any
    if (savedStatus === "on") {
      setPowerStatus("on")
    } else {
      setPowerStatus("off")
    }
    setIsHydrated(true)
  }, [])

  const handlePowerOn = () => {
    setPowerStatus("booting")
  }

  const handleBootComplete = () => {
    setPowerStatus("on")
    localStorage.setItem("macbook-power-status", "on")
  }

  const handleShutdown = () => {
    setPowerStatus("shutting-down")
    // Delay to show shutdown animation
    setTimeout(() => {
      setPowerStatus("off")
      localStorage.setItem("macbook-power-status", "off")
    }, 1500)
  }

  if (!isHydrated) return <div className="fixed inset-0 bg-black" />

  return (
    <SettingsProvider>
      <WindowProvider>
        <div className="h-screen w-screen bg-black overflow-hidden select-none">
          <AnimatePresence mode="wait">
            {powerStatus === "off" && (
              <motion.div
                key="off"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full"
              >
                <BootScreen mode="off" onPowerOn={handlePowerOn} />
              </motion.div>
            )}

            {powerStatus === "booting" && (
              <motion.div
                key="booting"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full"
              >
                <BootScreen mode="boot" onComplete={handleBootComplete} />
              </motion.div>
            )}

            {powerStatus === "shutting-down" && (
              <motion.div
                key="shutting-down"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full"
              >
                <BootScreen mode="shutdown" />
              </motion.div>
            )}

            {powerStatus === "on" && (
              <motion.div
                key="desktop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full w-full"
              >
                <PageContent onShutdown={handleShutdown} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </WindowProvider>
    </SettingsProvider>
  )
}
