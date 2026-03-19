// Mock data for the frontend-only application

export const studentProfile = {
  id: "1",
  name: "Arjun Mehta",
  email: "arjun.mehta@university.edu",
  university: "Indian Institute of Technology, Delhi",
  degree: "B.Tech Computer Science",
  graduationYear: 2026,
  careerInterest: "Full Stack Development",
  avatar: "AM",
}

export const studentSkills = [
  { id: "1", name: "JavaScript", proficiency: 85, source: "Coursework", category: "Programming" },
  { id: "2", name: "React", proficiency: 75, source: "Projects", category: "Frontend" },
  { id: "3", name: "Node.js", proficiency: 65, source: "Self-Learning", category: "Backend" },
  { id: "4", name: "Python", proficiency: 80, source: "Coursework", category: "Programming" },
  { id: "5", name: "SQL", proficiency: 70, source: "Coursework", category: "Database" },
  { id: "6", name: "TypeScript", proficiency: 60, source: "Self-Learning", category: "Programming" },
  { id: "7", name: "Git", proficiency: 85, source: "Projects", category: "Tools" },
  { id: "8", name: "Docker", proficiency: 40, source: "Self-Learning", category: "DevOps" },
]

export const skillGaps = [
  {
    id: "1",
    skill: "System Design",
    currentLevel: 30,
    requiredLevel: 80,
    priority: "High",
    recommendations: ["Design Gurus Course", "System Design Primer Book"],
  },
  {
    id: "2",
    skill: "AWS/Cloud",
    currentLevel: 25,
    requiredLevel: 70,
    priority: "High",
    recommendations: ["AWS Certified Solutions Architect", "Cloud Computing Fundamentals"],
  },
  {
    id: "3",
    skill: "Data Structures",
    currentLevel: 65,
    requiredLevel: 90,
    priority: "Medium",
    recommendations: ["LeetCode Premium", "Cracking the Coding Interview"],
  },
  {
    id: "4",
    skill: "GraphQL",
    currentLevel: 20,
    requiredLevel: 60,
    priority: "Medium",
    recommendations: ["GraphQL Official Docs", "Apollo GraphQL Course"],
  },
  {
    id: "5",
    skill: "Testing",
    currentLevel: 35,
    requiredLevel: 70,
    priority: "Low",
    recommendations: ["Jest & React Testing Library", "TDD Course"],
  },
]

export const careerRoadmap = [
  {
    id: "1",
    phase: "Foundation",
    duration: "2 months",
    status: "completed",
    milestones: [
      { title: "Complete JavaScript Advanced Concepts", done: true },
      { title: "Master TypeScript Fundamentals", done: true },
      { title: "Build 3 React Projects", done: true },
    ],
  },
  {
    id: "2",
    phase: "Backend Mastery",
    duration: "3 months",
    status: "in-progress",
    milestones: [
      { title: "Learn Node.js & Express", done: true },
      { title: "Master Database Design", done: true },
      { title: "Build REST APIs", done: false },
      { title: "Learn GraphQL", done: false },
    ],
  },
  {
    id: "3",
    phase: "System Design",
    duration: "2 months",
    status: "upcoming",
    milestones: [
      { title: "Study System Design Patterns", done: false },
      { title: "Learn Microservices Architecture", done: false },
      { title: "Complete Design Case Studies", done: false },
    ],
  },
  {
    id: "4",
    phase: "Cloud & DevOps",
    duration: "2 months",
    status: "upcoming",
    milestones: [
      { title: "AWS Fundamentals Certification", done: false },
      { title: "Docker & Kubernetes", done: false },
      { title: "CI/CD Pipelines", done: false },
    ],
  },
  {
    id: "5",
    phase: "Interview Prep",
    duration: "1 month",
    status: "upcoming",
    milestones: [
      { title: "100 LeetCode Problems", done: false },
      { title: "Mock Interviews", done: false },
      { title: "Portfolio Review", done: false },
    ],
  },
]

