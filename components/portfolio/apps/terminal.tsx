"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Terminal as TerminalIcon } from "lucide-react"

interface HistoryItem {
  type: "command" | "output" | "error"
  content: string
}

const VIRTUAL_FILES = {
  "about.txt": "Systems Engineer & Revenue Architect focusing on operational efficiency.",
  "projects.json": "[\"Abie Computer\", \"Revenue Engine v2\", \"Chaos Mapper\"]",
  "secret.env": "ACCESS_LEVEL=ADMIN\nAPI_KEY=********",
}

export function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", content: "AbieOS v1.0.0 (tty1)" },
    { type: "output", content: "Type 'help' to see available commands." },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const parts = trimmed.split(" ")
    const baseCmd = parts[0]
    const args = parts.slice(1)

    const newHistory: HistoryItem[] = [...history, { type: "command", content: cmd }]

    switch (baseCmd) {
      case "help":
        newHistory.push({ 
          type: "output", 
          content: "Available commands: help, ls, cat, whoami, neofetch, clear, sudo, exit" 
        })
        break
      case "ls":
        newHistory.push({ type: "output", content: Object.keys(VIRTUAL_FILES).join("  ") })
        break
      case "cat":
        const file = args[0]
        if (file && VIRTUAL_FILES[file as keyof typeof VIRTUAL_FILES]) {
          newHistory.push({ type: "output", content: VIRTUAL_FILES[file as keyof typeof VIRTUAL_FILES] })
        } else {
          newHistory.push({ type: "error", content: `cat: ${file || ""}: No such file` })
        }
        break
      case "whoami":
        newHistory.push({ type: "output", content: "abie - The Revenue Architect" })
        break
      case "neofetch":
        newHistory.push({ 
          type: "output", 
          content: `   .--.      Abie@AbieComputer
  |o_o |     -----------------
  |:_/ |     OS: AbieOS v1.0.0
 //   \\ \\    Host: Web Browser
(|     | )   Kernel: React 18
/'\\_   _/\`\\  Uptime: 13m
\\___)=(___/  Shell: zsh` 
        })
        break
      case "clear":
        setHistory([])
        return
      case "sudo":
        if (args[0] === "abie") {
          newHistory.push({ type: "output", content: "Access Granted. You are the architect." })
        } else {
          newHistory.push({ type: "output", content: "Password: ••••••••\nPermission denied." })
        }
        break
      case "exit":
        newHistory.push({ type: "output", content: "Session terminated. Please close window." })
        break
      case "":
        break
      default:
        newHistory.push({ type: "error", content: `command not found: ${baseCmd}` })
    }

    setHistory(newHistory)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput("")
  }

  return (
    <div 
      className="flex flex-col h-full bg-black/90 text-green-400 font-mono text-[13px] p-4 p-2 sm:p-4 overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1 mb-2">
        {history.map((item, i) => (
          <div key={i} className={item.type === "error" ? "text-red-400" : ""}>
            {item.type === "command" && <span className="text-blue-400 mr-2">➜</span>}
            <pre className="whitespace-pre-wrap break-all inline">{item.content}</pre>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-blue-400 shrink-0">➜</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-green-400 p-0"
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  )
}
