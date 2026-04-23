"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Monitor, RefreshCw } from "lucide-react"

const PROJECTS = [
  {
    id: "landing",
    title: "Framer-like Landing Page",
    tag: "Marketing",
    description: "High-fidelity landing page with Framer-inspired motion design, smooth scroll animations, and conversion-focused layout.",
    url: "https://landing-page-ecru-rho.vercel.app/",
    accent: "from-blue-500 to-indigo-600",
    dot: "bg-blue-400",
  },
  {
    id: "sketch",
    title: "Sketch Web Design",
    tag: "UI Style",
    description: "Hand-drawn sketch aesthetic applied to a full web layout — rough strokes, pencil textures, and doodle-like UI elements.",
    url: "https://sketch-design.vercel.app/",
    accent: "from-slate-400 to-gray-600",
    dot: "bg-slate-400",
  },
  {
    id: "neo-brutalism",
    title: "Neo Brutalism",
    tag: "UI Style",
    description: "Bold borders, raw typography, and hard shadows. Neo brutalist design pushed to the web with strong visual contrast.",
    url: "https://neo-brutalism-design.vercel.app/",
    accent: "from-yellow-400 to-orange-500",
    dot: "bg-yellow-400",
  },
  {
    id: "maximalism",
    title: "Maximalism",
    tag: "UI Style",
    description: "More is more. Layered textures, rich color palettes, ornate type, and dense composition — maximalist design in full effect.",
    url: "https://maximalism-design.vercel.app/",
    accent: "from-fuchsia-500 to-pink-600",
    dot: "bg-fuchsia-400",
  },
  {
    id: "cyberpunk",
    title: "Cyberpunk",
    tag: "UI Style",
    description: "Neon glows, dark grids, glitch effects, and dystopian typography. A fully styled cyberpunk web experience.",
    url: "https://cyberpunk-design.vercel.app/",
    accent: "from-cyan-400 to-green-500",
    dot: "bg-cyan-400",
  },
  {
    id: "kinetic",
    title: "Kinetic Web Design",
    tag: "Motion",
    description: "Typography and layout in motion. Kinetic design principles applied to the browser with CSS and JS-driven animations.",
    url: "https://kinetic-design.vercel.app/",
    accent: "from-orange-400 to-red-500",
    dot: "bg-orange-400",
  },
]

export function Works() {
  const [selected, setSelected] = useState(PROJECTS[0])
  const [iframeKey, setIframeKey] = useState(0)

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      {/* Sidebar — horizontal scroll on mobile, vertical list on desktop */}
      <div className="shrink-0 border-b border-white/10 md:border-b-0 md:border-r md:w-56 flex flex-row md:flex-col overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto bg-black/10 no-scrollbar">
        <p className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-foreground/30 px-4 pt-5 pb-2 shrink-0">
          Works
        </p>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelected(p); setIframeKey(k => k + 1) }}
            className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-3 text-left transition-colors shrink-0 md:w-full ${
              selected.id === p.id
                ? "bg-white/10 text-foreground"
                : "hover:bg-white/5 text-foreground/60 hover:text-foreground/90"
            }`}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${p.dot}`} />
            <span className="text-[12px] md:text-[13px] font-medium leading-tight whitespace-nowrap md:whitespace-normal">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Preview Panel */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-2.5 border-b border-white/10 bg-black/5 shrink-0">
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-foreground truncate">{selected.title}</span>
            <span className="text-[10px] text-foreground/40 uppercase tracking-wider">{selected.tag}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIframeKey(k => k + 1)}
              title="Reload"
              className="p-1.5 rounded-md hover:bg-white/10 text-foreground/40 hover:text-foreground transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[12px] font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open
            </a>
          </div>
        </div>

        {/* Description strip — 2-line clamp on mobile */}
        <div className="px-3 md:px-4 py-2 md:py-2.5 border-b border-white/5 shrink-0">
          <p className="text-[12px] text-foreground/50 leading-relaxed line-clamp-2 md:line-clamp-none">{selected.description}</p>
        </div>

        {/* iframe */}
        <div className="flex-1 relative overflow-hidden min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <iframe
                key={iframeKey}
                src={selected.url}
                title={selected.title}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient accent bar at top */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${selected.accent} pointer-events-none`} />
        </div>
      </div>
    </div>
  )
}
