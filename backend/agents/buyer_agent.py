import os
from datetime import datetime
from agents.base import call_claude

DEMO_BUYERS = [
    {"name": "Kampala Fresh Produce Ltd", "crops": ["maize","beans","tomatoes"], "location": "Nakawa, Kampala", "distance_km": 15, "premium_pct": 8, "min_kg": 200, "rating": 4.8, "contact": "+256 700 123456", "payment": "Cash + Mobile Money"},
    {"name": "Katende Grain Traders", "crops": ["maize","beans","cassava"], "location": "Owino Market, Kampala", "distance_km": 22, "premium_pct": 5, "min_kg": 500, "rating": 4.5, "contact": "+256 752 234567", "payment": "MTN Mobile Money"},
    {"name": "Uganda Coffee Processors", "crops": ["coffee"], "location": "Industrial Area, Kampala", "distance_km": 25, "premium_pct": 12, "min_kg": 100, "rating": 4.9, "contact": "+256 783 345678", "payment": "Bank transfer 48hrs"},
    {"name": "Rolex Supermarkets Chain", "crops": ["tomatoes","bananas","beans"], "location": "Multiple, Kampala", "distance_km": 18, "premium_pct": 15, "min_kg": 50, "rating": 4.7, "contact": "+256 701 456789", "payment": "Airtel Money + Cash"},
    {"name": "Jinja Milling Company", "crops": ["maize","cassava"], "location": "Jinja Town", "distance_km": 82, "premium_pct": 3, "min_kg": 1000, "rating": 4.3, "contact": "+256 774 567890", "payment": "Cheque or bank transfer"},
]

def find_buyers(crop: str) -> list:
    crop_lower = crop.lower()
    return [b for b in DEMO_BUYERS if any(crop_lower in c or c in crop_lower for c in b["crops"])]

def run_buyer_agent(user_message: str, crop_hint: str = None) -> str:
    detected_crop = crop_hint
    if not detected_crop:
        for crop in ["maize","beans","coffee","tomatoes","bananas","cassava"]:
            if crop in user_message.lower():
                detected_crop = crop
                break

    if detected_crop:
        buyers = find_buyers(detected_crop)
        buyers_text = f"Buyers for {detected_crop}:\n"
        for b in buyers:
            buyers_text += f"\n- {b['name']} ({b['location']}): {b['premium_pct']}% above market, min {b['min_kg']}kg, {b['distance_km']}km away, rating {b['rating']}/5, pays via {b['payment']}, contact: {b['contact']}"
    else:
        buyers_text = "No specific crop detected. Ask the farmer which crop they want to sell."

    system_prompt = f"""You are the Buyer Matching Agent for AgroMarket AI.
Match farmers with the best buyers for their crops.

Always recommend TOP 3 buyers ranked by: highest price, lowest minimum quantity, closest distance.
Be honest about trade-offs. Mention payment methods.

Buyers data: {buyers_text}
Today: {datetime.now().strftime("%B %d, %Y")}"""

    return call_claude(system_prompt, user_message)
