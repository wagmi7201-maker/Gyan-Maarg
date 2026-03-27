from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import SignupSerializer, LoginSerializer, UserProfileSerializer

User = get_user_model()


# ================== HEALTH CHECK ==================
def wake_up(request):
    return JsonResponse({"status": "backend awake"})


# .............................................. SIGNUP ...............................................
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "success": True,
                "user": UserProfileSerializer(user).data,
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
            }, status=201)
        return Response({
            "success": False,
            "error": serializer.errors
        }, status=400)


# ....................................... LOGIN ...................................................
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = User.objects.get(email=email)
                if user.check_password(password):
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "user": UserProfileSerializer(user).data,
                        "tokens": {
                            "refresh": str(refresh),
                            "access": str(refresh.access_token),
                        },
                    })
                else:
                    return Response({"error": "Invalid credentials"}, status=401)
            except User.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=401)
        return Response(serializer.errors, status=400)


class GenerateRoadmapView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        level = request.data.get("student_level") or request.data.get("level")
        goal = request.data.get("target_career") or request.data.get("goal")
        current_skills = request.data.get("current_skills")
        skills_raw = request.data.get("skills")

        if not level or not goal:
            return Response(
                {"error": "Both level and goal are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        skills_list = []
        if isinstance(current_skills, list):
            skills_list = [str(s).strip() for s in current_skills if str(s).strip()]
        elif isinstance(skills_raw, list):
            skills_list = [str(s).strip() for s in skills_raw if str(s).strip()]
        elif isinstance(skills_raw, str):
            skills_list = [
                s.strip()
                for s in skills_raw.split(",")
                if s.strip() and s.strip().lower() != "none"
            ]

        skills_for_ai = ", ".join(skills_list) if skills_list else "none"
        ai_result = generate_ai_roadmap(level, skills_for_ai, goal)

        if isinstance(ai_result, dict) and ai_result.get("error"):
            # Fallback roadmap so frontend still works when external AI API fails.
            fallback_topics = {
                "beginner": ["Fundamentals", "Core Concepts", "Hands-on Practice", "Mini Tasks"],
                "intermediate": ["Advanced Concepts", "Problem Solving", "Applied Practice", "Portfolio Work"],
                "advanced": ["System Design", "Optimization", "Real-world Scenarios", "Expert Practice"],
            }
            topic_set = fallback_topics.get(str(level).lower(), fallback_topics["beginner"])
            phases = []
            for month in range(1, 7):
                phases.append(
                    {
                        "phase_number": month,
                        "title": f"Month {month}: {goal} Focus",
                        "description": f"Structured learning focus for month {month}",
                        "duration_months": 1,
                        "skills": topic_set,
                        "projects": [],
                        "resources": [],
                        "milestones": [],
                    }
                )

            return Response(
                {
                    "student_level": level,
                    "current_skills": skills_list,
                    "target_career": goal,
                    "roadmap_phases": phases,
                    "estimated_total_months": 6,
                    "success_tips": [
                        "Practice consistently each week.",
                        "Track progress and revise weak topics.",
                        "Build one mini practical output every month.",
                    ],
                    "warning": "AI service unavailable; fallback roadmap generated.",
                },
                status=status.HTTP_200_OK,
            )

        roadmap_items = ai_result.get("roadmap", []) if isinstance(ai_result, dict) else []
        role = ai_result.get("role", goal) if isinstance(ai_result, dict) else goal
        duration = ai_result.get("duration", "") if isinstance(ai_result, dict) else ""

        estimated_total_months = max(len(roadmap_items), 1)
        if isinstance(duration, str):
            match = re.search(r"(\d+)(?:\s*-\s*(\d+))?", duration)
            if match:
                start = int(match.group(1))
                end = int(match.group(2)) if match.group(2) else start
                estimated_total_months = max(round((start + end) / 2), 1)

        phases = []
        for idx, item in enumerate(roadmap_items):
            month_no = item.get("month", idx + 1)
            topics = item.get("topics", [])
            if not isinstance(topics, list):
                topics = []
            phases.append(
                {
                    "phase_number": month_no,
                    "title": item.get("title", f"Month {month_no}"),
                    "description": f"Focus areas for month {month_no}",
                    "duration_months": 1,
                    "skills": topics,
                    "projects": [],
                    "resources": [],
                    "milestones": [],
                }
            )

        response_payload = {
            "student_level": level,
            "current_skills": skills_list,
            "target_career": role,
            "roadmap_phases": phases,
            "estimated_total_months": estimated_total_months,
            "success_tips": [
                "Stay consistent and track your progress weekly.",
                "Revise previous concepts before moving to the next phase.",
                "Practice each topic with small hands-on tasks.",
            ],
        }
        return Response(response_payload, status=status.HTTP_200_OK)







###### ------------------------- AI Roadmap ----------------------------------------------
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
