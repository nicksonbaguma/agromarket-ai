"use client";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Leaf } from "lucide-react";

const MARKET_DATA = [
  { crop: "Maize", icon: "🌽", markets: [
    { name: "St. Balikuddembe, Kampala", price: 1200, trend: "rising" },
    { name: "Owino Market, Kampala", price: 1150, trend: "stable" },
    { name: "Jinja Main Market", price: 980, trend: "falling" },
    { name: "Mbarara Market", price: 920, trend: "rising" },
    { name: "Gulu Market", price: 850, trend: "stable" },
  ]},
  { crop: "Beans", icon: "🫘", markets: [
    { name: "St. Balikuddembe, Kampala", price: 3400, trend: "rising" },
    { name: "Owino Market, Kampala", price: 3200, trend: "rising" },
    { name: "Jinja Main Market", price: 2900, trend: "stable" },
    { name: "Mbarara Market", price: 2800, trend: "falling" },
    { name: "Gulu Market", price: 2600, trend: "stable" },
  ]},
  { crop: "Coffee", icon: "☕", markets: [
    { name: "Kampala Coffee Exchange", price: 9200, trend: "rising" },
    { name: "Owino Market, Kampala", price: 8500, trend: "rising" },
    { name: "Jinja Main Market", price: 7800, trend: "stable" },
  ]},
  { crop: "Tomatoes", icon: "🍅", markets: [
    { name: "St. Balikuddembe, Kampala", price: 2000, trend: "stable" },
    { name: "Owino Market, Kampala", price: 1800, trend: "falling" },
    { name: "Mbarara Market", price: 1600, trend: "stable" },
    { name: "Jinja Main Market", price: 1500, trend: "falling" },
  ]},
  { crop: "Bananas", icon: "🍌", markets: [
    { name: "St. Balikuddembe, Kampala", price: 450, trend: "rising" },
    { name: "Owino Market, Kampala", price: 400, trend: "stable" },
    { name: "Masaka Market", price: 300, trend: "stable" },
  ]},
  { crop: "Cassava", icon: "🥔", markets: [
    { name: "Owino Market, Kampala", price: 600, trend: "stable" },
    { name: "Gulu Market", price: 450, trend: "stable" },
    { name: "Lira Market", price: 420, trend: "rising" },
  ]},
];

export default function MarketPage() {
  const getTrendIcon = (trend: string) => {
    if (trend === "rising") return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === "falling") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === "rising") return "text-green-600";
    if (trend === "falling") return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">Market Prices</div>
              <div className="text-xs text-gray-500">Uganda · Updated today</div>
            </div>
          </div>
          <Link href="/chat" className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800">
            Ask AI Advisor
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Uganda Crop Prices</h1>
          <p className="text-gray-500 text-sm mt-1">Best prices across major Ugandan markets · All prices in UGX per kg</p>
        </div>

        <div className="space-y-6">
          {MARKET_DATA.map((item) => {
            const best = item.markets.reduce((a, b) => a.price > b.price ? a : b);
            return (
              <div key={item.crop} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h2 className="font-bold text-gray-800">{item.crop}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-green-700 font-bold">Best: UGX {best.price.toLocaleString()}/kg</div>
                    <div className="text-xs text-gray-400">{best.name}</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-50">
                  {item.markets.map((market) => (
                    <div key={market.name} className="px-5 py-3 flex justify-between items-center hover:bg-gray-50">
                      <div className="text-sm text-gray-700">{market.name}</div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {getTrendIcon(market.trend)}
                          <span className={`text-xs ${getTrendColor(market.trend)}`}>{market.trend}</span>
                        </div>
                        <div className={`font-semibold text-sm ${market.price === best.price ? "text-green-700" : "text-gray-700"}`}>
                          UGX {market.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
