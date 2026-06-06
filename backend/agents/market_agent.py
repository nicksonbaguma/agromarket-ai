import os
from datetime import datetime
from agents.base import call_claude

MARKET_PRICES = {
    "maize": [
        {"market": "Owino Market, Kampala", "price": 1150, "trend": "stable"},
        {"market": "St. Balikuddembe, Kampala", "price": 1200, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 980, "trend": "falling"},
        {"market": "Gulu Market", "price": 850, "trend": "stable"},
        {"market": "Mbarara Market", "price": 920, "trend": "rising"},
    ],
    "beans": [
        {"market": "Owino Market, Kampala", "price": 3200, "trend": "rising"},
        {"market": "St. Balikuddembe, Kampala", "price": 3400, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 2900, "trend": "stable"},
        {"market": "Gulu Market", "price": 2600, "trend": "stable"},
        {"market": "Mbarara Market", "price": 2800, "trend": "falling"},
    ],
    "coffee": [
        {"market": "Kampala Coffee Exchange", "price": 9200, "trend": "rising"},
        {"market": "Owino Market, Kampala", "price": 8500, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 7800, "trend": "stable"},
        {"market": "Mbarara Market", "price": 7500, "trend": "rising"},
    ],
    "tomatoes": [
        {"market": "St. Balikuddembe, Kampala", "price": 2000, "trend": "stable"},
        {"market": "Owino Market, Kampala", "price": 1800, "trend": "falling"},
        {"market": "Mbarara Market", "price": 1600, "trend": "stable"},
        {"market": "Jinja Main Market", "price": 1500, "trend": "falling"},
    ],
    "bananas": [
        {"market": "St. Balikuddembe, Kampala", "price": 450, "trend": "rising"},
        {"market": "Owino Market, Kampala", "price": 400, "trend": "stable"},
        {"market": "Masaka Market", "price": 300, "trend": "stable"},
        {"market": "Mbarara Market", "price": 350, "trend": "rising"},
    ],
    "cassava": [
        {"market": "Owino Market, Kampala", "price": 600, "trend": "stable"},
        {"market": "Gulu Market", "price": 450, "trend": "stable"},
        {"market": "Lira Market", "price": 420, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 500, "trend": "stable"},
    ],
    "sweet potatoes": [
        {"market": "Owino Market, Kampala", "price": 700, "trend": "rising"},
        {"market": "St. Balikuddembe, Kampala", "price": 750, "trend": "rising"},
        {"market": "Masaka Market", "price": 500, "trend": "stable"},
        {"market": "Mbarara Market", "price": 550, "trend": "stable"},
    ],
    "irish potatoes": [
        {"market": "Owino Market, Kampala", "price": 1100, "trend": "stable"},
        {"market": "St. Balikuddembe, Kampala", "price": 1200, "trend": "rising"},
        {"market": "Kabale Market", "price": 800, "trend": "stable"},
        {"market": "Mbarara Market", "price": 950, "trend": "rising"},
    ],
    "groundnuts": [
        {"market": "Owino Market, Kampala", "price": 4500, "trend": "rising"},
        {"market": "St. Balikuddembe, Kampala", "price": 4800, "trend": "rising"},
        {"market": "Gulu Market", "price": 3800, "trend": "stable"},
        {"market": "Lira Market", "price": 3600, "trend": "stable"},
    ],
    "soybeans": [
        {"market": "Owino Market, Kampala", "price": 2200, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 2000, "trend": "stable"},
        {"market": "Lira Market", "price": 1800, "trend": "rising"},
        {"market": "Gulu Market", "price": 1750, "trend": "stable"},
    ],
    "onions": [
        {"market": "St. Balikuddembe, Kampala", "price": 2500, "trend": "falling"},
        {"market": "Owino Market, Kampala", "price": 2200, "trend": "falling"},
        {"market": "Jinja Main Market", "price": 2000, "trend": "stable"},
        {"market": "Mbarara Market", "price": 1800, "trend": "stable"},
    ],
    "rice": [
        {"market": "Owino Market, Kampala", "price": 3800, "trend": "stable"},
        {"market": "St. Balikuddembe, Kampala", "price": 4000, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 3500, "trend": "stable"},
        {"market": "Lira Market", "price": 3200, "trend": "rising"},
    ],
    "avocados": [
        {"market": "St. Balikuddembe, Kampala", "price": 1500, "trend": "rising"},
        {"market": "Owino Market, Kampala", "price": 1200, "trend": "rising"},
        {"market": "Masaka Market", "price": 800, "trend": "stable"},
        {"market": "Mbarara Market", "price": 900, "trend": "rising"},
    ],
    "sorghum": [
        {"market": "Gulu Market", "price": 1100, "trend": "stable"},
        {"market": "Lira Market", "price": 1000, "trend": "rising"},
        {"market": "Owino Market, Kampala", "price": 1300, "trend": "stable"},
        {"market": "Soroti Market", "price": 950, "trend": "stable"},
    ],
    "millet": [
        {"market": "Gulu Market", "price": 1400, "trend": "rising"},
        {"market": "Lira Market", "price": 1300, "trend": "rising"},
        {"market": "Owino Market, Kampala", "price": 1600, "trend": "stable"},
        {"market": "Soroti Market", "price": 1200, "trend": "stable"},
    ],
    "sunflower": [
        {"market": "Lira Market", "price": 1800, "trend": "rising"},
        {"market": "Gulu Market", "price": 1700, "trend": "rising"},
        {"market": "Owino Market, Kampala", "price": 2000, "trend": "stable"},
        {"market": "Soroti Market", "price": 1600, "trend": "stable"},
    ],
    "eggs": [
        {"market": "Owino Market, Kampala", "price": 350, "trend": "stable"},
        {"market": "St. Balikuddembe, Kampala", "price": 380, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 320, "trend": "stable"},
        {"market": "Mbarara Market", "price": 300, "trend": "stable"},
    ],
    "chicken": [
        {"market": "Owino Market, Kampala", "price": 18000, "trend": "rising"},
        {"market": "St. Balikuddembe, Kampala", "price": 20000, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 15000, "trend": "stable"},
        {"market": "Mbarara Market", "price": 14000, "trend": "stable"},
    ],
    "goats": [
        {"market": "Owino Market, Kampala", "price": 180000, "trend": "rising"},
        {"market": "Mbarara Market", "price": 150000, "trend": "stable"},
        {"market": "Gulu Market", "price": 130000, "trend": "stable"},
        {"market": "Jinja Main Market", "price": 160000, "trend": "rising"},
    ],
    "pigs": [
        {"market": "Owino Market, Kampala", "price": 350000, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 300000, "trend": "stable"},
        {"market": "Mbarara Market", "price": 280000, "trend": "rising"},
        {"market": "Masaka Market", "price": 260000, "trend": "stable"},
    ],
    "cattle": [
        {"market": "Owino Market, Kampala", "price": 2500000, "trend": "rising"},
        {"market": "Mbarara Livestock Market", "price": 2200000, "trend": "rising"},
        {"market": "Gulu Livestock Market", "price": 1800000, "trend": "stable"},
        {"market": "Jinja Livestock Market", "price": 2000000, "trend": "stable"},
    ],
    "fish": [
        {"market": "Owino Market, Kampala", "price": 8000, "trend": "rising"},
        {"market": "St. Balikuddembe, Kampala", "price": 9000, "trend": "rising"},
        {"market": "Jinja Fish Market", "price": 6000, "trend": "stable"},
        {"market": "Entebbe Fish Market", "price": 7000, "trend": "stable"},
    ],
    "milk": [
        {"market": "Kampala (wholesale)", "price": 1200, "trend": "stable"},
        {"market": "Mbarara (wholesale)", "price": 900, "trend": "rising"},
        {"market": "Jinja (wholesale)", "price": 1000, "trend": "stable"},
        {"market": "Gulu (wholesale)", "price": 850, "trend": "stable"},
    ],
    "honey": [
        {"market": "Owino Market, Kampala", "price": 15000, "trend": "rising"},
        {"market": "St. Balikuddembe, Kampala", "price": 18000, "trend": "rising"},
        {"market": "Mbarara Market", "price": 12000, "trend": "stable"},
        {"market": "Gulu Market", "price": 10000, "trend": "stable"},
    ],
}

