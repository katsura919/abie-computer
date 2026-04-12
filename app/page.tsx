"use client"

import { MenuBar } from "@/components/portfolio/menubar"
import { Desktop } from "@/components/portfolio/desktop"
import { Dock } from "@/components/portfolio/dock"
import { WindowProvider } from "@/hooks/use-window-manager"
import { SettingsProvider } from "@/hooks/use-settings"

export default function Page() {
  return (
    <SettingsProvider>
      <WindowProvider>
        <div className="h-screen w-screen overflow-hidden flex flex-col font-sans">
          <MenuBar />
          <Desktop>
            {/* Desktop Content Area */}
            <div className="p-8">
              <div className="grid grid-cols-1 gap-8 w-fit">
                <div className="flex flex-col items-center gap-2 group cursor-default">
                  <div className="w-16 h-16 rounded-xl bg-blue-500/80 glass shadow-lg flex items-center justify-center transition-all active:scale-95 group-hover:brightness-110">
                    <div className="w-8 h-8 border-4 border-white rounded-full bg-white/20" />
                  </div>
                  <span className="text-white text-[11px] font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/_60%)]">Macintosh HD</span>
                </div>
              </div>
            </div>
          </Desktop>
          <Dock />
        </div>
      </WindowProvider>
    </SettingsProvider>
  )
}
