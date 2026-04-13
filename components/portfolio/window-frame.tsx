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
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId, windows, updateWindowRect } = useWindowManager()
  const isActive = activeWindowId === id
  const dragControls = useDragControls()
  
  const [isResizing, setIsResizing] = React.useState(false)
  
  const windowState = windows.find(w => w.id === id)
  const width = windowState?.width || 600
  const height = windowState?.height || 400
  const x = windowState?.x ?? "25%"
  const y = windowState?.y ?? "15%"

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: isMaximized ? "calc(100% - 16px)" : width,
        height: isMaximized ? "calc(100% - 160px)" : height,
        top: isMaximized ? 40 : y,
        left: isMaximized ? 8 : x,
      }}
      transition={{ 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        width: isResizing ? { duration: 0 } : undefined,
        height: isResizing ? { duration: 0 } : undefined,
        top: isResizing ? { duration: 0 } : undefined,
        left: isResizing ? { duration: 0 } : undefined
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      drag={!isMaximized && !isResizing}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        const el = (e.target as HTMLElement).closest(".absolute") as HTMLElement
        if (el) {
          updateWindowRect(id, { x: el.offsetLeft, y: el.offsetTop })
        }
      }}
      onPointerDown={() => focusWindow(id)}
      style={{ zIndex }}
      className={cn(
        "absolute flex flex-col bg-background rounded-xl shadow-2xl overflow-hidden border border-border/40 select-none",
        "max-w-[calc(100vw-16px)] max-h-[calc(100vh-120px)]",
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
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Left Edge Resize */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1.5 cursor-ew-resize z-50 pointer-events-auto"
            onPointerDown={(e) => {
              e.stopPropagation();
              setIsResizing(true);
              const startX = e.clientX;
              const el = (e.target as HTMLElement).closest(".absolute") as HTMLElement;
              const startRectX = el.offsetLeft;
              const startWidth = width;

              const handlePointerMove = (moveEvent: PointerEvent) => {
                const delta = moveEvent.clientX - startX;
                const newWidth = Math.max(300, startWidth - delta);
                const newX = startRectX + (startWidth - newWidth);
                updateWindowRect(id, { width: newWidth, x: newX });
              };

              const handlePointerUp = () => {
                setIsResizing(false);
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp);
              };

              document.addEventListener("pointermove", handlePointerMove);
              document.addEventListener("pointerup", handlePointerUp);
            }}
          />

          {/* Right Edge Resize */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1.5 cursor-ew-resize z-50 pointer-events-auto"
            onPointerDown={(e) => {
              e.stopPropagation();
              setIsResizing(true);
              const startX = e.clientX;
              const startWidth = width;

              const handlePointerMove = (moveEvent: PointerEvent) => {
                const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
                updateWindowRect(id, { width: newWidth });
              };

              const handlePointerUp = () => {
                setIsResizing(false);
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp);
              };

              document.addEventListener("pointermove", handlePointerMove);
              document.addEventListener("pointerup", handlePointerUp);
            }}
          />

          {/* Bottom Edge Resize */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize z-50 flex items-center justify-center group/resize pointer-events-auto"
            onPointerDown={(e) => {
              e.stopPropagation();
              setIsResizing(true);
              const startY = e.clientY;
              const startHeight = height;

              const handlePointerMove = (moveEvent: PointerEvent) => {
                const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
                updateWindowRect(id, { height: newHeight });
              };

              const handlePointerUp = () => {
                setIsResizing(false);
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp);
              };

              document.addEventListener("pointermove", handlePointerMove);
              document.addEventListener("pointerup", handlePointerUp);
            }}
          />

          {/* Bottom Right Corner Resize */}
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-[60] group/resize pointer-events-auto"
            onPointerDown={(e) => {
              e.stopPropagation();
              setIsResizing(true);
              const startX = e.clientX;
              const startY = e.clientY;
              const startWidth = width;
              const startHeight = height;

              const handlePointerMove = (moveEvent: PointerEvent) => {
                const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
                const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
                updateWindowRect(id, { width: newWidth, height: newHeight });
              };

              const handlePointerUp = () => {
                setIsResizing(false);
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp);
              };

              document.addEventListener("pointermove", handlePointerMove);
              document.addEventListener("pointerup", handlePointerUp);
            }}
          />
        </>
      )}
    </motion.div>
  )
}
