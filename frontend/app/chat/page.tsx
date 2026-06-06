"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, Leaf, TrendingUp, Users, DollarSign, Truck, ArrowLeft, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
const API_URL = "https://bagumanickson-agromarket-ai-backend.hf.space";

const AGENTS = [
  { id: "auto", label: "Smart Route", icon: Bot, color: "bg-gray-100 text-gray-700" },
  { id: "market", label: "Market", icon: TrendingUp, color: "bg-green-100 text-green-700" },
  { id: "advisory", label: "Advisory", icon: Leaf, color: "bg-emerald-100 text-emerald-700" },
  { id: "financial", label: "Finance", icon: DollarSign, color: "bg-amber-100 text-amber-700" },
  { id: "buyer", label: "Buyers", icon: Users, color: "bg-blue-100 text-blue-700" },
  { id: "logistics", label: "Logistics", icon: Truck, color: "bg-orange-100 text-orange-700" },
];

const SUGGESTIONS = [
  "What is the price of maize in Kampala today?",
  "I have 500kg of beans, who can I sell to?",
  "What should I plant in Wakiso this season?",
  "Calculate profit for 1 acre of maize",
  "How do I transport tomatoes to Kampala cheaply?",
  "What pests affect beans in Uganda?",
];

type Message = {
  role: "user" | "assistant";
  content: string;
  agent?: string;
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Osiibire! 👋 I'm your AgroMarket AI advisor. I have 5 specialized agents ready to help you with market prices, finding buyers, farm advice, financial planning, and logistics.\n\nWhat can I help you with today?",
      agent: "auto",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("auto");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMsg: Message = {
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, agent: selectedAgent }),
      });

      const data = await response.json();

      const assistantMsg: Message = {
        role: "assistant",
        content: data.reply || data.detail || "Sorry, I could not process that request.",
        agent: data.agent_used,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Connection error. Make sure the backend server is running on port 8000.",
        agent: "error",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const agentColors: Record<string, string> = {
    market: "bg-green-100 text-green-800",
    advisory: "bg-emerald-100 text-emerald-800",
    financial: "bg-amber-100 text-amber-800",
    buyer: "bg-blue-100 text-blue-800",
    logistics: "bg-orange-100 text-orange-800",
    auto: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">AgroMarket AI Advisor</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                5 agents online
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Selector */}
      <div className="bg-white border-b border-gray-100 px-4 py-2">
        <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto pb-1">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedAgent === agent.id
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <agent.icon className="w-3 h-3" />
              {agent.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 agent-bubble ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "user" ? "bg-green-700" : "bg-gray-200"
              }`}>
                {msg.role === "user"
                  ? <User className="w-4 h-4 text-white" />
                  : <Bot className="w-4 h-4 text-gray-600" />
                }
              </div>
              <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {msg.agent && msg.role === "assistant" && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${agentColors[msg.agent] || agentColors.auto}`}>
                    {msg.agent} agent
                  </span>
                )}
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-green-700 text-white rounded-tr-sm"
                    : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm"
                }`}>
                  <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-strong:text-gray-800 prose-ul:my-1 prose-li:my-0"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:"0ms"}}></span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:"150ms"}}></span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:"300ms"}}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2">
          <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto pb-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full whitespace-nowrap hover:border-green-400 hover:text-green-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about prices, buyers, planting advice..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
