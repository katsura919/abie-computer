"use client"

import React from "react"
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import { X, Minus, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWindowManager } from "@/hooks/use-window-manager"

interface WindowFrameProps {
  id: string
  title: string
  children: React.ReactNode
  zIndex: number
  isMaximized?: boolean
}

export function WindowFrame({ id, title, children, zIndex, isMaximized }: WindowFrameProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId, windows, resizeWindow } = useWindowManager()
  const isActive = activeWindowId === id
  const dragControls = useDragControls()
  
  const windowState = windows.find(w => w.id === id)
  const width = windowState?.width || 600
  const height = windowState?.height || 400

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: isMaximized ? "100%" : width,
        height: isMaximized ? "100%" : height,
        top: isMaximized ? 0 : "15%",
        left: isMaximized ? 0 : "25%",
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={() => focusWindow(id)}
      style={{ zIndex }}
      className={cn(
        "absolute flex flex-col bg-background rounded-xl shadow-2xl overflow-hidden border border-border/40 select-none transition-all duration-300",
        isActive ? "ring-1 ring-primary/40 shadow-2xl" : "opacity-90"
      )}
    >
      {/* Title Bar */}
      <div 
        className="h-9 glass border-b border-border/20 flex items-center justify-between px-3 cursor-default shrink-0"
        onDoubleClick={() => maximizeWindow(id)}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2 group/controls">
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center text-black/40 group-hover/controls:bg-[#FF5F57] hover:brightness-90 transition-all font-bold"
          >
            <X className="w-2 h-2 opacity-0 group-hover/controls:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="w-3 h-3 rounded-full bg-[#FEBC2E] flex items-center justify-center text-black/40 group-hover/controls:bg-[#FEBC2E] hover:brightness-90 transition-all font-bold"
          >
            <Minus className="w-2 h-2 opacity-0 group-hover/controls:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            className="w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center text-black/40 group-hover/controls:bg-[#28C840] hover:brightness-90 transition-all font-bold"
          >
            <Maximize2 className="w-2 h-2 opacity-0 group-hover/controls:opacity-100" />
          </button>
        </div>
        
        <div className="text-[13px] font-medium text-foreground/70">
          {title}
        </div>
        
        <div className="w-12" /> {/* Spacer to center title */}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-background/50 backdrop-blur-sm overflow-auto custom-scrollbar relative">
        {children}
        
        {/* Resize Handle */}
        {!isMaximized && (
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 flex items-end justify-end p-0.5 group/resize"
            onPointerDown={(e) => {
              e.stopPropagation();
              const startX = e.clientX;
              const startY = e.clientY;
              const startWidth = width;
              const startHeight = height;

              const handlePointerMove = (moveEvent: PointerEvent) => {
                const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
                const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
                resizeWindow(id, newWidth, newHeight);
              };

              const handlePointerUp = () => {
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp);
              };

              document.addEventListener("pointermove", handlePointerMove);
              document.addEventListener("pointerup", handlePointerUp);
            }}
          >
            <div className="w-2 h-2 border-r-2 border-b-2 border-foreground/20 rounded-[1px] group-hover/resize:border-foreground/40 transition-colors" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
