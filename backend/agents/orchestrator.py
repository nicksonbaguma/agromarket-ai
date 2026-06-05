import os
from agents.base import call_claude
from agents.market_agent import run_market_agent
from agents.advisory_agent import run_advisory_agent
from agents.financial_agent import run_financial_agent
from agents.buyer_agent import run_buyer_agent
from agents.logistics_agent import run_logistics_agent

def classify_intent(message: str) -> str:
    system_prompt = """You are a routing classifier for AgroMarket AI.
Given a farmer's message, respond with ONLY one word — the agent that should handle it.

Agents:
- market: crop prices, market rates, price trends, when to sell, best markets
- advisory: farming advice, planting, pests, diseases, what to grow, soil, fertilizer
- financial: profit, costs, expenses, budgets, loans, income calculations
- buyer: finding buyers, who to sell to, buyer contacts
- logistics: transport, delivery, moving crops, transport costs, routes

Respond with ONLY one word. Default to advisory if unclear."""

    result = call_claude(system_prompt, message)
    agent = result.strip().lower().split()[0]
    valid = ["market", "advisory", "financial", "buyer", "logistics"]
    return agent if agent in valid else "advisory"

def route_message(message: str, agent_override: str = None) -> dict:
    if agent_override and agent_override != "auto":
        agent = agent_override
    else:
        agent = classify_intent(message)

    agent_functions = {
        "market": run_market_agent,
        "advisory": run_advisory_agent,
        "financial": run_financial_agent,
        "buyer": run_buyer_agent,
        "logistics": run_logistics_agent,
    }

    fn = agent_functions.get(agent, run_advisory_agent)
    reply = fn(message)
    return {"agent_used": agent, "reply": reply}
