"use client"

import React, { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { HardDrive, Folder, FileText, Mail, Pencil } from "lucide-react"
import { useWindowManager } from "@/hooks/use-window-manager"
import { triggerAddNote } from "./sticky-notes-manager"

interface DesktopIconProps {
  icon: React.ReactNode
  label: string
  color: string
  delay?: number
  onDoubleClick: () => void
}

function DesktopIcon({ icon, label, color, delay = 0, onDoubleClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col items-center gap-1.5 cursor-default w-[68px] group outline-none"
      tabIndex={0}
      onClick={() => setSelected(true)}
      onDoubleClick={() => { setSelected(false); onDoubleClick() }}
      onBlur={() => setSelected(false)}
    >
      <div
        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center shadow-lg transition-all duration-150
          ${selected ? "ring-2 ring-white/70 brightness-125" : "group-hover:brightness-110"}
          active:scale-95`}
      >
        {icon}
      </div>
      <span
        className={`text-white text-[11px] font-medium text-center leading-tight px-1 rounded
          [text-shadow:_0_1px_3px_rgb(0_0_0_/_80%)]
          ${selected ? "bg-blue-500/60 text-white" : ""}`}
      >
        {label}
      </span>
    </motion.div>
  )
}

export function DesktopFileIcons() {
  const { openWindow } = useWindowManager()

  return (
    <div className="flex flex-col gap-4 items-center">
      <DesktopIcon
        icon={<HardDrive className="w-7 h-7 text-white" />}
        label="Macintosh HD"
        color="bg-blue-500/80 glass"
        delay={0.2}
        onDoubleClick={() => openWindow("about", "About Me")}
      />
      <DesktopIcon
        icon={<Folder className="w-8 h-8 text-white" />}
        label="Projects"
        color="bg-yellow-500/80"
        delay={0.3}
        onDoubleClick={() => openWindow("works", "Works")}
      />
      <DesktopIcon
        icon={<FileText className="w-7 h-7 text-white" />}
        label="Resume.pdf"
        color="bg-red-500/80"
        delay={0.4}
        onDoubleClick={() => openWindow("about", "About Me")}
      />
      <DesktopIcon
        icon={<Mail className="w-7 h-7 text-white" />}
        label="Contact"
        color="bg-green-500/80"
        delay={0.5}
        onDoubleClick={() => openWindow("contact", "Contact")}
      />
      <DesktopIcon
        icon={<Pencil className="w-7 h-7 text-white" />}
        label="New Note"
        color="bg-amber-500/80"
        delay={0.6}
        onDoubleClick={triggerAddNote}
      />
    </div>
  )
}
