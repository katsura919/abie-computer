import React from "react"
import { User, Mail, MapPin, ExternalLink, Rocket, Settings, Cpu, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AboutMe() {
  return (
    <div className="p-8 flex flex-col gap-10 text-foreground/90 max-w-4xl mx-auto pb-20">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 border-b border-border/20 pb-10">
        <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-2xl">
          <AvatarImage src="/assets/abie.jpg" alt="Abie Gamao" />
          <AvatarFallback>AG</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight">Joenabie “Abie” Gamao</h1>
          <p className="text-xl text-primary font-semibold">Systems Engineer & Revenue Architect</p>
          <p className="text-muted-foreground italic">"Turning operational chaos into revenue-generating engines."</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full"><Globe className="w-3.5 h-3.5" /> Remote-First</span>
            <span className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full"><Mail className="w-3.5 h-3.5" />hello@abiemaxey.com</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Bio & Overview */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-primary">
              <User className="w-5 h-5" /> Overview
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                I engineer the infrastructure that allows companies to scale. Standing at the intersection of
                technical architecture and business strategy, I design end-to-end systems that eliminate 
                bottlenecks, automate delivery, and standardize growth.
              </p>
              <p>
                My expertise is not just in "managing" processes, but in re-architecting them. I take complex, 
                broken workflows and transform them into automated, low-friction systems that drive clarity and profit.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-primary">
              <Rocket className="w-5 h-5" /> Key Impacts
            </h2>
            <div className="grid gap-4">
              <div className="p-4 rounded-xl glass border-primary/10">
                <h3 className="font-semibold text-foreground mb-1">Revenue Scaling</h3>
                <p className="text-xs text-muted-foreground">Engineered operational systems supporting growth from $300k/mo to $1M/mo ($12M ARR).</p>
              </div>
              <div className="p-4 rounded-xl glass border-primary/10">
                <h3 className="font-semibold text-foreground mb-1">Process Engineering</h3>
                <p className="text-xs text-muted-foreground">Delivered 100+ strategic improvements across Engineering, Product, and Sales pipelines.</p>
              </div>
              <div className="p-4 rounded-xl glass border-primary/10">
                <h3 className="font-semibold text-foreground mb-1">Automation Architecture</h3>
                <p className="text-xs text-muted-foreground">Designed custom CRM-to-Delivery automations (Coda, Zapier, APIs) reducing manual overhead.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Competencies & Socials */}
        <div className="flex flex-col gap-8">
          <section className="p-6 rounded-2xl bg-secondary/30 border border-border/20">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 uppercase tracking-tighter text-xs text-muted-foreground">
              <Cpu className="w-4 h-4" /> Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Strategy", "Systems Architecture", "RevOps", "Business Analysis", "Process Automation", "Low-code Apps", "Discovery"].map(skill => (
                <span key={skill} className="px-2.5 py-1 rounded-md bg-background/50 text-[10px] font-bold border border-border/50 uppercase tracking-tight">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 uppercase tracking-tighter text-xs text-muted-foreground">
              <ExternalLink className="w-4 h-4" /> Connectivity
            </h2>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              <li className="flex items-center justify-between hover:text-primary transition-colors cursor-pointer group p-2 rounded-lg hover:bg-primary/5">
                <span>GitHub</span>
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold">Follow</span>
              </li>
              <li className="flex items-center justify-between hover:text-primary transition-colors cursor-pointer group p-2 rounded-lg hover:bg-primary/5">
                <span>LinkedIn</span>
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold">Connect</span>
              </li>
              <li className="flex items-center justify-between hover:text-primary transition-colors cursor-pointer group p-2 rounded-lg hover:bg-primary/5">
                <span>Twitter</span>
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold">View</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
