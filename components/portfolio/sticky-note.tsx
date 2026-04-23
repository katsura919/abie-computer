"use client"

import React from "react"
import { motion, useMotionValue, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"

export interface NoteData {
  id: string
  text: string
  x: number
  y: number
  color: string
}

const BACKGROUNDS: Record<string, string> = {
  yellow: "#fef08a",
  pink:   "#fce7f3",
  blue:   "#dbeafe",
  green:  "#dcfce7",
}

interface StickyNoteProps {
  note: NoteData
  onDelete: (id: string) => void
  onTextChange: (id: string, text: string) => void
  onPositionChange: (id: string, x: number, y: number) => void
}

export function StickyNote({ note, onDelete, onTextChange, onPositionChange }: StickyNoteProps) {
  const reduced = useReducedMotion()
  const x = useMotionValue(note.x)
  const y = useMotionValue(note.y)
  const bg = BACKGROUNDS[note.color] ?? BACKGROUNDS.yellow

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduced ? 1 : 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      drag
      dragMomentum={false}
      onDragEnd={() => onPositionChange(note.id, x.get(), y.get())}
      whileDrag={{ scale: 1.04, cursor: "grabbing" }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        x,
        y,
        background: bg,
        backgroundImage:
          "repeating-linear-gradient(transparent, transparent 23px, rgba(0,0,0,0.06) 23px, rgba(0,0,0,0.06) 24px)",
      }}
      className="w-52 rounded-lg shadow-2xl cursor-grab z-10 select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1.5">
        <span className="text-black/35 text-[10px] font-bold uppercase tracking-widest">Sticky</span>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(note.id)}
          className="w-4 h-4 rounded-full bg-black/10 hover:bg-red-400 flex items-center justify-center transition-colors group"
        >
          <X className="w-2.5 h-2.5 text-black/40 group-hover:text-white" />
        </button>
      </div>

      {/* Editable body */}
      <div className="px-3 pb-4">
        <textarea
          value={note.text}
          onChange={(e) => onTextChange(note.id, e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          placeholder="Write something..."
          className="w-full bg-transparent border-none outline-none resize-none text-[13px] font-medium leading-[24px] placeholder:text-black/30 cursor-text"
          style={{ color: "rgba(0,0,0,0.72)" }}
          rows={4}
        />
      </div>
    </motion.div>
  )
}
