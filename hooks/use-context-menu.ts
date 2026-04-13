"use client"

import { useState, useEffect, useCallback } from "react"

export function useContextMenu() {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = useCallback((e: React.MouseEvent | MouseEvent) => {
    e.preventDefault()
    setIsVisible(true)
    
    // Ensure menu doesn't go off screen
    const x = e.pageX
    const y = e.pageY
    const menuWidth = 200
    const menuHeight = 250
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    const finalizedX = x + menuWidth > screenWidth ? x - menuWidth : x
    const finalizedY = y + menuHeight > screenHeight ? y - menuHeight : y

    setPosition({ x: finalizedX, y: finalizedY })
  }, [])

  const closeMenu = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    const handleGlobalClick = () => closeMenu()
    if (isVisible) {
      window.addEventListener("click", handleGlobalClick)
      window.addEventListener("scroll", handleGlobalClick)
    }
    return () => {
      window.removeEventListener("click", handleGlobalClick)
      window.removeEventListener("scroll", handleGlobalClick)
    }
  }, [isVisible, closeMenu])

  return { isVisible, position, handleContextMenu, closeMenu }
}
