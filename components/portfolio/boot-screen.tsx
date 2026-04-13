"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Power } from "lucide-react"

interface BootScreenProps {
  mode: "boot" | "off" | "shutdown"
  onComplete?: () => void
  onPowerOn?: () => void
}

export function BootScreen({ mode, onComplete, onPowerOn }: BootScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (mode !== "boot") return

    let currentProgress = 0
    const interval = setInterval(() => {
      const increment = Math.random() * 12
      currentProgress += increment

      if (currentProgress >= 100) {
        currentProgress = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => {
          onComplete?.()
        }, 600)
      } else {
        setProgress(currentProgress)
      }
    }, 150 + Math.random() * 250)

    return () => clearInterval(interval)
  }, [mode, onComplete])

  if (mode === "off") {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPowerOn}
          className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center transition-all hover:border-white/40 focus:outline-none group"
        >
          <Power className="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors" />
        </motion.button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-none">
      <div className="flex flex-col items-center gap-24 -mt-10">
        {/* Apple Logo SVG */}
        <motion.div
           initial={mode === "boot" ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
           animate={mode === "shutdown" ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
           transition={{ duration: mode === "boot" ? 1.2 : 0.8, ease: "easeInOut" }}
        >
          <svg
            width="84"
            height="102"
            viewBox="0 0 84 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white fill-current"
          >
            <path d="M71.0762 44.577C71.033 34.0041 79.5447 28.8504 79.9554 28.6127C75.0543 21.4651 67.4303 20.4497 64.7077 20.32 C58.2148 19.671 52 24.1804 48.7 24.1804C45.4116 24.1804 40.3551 20.4065 34.9317 20.5253C27.8443 20.6226 21.319 24.6665 17.6568 31.0298C10.2783 43.8856 15.8095 62.9103 22.95 73.1941C26.4393 78.2388 30.6094 83.8996 36.0645 83.7159C41.3039 83.5215 43.2917 80.3456 49.6183 80.3456C55.9038 80.3456 57.7024 83.7159 63.1575 83.6187C68.7212 83.5215 72.2969 78.5089 75.7648 73.4317C79.7834 67.5769 81.4255 61.9161 81.4904 61.6461C81.3391 61.5921 71.1843 57.7032 71.0762 44.577Z" />
            <path d="M57.6593 13.9137C60.5546 10.4353 62.5 5.58498 61.9599 0.745422C57.8115 0.907455 52.7993 3.511 49.8285 7.00021C47.1169 10.09 44.751 14.8256 45.4208 19.6004C49.9904 19.9893 54.7754 17.3858 57.6593 13.9137Z" />
          </svg>
        </motion.div>

        {/* Progress Bar Container - Only show in boot mode */}
        {mode === "boot" && (
          <div className="w-[180px] h-[4px] bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
