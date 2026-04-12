"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

export type WindowState = {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  width: number
  height: number
}

type WindowContextType = {
  windows: WindowState[]
  activeWindowId: string | null
  openWindow: (id: string, title: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  resizeWindow: (id: string, width: number, height: number) => void
}

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [maxZIndex, setMaxZIndex] = useState(10)

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id)
    setMaxZIndex(prev => prev + 1)
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w
    ))
  }, [maxZIndex])

  const openWindow = useCallback((id: string, title: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id)
      if (existing) {
        focusWindow(id)
        return prev
      }
      const newWindow = {
        id,
        title,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: maxZIndex + 1,
        width: 600,
        height: 400
      }
      setActiveWindowId(id)
      setMaxZIndex(prevZ => prevZ + 1)
      return [...prev, newWindow]
    })
  }, [focusWindow, maxZIndex])

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id))
    if (activeWindowId === id) setActiveWindowId(null)
  }, [activeWindowId])

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ))
    setActiveWindowId(null)
  }, [])

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ))
  }, [])

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, width, height } : w
    ))
  }, [])

  return (
    <WindowContext.Provider value={{ 
      windows, 
      activeWindowId, 
      openWindow, 
      closeWindow, 
      minimizeWindow, 
      maximizeWindow,
      focusWindow,
      resizeWindow
    }}>
      {children}
    </WindowContext.Provider>
  )
}

export function useWindowManager() {
  const context = useContext(WindowContext)
  if (!context) throw new Error("useWindowManager must be used within WindowProvider")
  return context
}
