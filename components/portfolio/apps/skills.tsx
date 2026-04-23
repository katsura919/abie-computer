"use client"

import React from "react"

const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      {
        name: "React",
        desc: "Component-driven UIs with hooks, context, and modern patterns.",
        logo: "https://cdn.simpleicons.org/react/61DAFB",
        bg: "bg-[#20232a]",
        level: 5,
      },
      {
        name: "Next.js",
        desc: "Full-stack React framework — SSR, routing, and API layers.",
        logo: "https://cdn.simpleicons.org/nextdotjs/ffffff",
        bg: "bg-black",
        level: 5,
      },
      {
        name: "Vite",
        desc: "Lightning-fast build tool for modern frontend projects.",
        logo: "https://cdn.simpleicons.org/vite/646CFF",
        bg: "bg-[#1a1a2e]",
        level: 5,
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      {
        name: "Node.js",
        desc: "Server-side JS for APIs, scripts, and backend services.",
        logo: "https://cdn.simpleicons.org/nodedotjs/339933",
        bg: "bg-[#1a2e1a]",
        level: 5,
      },
      {
        name: "Supabase",
        desc: "Open-source Firebase alternative — auth, DB, storage, realtime.",
        logo: "https://cdn.simpleicons.org/supabase/3ECF8E",
        bg: "bg-[#1c1c1c]",
        level: 5,
      },
      {
        name: "MongoDB",
        desc: "NoSQL document database for flexible, schema-less data models.",
        logo: "https://cdn.simpleicons.org/mongodb/47A248",
        bg: "bg-[#001E2B]",
        level: 5,
      },
    ],
  },
  {
    id: "automation",
    label: "Automation & Tools",
    skills: [
      {
        name: "Zapier",
        desc: "No-code automation connecting apps and eliminating manual work.",
        logo: "https://cdn.simpleicons.org/zapier/ffffff",
        bg: "bg-[#FF4A00]",
        level: 5,
      },
      {
        name: "Coda",
        desc: "All-in-one doc platform for building internal tools and workflows.",
        logo: "https://cdn.simpleicons.org/coda/ffffff",
        bg: "bg-[#F46A54]",
        level: 5,
      },
      {
        name: "ManyChat",
        desc: "Chat marketing automation for Messenger, Instagram, and SMS.",
        initials: "MC",
        bg: "bg-[#00B2FF]",
        level: 5,
      },
    ],
  },
]

function ProficiencyDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i < level ? "bg-primary" : "bg-white/10"
          }`}
        />
      ))}
    </div>
  )
}

function SkillCard({
  skill,
}: {
  skill: { name: string; desc: string; logo?: string; initials?: string; bg: string; level: number }
}) {
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-xl glass border border-white/5 hover:border-white/15 transition-all">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-lg ${skill.bg} flex items-center justify-center shrink-0 shadow-lg`}
        >
          {skill.logo ? (
            <img
              src={skill.logo}
              alt={skill.name}
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-[10px] font-black text-white tracking-tight">
              {skill.initials}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[13px] font-semibold text-foreground leading-none">
            {skill.name}
          </span>
          <ProficiencyDots level={skill.level} />
        </div>
      </div>
      <p className="text-[11px] text-foreground/40 leading-relaxed">{skill.desc}</p>
    </div>
  )
}

export function Skills() {
  return (
    <div className="p-6 flex flex-col gap-8 overflow-auto h-full pb-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Skills & Stack</h1>
        <p className="text-sm text-foreground/50 leading-relaxed max-w-xl">
          A breakdown of the tools and technologies I use to design systems, build products, and automate operations from frontend interfaces to backend infrastructure and no-code workflows.
        </p>
      </div>

      {CATEGORIES.map((cat) => (
        <section key={cat.id} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">
              {cat.label}
            </h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {cat.skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      ))}

      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <span className="text-[10px] text-foreground/20 uppercase tracking-widest">Proficiency</span>
        <div className="flex items-center gap-2">
          {[
            { label: "Learning", level: 1 },
            { label: "Familiar", level: 3 },
            { label: "Expert", level: 5 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <ProficiencyDots level={item.level} />
              <span className="text-[10px] text-foreground/30">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
