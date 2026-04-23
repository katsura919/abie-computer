"use client"

import React from "react"
import { ExternalLink } from "lucide-react"

const SOCIALS = [
  {
    platform: "Instagram",
    handle: "@abiemaxey",
    tag: "Aesthetic Realism",
    url: "https://instagram.com/abiemaxey",
    logo: "https://cdn.simpleicons.org/instagram/E1306C",
    bg: "bg-[#1a0a10]",
  },
  {
    platform: "Threads",
    handle: "@abiemaxey",
    tag: "Engage",
    url: "https://threads.net/@abiemaxey",
    logo: "https://cdn.simpleicons.org/threads/ffffff",
    bg: "bg-[#101010]",
  },
  {
    platform: "YouTube",
    handle: "@abiemaxey",
    tag: "Vlogs",
    url: "https://youtube.com/@abiemaxey",
    logo: "https://cdn.simpleicons.org/youtube/FF0000",
    bg: "bg-[#1a0000]",
  },
  {
    platform: "TikTok",
    handle: "@happyvoyager",
    tag: "Discovery",
    url: "https://tiktok.com/@happyvoyager",
    logo: "https://cdn.simpleicons.org/tiktok/ffffff",
    bg: "bg-[#010101]",
  },
  {
    platform: "LinkedIn",
    handle: "/in/abiemaxey",
    tag: "B2B",
    url: "https://linkedin.com/in/abiemaxey",
    logo: "https://cdn.simpleicons.org/linkedin/0A66C2",
    bg: "bg-[#00111a]",
  },
]

export function Contact() {
  return (
    <div className="p-6 flex flex-col gap-8 overflow-auto h-full pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Contact & Socials</h1>
        <p className="text-sm text-foreground/50 leading-relaxed max-w-xl">
          Find me across platforms — from business conversations on LinkedIn to creative content on Instagram and TikTok.
        </p>
      </div>

      {/* Find Me On */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">
            Find Me On
          </h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="flex flex-col gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass border border-white/5 hover:border-white/20 transition-all group"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0 shadow-lg border border-white/5`}
              >
                <img
                  src={s.logo}
                  alt={s.platform}
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="text-[13px] font-semibold text-foreground leading-none">
                  {s.platform}
                </span>
                <span className="text-[12px] text-foreground/50">{s.handle}</span>
              </div>

              {/* Tag */}
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/25 group-hover:text-foreground/50 transition-colors shrink-0">
                {s.tag}
              </span>

              {/* Arrow */}
              <ExternalLink className="w-3.5 h-3.5 text-foreground/20 group-hover:text-foreground/60 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