def get_market_prices(crop: str) -> dict:
    crop_lower = crop.lower().strip()
    for key in MARKET_PRICES:
        if key in crop_lower or crop_lower in key:
            return {"crop": key, "prices": MARKET_PRICES[key], "found": True}
    return {"crop": crop, "prices": [], "found": False}

def run_market_agent(user_message: str, crop_hint: str = None) -> str:
    detected_crop = crop_hint
    if not detected_crop:
        for crop in MARKET_PRICES.keys():
            if crop in user_message.lower():
                detected_crop = crop
                break

    if detected_crop:
        price_data = get_market_prices(detected_crop)
        if price_data["found"]:
            prices_text = "\n".join([
                f"  - {p['market']}: UGX {p['price']:,}/kg ({p['trend']})"
                for p in price_data["prices"]
            ])
            market_data = f"Current {detected_crop} prices:\n{prices_text}"
        else:
            all_crops = ", ".join(MARKET_PRICES.keys())
            market_data = f"No price data for '{detected_crop}'. Available produces: {all_crops}"
    else:
        summary = []
        for crop, prices in MARKET_PRICES.items():
            best = max(prices, key=lambda x: x["price"])
            summary.append(f"{crop}: best price UGX {best['price']:,} at {best['market']}")
        market_data = "Current best prices across all produces:\n" + "\n".join(summary)

    system_prompt = f"""You are the Market Intelligence Agent for AgroMarket AI,
serving farmers in Uganda and East Africa.

You cover ALL agricultural produces including:
- Crops: maize, beans, coffee, tomatoes, bananas, cassava, sweet potatoes, irish potatoes, 
  groundnuts, soybeans, onions, rice, avocados, sorghum, millet, sunflower
- Livestock: cattle, goats, pigs, chicken
- Poultry products: eggs, chicken (live)
- Dairy: milk
- Aquaculture: fish
- Apiculture: honey

Your job:
- Provide current prices in Ugandan Shillings (UGX)
- Note: eggs are per tray (30 eggs), chicken per bird, goats/pigs/cattle per animal, 
  milk per litre, all others per kg
- Identify best markets and price trends
- Give practical advice on when and where to sell

Rules:
- Always be direct and practical
- Always quote prices in UGX with correct units
- Keep responses under 200 words
- End with one clear recommended action

Today's date: {datetime.now().strftime("%B %d, %Y")}
Market data: {market_data}"""

    return call_claude(system_prompt, user_message)
