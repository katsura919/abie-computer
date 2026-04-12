"use client"

import React from "react"
import { Monitor, Sun, Moon, Palette, Image as ImageIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useSettings, WALLPAPERS, ACCENT_COLORS } from "@/hooks/use-settings"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Settings() {
  const { theme, setTheme } = useTheme()
  const { wallpaper, setWallpaper, accentColor, setAccentColor } = useSettings()

  return (
    <div className="p-8 flex flex-col gap-10 text-foreground/90 pb-20">
      {/* Theme Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
          <Palette className="w-4 h-4" /> Appearance
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setTheme("light")}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
              theme === "light" ? "bg-white/20 border-white/40 ring-2 ring-primary" : "bg-white/5 border-white/10 hover:bg-white/10"
            )}
          >
            <div className="w-full h-20 rounded bg-white border border-black/5 flex items-center justify-center">
              <Sun className="w-8 h-8 text-orange-400" />
            </div>
            <span className="text-xs font-medium">Light</span>
          </button>
          <button 
            onClick={() => setTheme("dark")}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
              theme === "dark" ? "bg-white/20 border-white/40 ring-2 ring-primary" : "bg-white/5 border-white/10 hover:bg-white/10"
            )}
          >
            <div className="w-full h-20 rounded bg-slate-950 border border-white/5 flex items-center justify-center">
              <Moon className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-xs font-medium">Dark</span>
          </button>
        </div>
      </section>

      {/* Accent Color Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
          Accent Color
        </h2>
        <div className="flex items-center gap-3 p-4 glass rounded-xl">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setAccentColor(color.value)}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95",
                accentColor === color.value ? "border-white scale-110 shadow-lg" : "border-transparent"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </section>

      {/* Wallpaper Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
          <ImageIcon className="w-4 h-4" /> Desktop Wallpaper
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.value)}
              className={cn(
                "group relative h-24 rounded-lg overflow-hidden border-2 transition-all",
                wallpaper === wp.value ? "border-primary scale-[1.02] shadow-xl" : "border-transparent hover:border-white/20"
              )}
            >
              <div 
                className="absolute inset-0 w-full h-full transition-transform group-hover:scale-110" 
                style={{ background: wp.value }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-sm p-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {wp.name}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
