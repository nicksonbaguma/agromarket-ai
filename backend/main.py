from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from agents.orchestrator import route_message
import os

load_dotenv()

app = FastAPI(
    title="AgroMarket AI API",
    description="5 Claude AI agents serving Uganda's smallholder farmers",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    agent: str = "auto"
    user_id: str = "anonymous"

class ChatResponse(BaseModel):
    reply: str
    agent_used: str
    status: str = "success"

@app.get("/")
def root():
    return {
        "name": "AgroMarket AI",
        "version": "1.0.0",
        "status": "running",
        "agents": ["market", "advisory", "financial", "buyer", "logistics"]
    }

@app.get("/health")
def health():
    return {"status": "healthy", "api_key_set": bool(os.getenv("ANTHROPIC_API_KEY"))}

@app.post("/api/v1/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    if not os.getenv("ANTHROPIC_API_KEY"):
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY not configured")
    try:
        result = route_message(
            message=request.message,
            agent_override=request.agent
        )
        return ChatResponse(
            reply=result["reply"],
            agent_used=result["agent_used"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/prices/{crop}")
def get_prices(crop: str):
    from agents.market_agent import get_market_prices
    data = get_market_prices(crop)
    if not data["found"]:
        raise HTTPException(status_code=404, detail=f"No price data for '{crop}'")
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
