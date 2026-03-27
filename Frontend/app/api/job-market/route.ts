import { NextRequest, NextResponse } from "next/server"

type RawJob = {
  job_id?: string
  job_title?: string
  employer_name?: string
  employer_logo?: string
  job_country?: string
  job_location?: string
  job_city?: string
  job_salary?: string
  job_description?: string
  job_apply_link?: string
}

type JobResult = {
  title: string
  company: string
  location: string
  salary: string
  description: string
  skills: string[]
  experience: string
  logo: string
  link: string
}

const RAPIDAPI_HOST = "jsearch.p.rapidapi.com"
const RAPIDAPI_URL = "https://jsearch.p.rapidapi.com/search"
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

function estimateSalary(title: string) {
  const lower = title.toLowerCase()
  if (lower.includes("senior")) return "INR 15-35 LPA"
  if (lower.includes("backend")) return "INR 8-22 LPA"
  return "INR 5-18 LPA"
}

function extractSkills(desc?: string) {
  if (!desc) return ["Software"]

  const common = ["Java", "Spring", "React", "Node", "AWS", "Docker", "SQL"]
  return common.filter((skill) => desc.toLowerCase().includes(skill.toLowerCase()))
}

function extractExperience(desc?: string) {
  if (!desc) return "Not specified"
  const match = desc.match(/\d+\s*years?/i)
  return match ? match[0] : "0-3 years"
}

function companyLogo(company?: string) {
  if (!company) return ""
  const domain = company
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "")
  return domain ? `https://logo.clearbit.com/${domain}.com` : ""
}

async function fetchJobs(query: string, rapidKey: string) {
  const url = new URL(RAPIDAPI_URL)
  url.searchParams.set("query", query)
  url.searchParams.set("page", "1")
  url.searchParams.set("num_pages", "1")

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidKey,
      "X-RapidAPI-Host": RAPIDAPI_HOST,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`JSearch request failed: ${res.status}`)
  }

  const data = (await res.json()) as { data?: RawJob[] }
  return Array.isArray(data.data) ? data.data : []
}

async function getJobs(skills: string, rapidKey: string): Promise<JobResult[]> {
  const jobs = await fetchJobs(`${skills} developer India`, rapidKey)

  let indiaJobs = jobs.filter(
    (j) => j.job_country === "IN" || j.job_location?.toLowerCase().includes("india")
  )

  if (indiaJobs.length < 9) {
    const extra = await fetchJobs(`${skills} software engineer India`, rapidKey)
    indiaJobs = [...indiaJobs, ...extra]
  }

  const unique = new Map<string, RawJob>()
  for (const job of indiaJobs) {
    const key = job.job_id || `${job.job_title || ""}-${job.employer_name || ""}-${job.job_city || ""}`
    if (!unique.has(key)) unique.set(key, job)
  }

  return Array.from(unique.values())
    .slice(0, 9)
    .map((job) => ({
      title: job.job_title || "Software Developer",
      company: job.employer_name || "Unknown Company",
      location: job.job_city || "India",
      salary: job.job_salary || estimateSalary(job.job_title || ""),
      description: job.job_description?.substring(0, 160) || "See job link",
      skills: extractSkills(job.job_description),
      experience: extractExperience(job.job_description),
      logo: job.employer_logo || companyLogo(job.employer_name),
      link: job.job_apply_link || "https://www.naukri.com/",
    }))
}

async function getAIRecommendation(skills: string, goal: string, jobs: JobResult[], groqKey?: string) {
  if (!groqKey) {
    return "AI analysis unavailable. Set GROQ_KEY in your .env file."
  }

  const prompt = `
Act as a professional AI Career Analyst.

User Skills:
${skills}

Career Goal:
${goal}

Jobs:
${JSON.stringify(jobs)}

STRICT FORMAT RULES:

Use this EXACT structure:

SECTION: Best matching careers
- career
- career

SECTION: Skill gaps
- skill
- skill

SECTION: Salary in India
Write one paragraph only.

SECTION: Learning roadmap
- step
- step

SECTION: Market demand
Write one paragraph only.

SECTION: Jobs fit user best
- job
- job

RULES:

Never use numbering inside sections
Never use bold formatting
Never use **
Never use markdown
Never output JSON
Never restart numbering
Use only clean bullet points

Return clean readable report.
`

  const completion = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    }),
  })

  if (!completion.ok) {
    throw new Error(`Groq request failed: ${completion.status}`)
  }

  const data = (await completion.json()) as {
    choices?: { message?: { content?: string } }[]
  }

  return data.choices?.[0]?.message?.content || "AI analysis unavailable"
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { skills?: string; goal?: string }
    const skills = body.skills?.trim() || ""
    const goal = body.goal?.trim() || "Not specified"

    if (!skills) {
      return NextResponse.json({ error: "Skills are required" }, { status: 400 })
    }

    const rapidKey = process.env.RAPID_KEY
    if (!rapidKey) {
      return NextResponse.json(
        { error: "RAPID_KEY is missing. Add it to your environment variables." },
        { status: 500 }
      )
    }

    const jobs = await getJobs(skills, rapidKey)
    const aiRecommendation = await getAIRecommendation(skills, goal, jobs, process.env.GROQ_KEY)

    return NextResponse.json({
      jobs,
      aiRecommendation,
      meta: {
        total: jobs.length,
        source: "RapidAPI JSearch + Groq",
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch job market intelligence"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}