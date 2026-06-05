"use client";
import Link from "next/link";
import { TrendingUp, Users, Leaf, DollarSign, Truck, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";

const agents = [
  { icon: TrendingUp, name: "Market Intelligence", desc: "Real-time crop prices across Uganda's markets with 14-day forecasts", color: "bg-green-100 text-green-700" },
  { icon: Users, name: "Buyer Matching", desc: "Connect with verified buyers ranked by price, proximity and reliability", color: "bg-blue-100 text-blue-700" },
  { icon: Leaf, name: "Farm Advisory", desc: "Season-aware planting advice, pest management and best practices", color: "bg-emerald-100 text-emerald-700" },
  { icon: DollarSign, name: "Financial Planning", desc: "Profit calculations, expense tracking and farm financial reports", color: "bg-amber-100 text-amber-700" },
  { icon: Truck, name: "Logistics Support", desc: "Transport options, route optimization and cost comparison", color: "bg-orange-100 text-orange-700" },
];

const stats = [
  { value: "3.5M", label: "Ugandan Farmers" },
  { value: "42%", label: "Price Gap Closed" },
  { value: "5", label: "AI Agents" },
  { value: "6+", label: "Crops Covered" },
];

const crops = [
  { name: "Maize", price: "UGX 1,200/kg", trend: "↑", market: "St. Balikuddembe" },
  { name: "Beans", price: "UGX 3,400/kg", trend: "↑", market: "Owino Market" },
  { name: "Coffee", price: "UGX 9,200/kg", trend: "↑", market: "Coffee Exchange" },
  { name: "Tomatoes", price: "UGX 2,000/kg", trend: "→", market: "St. Balikuddembe" },
  { name: "Bananas", price: "UGX 450/kg", trend: "↑", market: "St. Balikuddembe" },
  { name: "Cassava", price: "UGX 600/kg", trend: "→", market: "Owino Market" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-green-800 text-lg">AgroMarket AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/market" className="hover:text-green-700">Market Prices</Link>
            <Link href="/chat" className="hover:text-green-700">AI Advisor</Link>
            <Link href="/dashboard" className="hover:text-green-700">Dashboard</Link>
          </div>
          <div className="flex gap-2">
            <Link href="/chat" className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-700 rounded-full px-3 py-1 text-sm mb-4">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              5 AI Agents · Built on Claude AI · Google Cloud Hackathon
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Stop Selling Cheap.<br />
              <span className="text-green-300">Start Selling Smart.</span>
            </h1>
            <p className="text-green-100 text-lg mb-8 max-w-2xl">
              AgroMarket AI connects Uganda's smallholder farmers to the best buyers, real-time market prices, 
              and expert agricultural advice — powered by 5 specialized AI agents.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/chat" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                Talk to AI Advisor <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/market" className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                View Market Prices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-green-700">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Prices Ticker */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Today's Best Prices</h2>
            <Link href="/market" className="text-green-700 text-sm font-medium hover:underline flex items-center gap-1">
              View all markets <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {crops.map((crop) => (
              <div key={crop.name} className="price-card bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer">
                <div className="font-semibold text-gray-800 text-sm">{crop.name}</div>
                <div className="text-green-700 font-bold mt-1">{crop.price}</div>
                <div className={`text-xs mt-1 ${crop.trend === "↑" ? "text-green-600" : "text-gray-500"}`}>
                  {crop.trend} {crop.market}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">5 AI Agents Working For You</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Each agent is specialized for a specific farming challenge — all accessible through one simple chat interface.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {agents.map((agent) => (
              <div key={agent.name} className="rounded-xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all cursor-pointer">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${agent.color}`}>
                  <agent.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2">{agent.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-green-300" />
          <h2 className="text-3xl font-bold mb-3">Ask Your AI Farm Advisor Now</h2>
          <p className="text-green-100 mb-6">Type or speak your farming question in English or Luganda. Get expert advice in seconds.</p>
          <div className="flex flex-wrap gap-2 justify-center mb-6 text-sm">
            {["What's the price of maize today?", "Who can buy my beans?", "What should I plant this season?", "Calculate my farm profit"].map((q) => (
              <span key={q} className="bg-green-600 rounded-full px-3 py-1 text-green-100">{q}</span>
            ))}
          </div>
          <Link href="/chat" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors">
            Start Chatting Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">AgroMarket AI</span>
          </div>
          <div className="text-sm text-center">Built for Google Cloud Rapid Agent Hackathon · Powered by Claude AI · Made in Uganda 🇺🇬</div>
          <div className="flex gap-4 text-sm">
            <Link href="/chat" className="hover:text-white">AI Chat</Link>
            <Link href="/market" className="hover:text-white">Prices</Link>
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
