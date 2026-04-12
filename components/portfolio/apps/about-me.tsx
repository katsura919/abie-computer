import React from "react"
import { User, Mail, MapPin, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AboutMe() {
  return (
    <div className="p-8 flex flex-col gap-8 text-foreground/90">
      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24 border-4 border-white/20 shadow-xl">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Abie Computer</h1>
          <p className="text-muted-foreground font-medium italic">Full Stack Developer & UI/UX Visionary</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Earth</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> hello@abie.dev</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-2">
            <User className="w-4 h-4" /> Biography
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I build digital experiences that blend aesthetic elegance with technical robustness. 
            Passionate about high-fidelity interfaces and performance indexing.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Currently focused on building intelligent agentic systems and premium web architectures.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-2">
            <ExternalLink className="w-4 h-4" /> Socials
          </h2>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li className="flex items-center justify-between hover:text-primary transition-colors cursor-pointer group">
              <span>GitHub</span>
              <span className="text-xs text-muted-foreground group-hover:block hidden">@abiecomputer</span>
            </li>
            <li className="flex items-center justify-between hover:text-primary transition-colors cursor-pointer group">
              <span>LinkedIn</span>
              <span className="text-xs text-muted-foreground group-hover:block hidden">abie-dev</span>
            </li>
            <li className="flex items-center justify-between hover:text-primary transition-colors cursor-pointer group">
              <span>Twitter</span>
              <span className="text-xs text-muted-foreground group-hover:block hidden">@abiedev</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
