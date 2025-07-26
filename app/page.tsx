"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import ParticleBackground from "@/components/particle-background"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Govid2.0, your smart syllabus guide for Calicut University. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [userMessageCount, setUserMessageCount] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Increment user message count
    setUserMessageCount((prevCount) => prevCount + 1);

    // Determine bot response
    let botResponse = "";
    if (userMessageCount == 4) {
      botResponse = "സമയം കളയാതെ, ദയവായി പോകൂ";
    }
    else if (userMessageCount == 9) {
      botResponse = "ഒന്ന് പോയിത്തരുവോ?";
    }
       else if (input.toLowerCase() === "hi") {
      botResponse = "Hello!";
    } 
    else if (input.toLowerCase() === "hello") {
      botResponse = "Hi!";
    }
    else if (input.toLowerCase() === "good morning") {
      botResponse = "ok";
    }
    else if (input.toLowerCase() === "good evening") {
      botResponse = "ok";
    }
    else if (input.toLowerCase() === "good night") {
      botResponse = "ok";
    }
    else if (input.toLowerCase() === "how are you") {
      botResponse = "I'm fine, thanks";
    }
    else if (input.toLowerCase() === "ok bye") {
      botResponse = "വേഗം പോകൂ";
    }
    else {
      botResponse = "പറയൻ സൗകര്യല്ല്യ";
    }

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <main className="relative flex flex-col h-screen w-full overflow-hidden bg-black">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-red-900/20 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-red-500/5 blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header */}
        <header className="p-4 border-b border-blue-900/30 bg-black/40 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-red-600 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition duration-1000"></div>
                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white/10">
                  <img src="/images/logo.png" alt="Govid2.0 Logo" className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-500 animate-gradient">
                  Govid2.0
                </h1>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-sm text-gray-400 font-mono">Your smart syllabus guide</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-blue-900/50 scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl p-4 animate-fadeIn backdrop-blur-sm",
                    message.sender === "user"
                      ? "bg-gradient-to-br from-red-900/40 to-red-900/20 border border-red-500/30 text-white rounded-tr-none shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                      : "bg-gradient-to-br from-blue-900/40 to-blue-900/20 border border-blue-500/30 text-white rounded-tl-none shadow-[0_0_15px_rgba(59,130,246,0.15)]",
                  )}
                >
                  {message.sender === "bot" && (
                    <div className="flex items-center gap-1 mb-2 text-xs text-blue-400 font-semibold">
                      <Zap className="h-3 w-3" />
                      <span>GOVID2.0</span>
                    </div>
                  )}
                  <p className="font-mono text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs text-gray-400 mt-2 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border border-blue-500/30 text-white rounded-2xl rounded-tl-none p-4 max-w-[80%] backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <div className="flex items-center gap-1 mb-2 text-xs text-blue-400 font-semibold">
                    <Zap className="h-3 w-3" />
                    <span>GOVID2.0</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-blue-900/30 bg-black/40 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2 relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-red-600 rounded-full opacity-75 blur-sm"></div>
              <div className="relative flex w-full gap-2 bg-black/50 rounded-full p-1">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your syllabus..."
                  className="flex-1 bg-gray-900/50 border-none text-white placeholder:text-gray-500 rounded-full px-4 py-3 font-mono text-sm focus:ring-0 focus:outline-none"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
