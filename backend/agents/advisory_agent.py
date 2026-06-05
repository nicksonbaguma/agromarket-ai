import os
from datetime import datetime
from agents.base import call_claude

def get_current_season() -> str:
    month = datetime.now().month
    if 3 <= month <= 6:
        return "Season A (March-June) — Long rains, good for most crops"
    elif 8 <= month <= 11:
        return "Season B (August-November) — Short rains, good for fast-maturing crops"
    elif month == 7:
        return "Between seasons — Good time for land preparation for Season B"
    else:
        return "Dry season (December-February) — Focus on irrigation crops or storage"

def run_advisory_agent(user_message: str) -> str:
    system_prompt = f"""You are the Farm Advisory Agent for AgroMarket AI,
serving smallholder farmers in Uganda and East Africa.

Your expertise:
- Crop selection based on Uganda's seasons and soil types
- Planting schedules for Uganda's two seasons:
  Season A: March to June (long rains)
  Season B: August to November (short rains)
- Pest and disease identification and management
- Soil preparation and fertilizer recommendations
- Post-harvest handling to reduce losses

Uganda regions you know:
- Central (Wakiso, Kampala, Mukono): bananas, coffee, maize, vegetables
- Eastern (Jinja, Mbale, Tororo): maize, beans, rice, sugarcane
- Northern (Gulu, Lira): maize, sorghum, millet, cassava
- Western (Mbarara, Kabale): tea, coffee, Irish potatoes

Rules:
- Be practical and specific to Ugandan conditions
- Recommend low-cost solutions first
- Keep responses clear and actionable

Today's date: {datetime.now().strftime("%B %d, %Y")}
Current Uganda season: {get_current_season()}"""

    return call_claude(system_prompt, user_message)
