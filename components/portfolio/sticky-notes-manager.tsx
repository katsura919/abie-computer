"use client"

import React, { useState, useEffect, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { StickyNote, NoteData } from "./sticky-note"
const COLORS = ["yellow", "pink", "blue", "green"]

// Module-level callback so DesktopFileIcons can trigger addNote without prop drilling
let _addNoteFn: (() => void) | null = null
export function triggerAddNote() { _addNoteFn?.() }
const LS_KEY = "abie-sticky-notes"

const DEFAULT_NOTES: NoteData[] = [
  {
    id: "welcome",
    text: "👋 Hey! I'm Abiemaxey — I build things that look great and work great.\n\nDouble-click icons to explore ↓",
    x: 108,
    y: 24,
    color: "yellow",
  },
]

function loadNotes(): NoteData[] {
  try {
    const saved = localStorage.getItem(LS_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return DEFAULT_NOTES
}

function saveNotes(notes: NoteData[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(notes))
  } catch {}
}

export function StickyNotesManager() {
  const [notes, setNotes] = useState<NoteData[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setNotes(loadNotes())
    setMounted(true)
  }, [])

  const update = useCallback((fn: (prev: NoteData[]) => NoteData[]) => {
    setNotes((prev) => {
      const next = fn(prev)
      saveNotes(next)
      return next
    })
  }, [])

  const addNote = useCallback(() => {
    update((prev) => {
      const color = COLORS[prev.length % COLORS.length]
      const cascade = (prev.length % 6) * 28
      const note: NoteData = {
        id: `note-${Date.now()}`,
        text: "",
        x: 120 + cascade,
        y: 40 + cascade,
        color,
      }
      return [...prev, note]
    })
  }, [update])

  useEffect(() => {
    _addNoteFn = addNote
    return () => { _addNoteFn = null }
  }, [addNote])

  const deleteNote = (id: string) =>
    update((prev) => prev.filter((n) => n.id !== id))

  const updateText = (id: string, text: string) =>
    update((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)))

  const updatePos = (id: string, x: number, y: number) =>
    update((prev) => prev.map((n) => (n.id === id ? { ...n, x, y } : n)))

  if (!mounted) return null

  return (
    <>
      <AnimatePresence>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onTextChange={updateText}
            onPositionChange={updatePos}
          />
        ))}
      </AnimatePresence>

    </>
  )
}
