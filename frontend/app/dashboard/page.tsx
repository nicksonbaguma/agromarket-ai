"use client";
import Link from "next/link";
import { ArrowLeft, Leaf, TrendingUp, DollarSign, Package, MessageCircle, ArrowRight } from "lucide-react";

const recentActivity = [
  { action: "Market query", detail: "Maize prices in Kampala", agent: "market", time: "2 min ago" },
  { action: "Buyer match", detail: "3 buyers found for 500kg beans", agent: "buyer", time: "1 hr ago" },
  { action: "Farm advice", detail: "Planting schedule for Season A", agent: "advisory", time: "3 hrs ago" },
  { action: "Profit calc", detail: "1 acre maize = UGX 1.2M profit", agent: "financial", time: "Yesterday" },
];

const agentColors: Record<string, string> = {
  market: "bg-green-100 text-green-700",
  buyer: "bg-blue-100 text-blue-700",
  advisory: "bg-emerald-100 text-emerald-700",
  financial: "bg-amber-100 text-amber-700",
  logistics: "bg-orange-100 text-orange-700",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="font-semibold text-gray-800">Farmer Dashboard</div>
          </div>
          <Link href="/chat" className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800">
            Ask AI
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-5 text-white mb-6">
          <div className="text-sm text-green-200 mb-1">Welcome back 👋</div>
          <div className="text-xl font-bold">Nalongo Sarah · Wakiso District</div>
          <div className="text-green-200 text-sm mt-1">Season A is active · Good time to sell maize</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: DollarSign, label: "This Month Revenue", value: "UGX 2.1M", color: "text-green-700" },
            { icon: TrendingUp, label: "vs Last Month", value: "+18%", color: "text-green-600" },
            { icon: Package, label: "Active Listings", value: "3 crops", color: "text-blue-700" },
            { icon: MessageCircle, label: "AI Queries Today", value: "7 queries", color: "text-amber-700" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Check Today's Prices", desc: "Maize, beans, coffee & more", href: "/market", color: "border-green-200 hover:border-green-400" },
            { label: "Find Buyers", desc: "Match your crop to verified buyers", href: "/chat", color: "border-blue-200 hover:border-blue-400" },
            { label: "Get Farm Advice", desc: "Ask about planting, pests, harvest", href: "/chat", color: "border-emerald-200 hover:border-emerald-400" },
          ].map((action) => (
            <Link key={action.label} href={action.href} className={`bg-white rounded-xl p-4 border ${action.color} shadow-sm flex justify-between items-center group transition-all`}>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{action.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{action.desc}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-700 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-800">Recent AI Activity</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-5 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${agentColors[item.agent]}`}>
                    {item.agent}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-700">{item.action}</div>
                    <div className="text-xs text-gray-400">{item.detail}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
