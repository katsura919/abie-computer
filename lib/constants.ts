import {
  User,
  Settings,
  Briefcase,
  Layout,
  Zap,
  Mail,
  Terminal
} from "lucide-react"

export const APPS = [
  { id: "about", icon: User, label: "About Me", color: "bg-blue-500", description: "Learn about Abie's background and mission." },
  { id: "experience", icon: Briefcase, label: "Experience", color: "bg-gray-700", description: "Professional journey and career highlights." },
  { id: "works", icon: Layout, label: "Works", color: "bg-pink-500", description: "Selected projects and architectural achievements." },
  { id: "skills", icon: Zap, label: "Skills", color: "bg-yellow-500", description: "Technical stack and core competencies." },
  { id: "contact", icon: Mail, label: "Contact", color: "bg-green-500", description: "Get in touch for collaborations." },
  { id: "terminal", icon: Terminal, label: "Terminal", color: "bg-slate-800", description: "Access the system shell and secret commands." },
  { id: "settings", icon: Settings, label: "Settings", color: "bg-gray-400", description: "Configure desktop, theme, and accents." },
]
