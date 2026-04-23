"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export const WALLPAPERS = [
  { id: "sequoia", name: "Sequoia", value: "url('/assets/wallpaper/wallpaper-1.jpg')" },
  { id: "sonoma", name: "Sonoma", value: "url('/assets/wallpaper/wallpaper-2.jpg')" },
  { id: "monterey-photo", name: "Monterey Photo", value: "url('/assets/wallpaper/wallpaper-3.jpg')" },
  { id: "gradient-1", name: "Sonoma Gradient", value: "radial-gradient(ellipse at top right, #60a5fa, #a855f7, #fb923c)" },
  { id: "gradient-2", name: "Ventura Gradient", value: "linear-gradient(to right bottom, #fb7185, #a21caf, #6366f1)" },
  { id: "gradient-3", name: "Monterey Gradient", value: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)" },
  { id: "dark", name: "Dark Orbit", value: "linear-gradient(to bottom, #111827, #000000)" },
]

export const ACCENT_COLORS = [
  { id: "rose", name: "Rose", value: "#e3a99c" },
  { id: "blue", name: "Blue", value: "#3b82f6" },
  { id: "purple", name: "Purple", value: "#a855f7" },
  { id: "pink", name: "Pink", value: "#ec4899" },
  { id: "orange", name: "Orange", value: "#f97316" },
  { id: "green", name: "Green", value: "#22c55e" },
]

type SettingsContextType = {
  wallpaper: string
  accentColor: string
  reduceMotion: boolean
  setWallpaper: (value: string) => void
  setAccentColor: (value: string) => void
  setReduceMotion: (value: boolean) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [wallpaper, setWallpaperState] = useState(WALLPAPERS[0].value)
  const [accentColor, setAccentColorState] = useState(ACCENT_COLORS[0].value)
  const [reduceMotion, setReduceMotionState] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const savedWallpaper = localStorage.getItem("macbook-wallpaper")
    const savedAccent = localStorage.getItem("macbook-accent")
    const savedMotion = localStorage.getItem("macbook-reduce-motion")
    if (savedWallpaper) setWallpaperState(savedWallpaper)
    if (savedAccent) setAccentColorState(savedAccent)
    if (savedMotion !== null) {
      setReduceMotionState(savedMotion === "true")
    } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduceMotionState(true)
    }
  }, [])

  const setWallpaper = (value: string) => {
    setWallpaperState(value)
    localStorage.setItem("macbook-wallpaper", value)
  }

  const setAccentColor = (value: string) => {
    setAccentColorState(value)
    localStorage.setItem("macbook-accent", value)
    document.documentElement.style.setProperty("--primary", value)
  }

  const setReduceMotion = (value: boolean) => {
    setReduceMotionState(value)
    localStorage.setItem("macbook-reduce-motion", String(value))
  }

  // Apply accent color on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", accentColor)
  }, [accentColor])

  return (
    <SettingsContext.Provider value={{
      wallpaper,
      accentColor,
      reduceMotion,
      setWallpaper,
      setAccentColor,
      setReduceMotion,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) throw new Error("useSettings must be used within SettingsProvider")
  return context
}
