"use client"

import React, { useRef } from "react"
import { Monitor, Sun, Moon, Palette, Image as ImageIcon, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import { useSettings, WALLPAPERS, ACCENT_COLORS } from "@/hooks/use-settings"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Settings() {
  const { theme, setTheme } = useTheme()
  const { wallpaper, setWallpaper, accentColor, setAccentColor } = useSettings()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File too big! Please keep it under 5MB.")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setWallpaper(`url('${reader.result}')`)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-8 flex flex-col gap-10 text-white pb-32">
      {/* Theme Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[11px] font-bold flex items-center gap-2 text-white/50 uppercase tracking-[0.1em]">
          <Palette className="w-3.5 h-3.5" /> Appearance
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => setTheme("light")}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
              theme === "light" ? "bg-white/10 border-white/20 ring-1 ring-white/30" : "bg-white/5 border-white/5 hover:bg-white/10"
            )}
          >
            <div className="w-full h-16 rounded bg-white border border-black/5 flex items-center justify-center">
              <Sun className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-[11px] font-medium text-white/70">Light</span>
          </button>
          <button 
            onClick={() => setTheme("dark")}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
              theme === "dark" ? "bg-white/10 border-white/20 ring-1 ring-white/30" : "bg-white/5 border-white/5 hover:bg-white/10"
            )}
          >
            <div className="w-full h-16 rounded bg-black border border-white/10 flex items-center justify-center shadow-inner">
              <Moon className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-[11px] font-medium text-white/70">Dark</span>
          </button>
          <button 
            onClick={() => setTheme("rose")}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
              theme === "rose" ? "bg-white/10 border-white/20 ring-1 ring-white/30" : "bg-white/5 border-white/5 hover:bg-white/10"
            )}
          >
            <div className="w-full h-16 rounded bg-[#f9f5f2] border border-black/5 flex items-center justify-center">
              <Palette className="w-6 h-6 text-[#e3a99c]" />
            </div>
            <span className="text-[11px] font-medium text-white/70">Rose</span>
          </button>
        </div>
      </section>

      {/* Accent Color Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[11px] font-bold flex items-center gap-2 text-white/50 uppercase tracking-[0.1em]">
           Accent Color
        </h2>
        <div className="flex items-center gap-3 p-4 glass rounded-xl">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setAccentColor(color.value)}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-all hover:scale-110 active:scale-95",
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
        <h2 className="text-[11px] font-bold flex items-center gap-2 text-white/50 uppercase tracking-[0.1em]">
          <ImageIcon className="w-3.5 h-3.5" /> Desktop Wallpaper
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.value)}
              className={cn(
                "group relative h-24 rounded-lg overflow-hidden border-2 transition-all",
                wallpaper === wp.value ? "border-white/80 scale-[1.02] shadow-xl" : "border-transparent hover:border-white/20"
              )}
            >
              <div 
                className="absolute inset-0 w-full h-full transition-transform group-hover:scale-110 bg-center" 
                style={{ 
                  backgroundImage: wp.value, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/50 backdrop-blur-md p-1.5 text-[10px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity font-medium tracking-tight text-center">
                {wp.name}
              </div>
            </button>
          ))}

          {/* Custom Upload Button - Distinct Card Style */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-24 rounded-lg overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md transition-all flex flex-col items-center justify-center gap-2 hover:bg-white/20 hover:border-white/40 shadow-lg active:scale-95"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white/10 border border-white/20 group-hover:scale-110 shadow-inner"
              style={{ color: accentColor }}
            >
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-[11px] text-foreground font-semibold tracking-tight uppercase">Upload Wallpaper</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleCustomUpload}
            />
            {/* Subtle gloss effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </button>
        </div>
      </section>
    </div>
  )
}
