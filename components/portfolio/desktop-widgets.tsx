"use client"

import React, { useState, useEffect } from "react"
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import { Briefcase, Code2, MapPin } from "lucide-react"

function ClockWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeStr = time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  const dateStr = time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

  return (
    <div className="glass border border-white/20 rounded-2xl px-5 py-4 shadow-xl select-none min-w-[190px]">
      <div className="text-[38px] font-thin text-white leading-none tracking-tight">{timeStr}</div>
      <div className="text-[11px] text-white/50 mt-1.5 font-medium tracking-wide">{dateStr}</div>
    </div>
  )
}


function StatsWidget() {
  const stats = [
    { icon: Briefcase, label: "Exp", value: "10+" },
    { icon: Code2, label: "Projects", value: "20+" },
    { icon: MapPin, label: "Remote", value: "✓" },
  ]

  return (
    <div className="glass border border-white/20 rounded-2xl px-4 py-3 shadow-xl select-none">
      <div className="flex items-center gap-5">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span className="text-xl font-bold text-white leading-none">{value}</span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DesktopWidgets() {
  const reduced = useReducedMotion()

  const item = (delay: number): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0, y: reduced ? 0 : -14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: reduced ? 0.15 : 0.45, ease: "easeOut" },
  })

  return (
    <div className="flex flex-col gap-3 items-end">
      <motion.div {...item(0.5)}><ClockWidget /></motion.div>
      <motion.div {...item(0.65)}><StatsWidget /></motion.div>
    </div>
  )
}