export const learningResources = [
  {
    id: "1",
    title: "System Design Interview Course",
    provider: "Design Gurus",
    type: "Course",
    duration: "40 hours",
    relevance: 95,
    url: "#",
  },
  {
    id: "2",
    title: "AWS Certified Solutions Architect",
    provider: "AWS",
    type: "Certification",
    duration: "60 hours",
    relevance: 90,
    url: "#",
  },
  {
    id: "3",
    title: "Advanced Data Structures",
    provider: "Coursera",
    type: "Course",
    duration: "30 hours",
    relevance: 85,
    url: "#",
  },
  {
    id: "4",
    title: "GraphQL Full Stack",
    provider: "Udemy",
    type: "Course",
    duration: "25 hours",
    relevance: 80,
    url: "#",
  },
  {
    id: "5",
    title: "Testing React Applications",
    provider: "Testing Library",
    type: "Tutorial",
    duration: "15 hours",
    relevance: 75,
    url: "#",
  },
]

export const studentProjects = [
  {
    id: "1",
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce with React, Node.js, and MongoDB",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    status: "Completed",
    githubUrl: "#",
  },
  {
    id: "2",
    name: "Real-time Chat App",
    description: "WebSocket-based chat application with room support",
    technologies: ["React", "Socket.io", "Express"],
    status: "Completed",
    githubUrl: "#",
  },
  {
    id: "3",
    name: "Task Management API",
    description: "RESTful API for task management with authentication",
    technologies: ["Node.js", "PostgreSQL", "JWT"],
    status: "In Progress",
    githubUrl: "#",
  },
]

export const jobMarketData = [
  { role: "Full Stack Developer", demand: 8500, avgSalary: "12-18 LPA", growth: "+15%" },
  { role: "Frontend Developer", demand: 7200, avgSalary: "10-15 LPA", growth: "+12%" },
  { role: "Backend Developer", demand: 6800, avgSalary: "11-16 LPA", growth: "+10%" },
  { role: "DevOps Engineer", demand: 5500, avgSalary: "14-20 LPA", growth: "+22%" },
  { role: "Data Engineer", demand: 4800, avgSalary: "15-22 LPA", growth: "+25%" },
]

export const cohortAnalytics = {
  totalStudents: 450,
  placedStudents: 380,
  averagePackage: "14.5 LPA",
  highestPackage: "45 LPA",
  topRecruiters: ["Google", "Microsoft", "Amazon", "Flipkart", "Atlassian"],
  skillDistribution: [
    { skill: "JavaScript", percentage: 85 },
    { skill: "Python", percentage: 78 },
    { skill: "React", percentage: 72 },
    { skill: "Node.js", percentage: 65 },
    { skill: "AWS", percentage: 45 },
    { skill: "System Design", percentage: 38 },
  ],
  monthlyPlacements: [
    { month: "Jan", placements: 25 },
    { month: "Feb", placements: 35 },
    { month: "Mar", placements: 45 },
    { month: "Apr", placements: 55 },
    { month: "May", placements: 70 },
    { month: "Jun", placements: 60 },
    { month: "Jul", placements: 45 },
    { month: "Aug", placements: 30 },
  ],
  industryDistribution: [
    { industry: "Tech", percentage: 55 },
    { industry: "Finance", percentage: 20 },
    { industry: "Consulting", percentage: 12 },
    { industry: "E-commerce", percentage: 8 },
    { industry: "Others", percentage: 5 },
  ],
}

export const trendingSkills = [
  { skill: "AI/ML", demand: 12500, trend: "+45%" },
  { skill: "Cloud Computing", demand: 10800, trend: "+32%" },
  { skill: "DevOps", demand: 8900, trend: "+28%" },
  { skill: "Cybersecurity", demand: 7500, trend: "+35%" },
  { skill: "Data Engineering", demand: 6800, trend: "+25%" },
  { skill: "Blockchain", demand: 4200, trend: "+18%" },
]
