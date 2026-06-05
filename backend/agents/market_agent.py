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
        {"market": "Owino Market, Kampala", "price": 8500, "trend": "rising"},
        {"market": "Kampala Coffee Exchange", "price": 9200, "trend": "rising"},
        {"market": "Jinja Main Market", "price": 7800, "trend": "stable"},
    ],
    "tomatoes": [
        {"market": "Owino Market, Kampala", "price": 1800, "trend": "falling"},
        {"market": "St. Balikuddembe, Kampala", "price": 2000, "trend": "stable"},
        {"market": "Jinja Main Market", "price": 1500, "trend": "falling"},
        {"market": "Mbarara Market", "price": 1600, "trend": "stable"},
    ],
    "bananas": [
        {"market": "Owino Market, Kampala", "price": 400, "trend": "stable"},
        {"market": "St. Balikuddembe, Kampala", "price": 450, "trend": "rising"},
        {"market": "Masaka Market", "price": 300, "trend": "stable"},
    ],
    "cassava": [
        {"market": "Owino Market, Kampala", "price": 600, "trend": "stable"},
        {"market": "Gulu Market", "price": 450, "trend": "stable"},
        {"market": "Lira Market", "price": 420, "trend": "rising"},
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
            market_data = f"No price data for '{detected_crop}'. Available crops: {all_crops}"
    else:
        summary = []
        for crop, prices in MARKET_PRICES.items():
            best = max(prices, key=lambda x: x["price"])
            summary.append(f"{crop}: best price UGX {best['price']:,}/kg at {best['market']}")
        market_data = "Current best prices:\n" + "\n".join(summary)

    system_prompt = f"""You are the Market Intelligence Agent for AgroMarket AI,
serving smallholder farmers in Uganda and East Africa.

Your job:
- Provide current crop prices in Ugandan Shillings (UGX) per kilogram
- Identify the best markets to sell specific crops
- Explain price trends (rising/falling/stable) and what they mean for farmers
- Give practical advice on WHEN and WHERE to sell for maximum profit

Rules:
- Always be direct and practical. Farmers need actionable advice.
- Always quote prices in UGX per kg
- Keep responses under 200 words
- End every response with one clear recommended action

Today's date: {datetime.now().strftime("%B %d, %Y")}
Market data: {market_data}"""

    return call_claude(system_prompt, user_message)
