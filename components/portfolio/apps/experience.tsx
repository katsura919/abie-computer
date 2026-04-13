import React from "react"
import { Briefcase, Calendar, MapPin, Award, Globe, ExternalLink, Mail } from "lucide-react"

const JOBS = [
  {
    company: "Freelance Systems Engineer & Consultant",
    period: "2019 – Present",
    role: "Self-Employed / Contractor",
    highlights: [
      {
        title: "Appetiser Apps (via ALL X LLC)",
        details: [
          "Engineered scalable systems backbone supporting revenue growth from $300k to $1M+ monthly.",
          "Designed automated workflows (Coda/Hubspot) standardizing delivery across departments.",
          "Led digital transformation aligning cross-continental teams onto a single source of truth.",
          "Won Contributor of the Year (2022) and promoted to Leadership."
        ]
      },
      {
        title: "Brand Strategy & Partnerships",
        details: [
          "Developed digital marketing campaigns for hospitality partners and tourism boards.",
          "Executed content operations driving measurable audience growth."
        ]
      }
    ]
  },
  {
    company: "Founder – Online Tech Shop",
    location: "Philippines",
    period: "2020 – 2021",
    role: "E-Commerce Systems Design",
    details: "Built and operated a profitable D2C tech retail platform. Achieved 30–60% profit margins through automated inventory and supply chain workflows."
  },
  {
    company: "iOS Engineer – Ohmyhome (Nasdaq: OMH)",
    location: "Singapore & Malaysia",
    period: "2017 – 2019",
    role: "Founding Engineer",
    highlights: [
      {
        title: "Core Engineering",
        details: [
          "Sole iOS developer during early-stage growth, building mobile infrastructure from scratch.",
          "Foundation for company's Nasdaq Listing (OMH).",
          "Maintained scalable mobile architecture handling high-volume property transactions."
        ]
      }
    ]
  },
  {
    company: "SAP ABAP Engineer – Accenture",
    location: "Global Delivery Center",
    period: "2016 – 2017",
    role: "Enterprise Development",
    details: "Developed custom SAP-iOS integration solutions for UK Market clients. Managed lifecycle for business-critical iOS applications within the SAP ecosystem."
  }
]

export function Experience() {
  return (
    <div className="p-8 flex flex-col gap-10 max-w-4xl mx-auto pb-20">
      <header className="flex flex-col gap-2 border-b border-border/20 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-primary" /> Professional Experience
        </h1>
        <p className="text-muted-foreground">A history of engineering growth and operational excellence.</p>
      </header>

      <div className="flex flex-col gap-12">
        {JOBS.map((job, i) => (
          <section key={i} className="relative pl-8 border-l-2 border-primary/20 hover:border-primary/50 transition-colors">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-sm" />
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{job.company}</h2>
                  <p className="text-primary font-medium text-sm">{job.role}</p>
                </div>
                <div className="flex flex-col md:items-end gap-1 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {job.period}</span>
                  {job.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>}
                </div>
              </div>

              {job.highlights ? (
                <div className="grid gap-6 mt-2">
                  {job.highlights.map((h, j) => (
                    <div key={j} className="flex flex-col gap-2">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                        <Award className="w-3.5 h-3.5 text-primary/70" /> {h.title}
                      </h3>
                      <ul className="grid gap-2 text-sm text-muted-foreground list-disc pl-5">
                        {h.details.map((d, k) => (
                          <li key={k}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/10 pl-4 py-1">
                  {job.details}
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer Contact */}
      <footer className="mt-10 p-6 rounded-2xl glass border border-primary/10 flex flex-col items-center text-center gap-4">
        <p className="text-sm font-medium">Open to global opportunities</p>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <Globe className="w-4 h-4" /> Spain / USA (Global)
          </span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <Mail className="w-4 h-4" /> hello@abiemaxey.com
          </span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <ExternalLink className="w-4 h-4" /> abiemaxey.com
          </span>
        </div>
      </footer>
    </div>
  )
}
