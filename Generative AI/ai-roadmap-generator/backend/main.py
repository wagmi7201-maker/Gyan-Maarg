from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
import re
import os
from dotenv import load_dotenv
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
app = FastAPI()

# ✅ CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API KEY ( move to .env in production)



# Input Schema
class UserInput(BaseModel):
    level: str
    skills: str
    goal: str


# AI Roadmap Generator
def generate_ai_roadmap(level, skills, goal):
    prompt = f"""
    Generate a career roadmap.

    Level: {level}
    Skills: {skills if skills != "none" else "No prior skills"}
    Goal: {goal}

    IMPORTANT:
    - Decide roadmap duration based on:
    1. User skill level
    2. Complexity of the career goal

    RULES:
    - Beginner + complex goal → longer roadmap (8–12 months)
    - Intermediate → medium roadmap (6–8 months)
    - Advanced → shorter roadmap (4–6 months)

    STRICT INSTRUCTIONS:
    - Only generate learning roadmap
    - No projects, no courses, no jobs, no industry demand
    - Month-wise structured format
    - Each month must include:
    - month number
    - title
    - 3–5 topics

    Return STRICT JSON only:

    {{
    "role": "{goal}",
    "duration": "X months",
    "roadmap": [
        {{
        "month": 1,
        "title": "Topic Name",
        "topics": ["topic1", "topic2"]
        }}
    ]
    }}
"""

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.5
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        result = response.json()

        # If API fails
        if "choices" not in result:
            return {"error": "AI service failed"}

        content = result["choices"][0]["message"]["content"]

        content = re.sub(r"```json|```", "", content).strip()

        # Clean markdown (important fix)
        match = re.search(r"\{.*\}", content, re.DOTALL)

        if not match:
            return {"error": "AI did not return valid JSON"}

        clean_json = match.group(0)

        try:
            return json.loads(clean_json)
        except:
            return {"error": "Invalid JSON from AI"}

    except Exception as e:
        return {"error": str(e)}
    


@app.get("/suggest")
def suggest_roles(query: str):
    prompt = f"""
    Suggest 5 career roles related to: {query}
    Only return a JSON array of role names.
    Example:
    ["Data Analyst", "Data Scientist"]
    """

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.3
    }

    try:
        res = requests.post(url, headers=headers, json=data)
        result = res.json()

        content = result["choices"][0]["message"]["content"]

        # clean JSON
        content = re.sub(r"```json|```", "", content).strip()
        return json.loads(content)

    except:
        return []




# API Endpoint
@app.post("/generate")
def generate(data: UserInput):
    return generate_ai_roadmap(data.level, data.skills, data.goal)