# Gyan-Maarg Demo Guide

## Overview

This guide provides step-by-step instructions for demonstrating the Gyan-Maarg platform during the ET GenAI Hackathon Phase 2 presentation.

## Pre-Demo Checklist

- [ ] Dev server is running (`pnpm dev`)
- [ ] Database is seeded with demo data
- [ ] Browser is open to the application
- [ ] Network connection is stable
- [ ] Demo credentials are available
- [ ] Presentation slides are ready

## Demo Flow (8-10 minutes)

### 1. Landing Page & Navigation (1 minute)

**What to show:**
- Clean, professional landing page with Gyan-Maarg branding
- Feature overview cards highlighting three core capabilities
- Role-based navigation (Student vs Admin)
- Call-to-action buttons

**Talking points:**
- "Gyan-Maarg bridges the skill gap between academic learning and industry demands"
- "We serve two primary users: students seeking career guidance and placement cells monitoring cohorts"
- "The platform leverages AI and real-time job market data for intelligent recommendations"

### 2. Student Dashboard (3-4 minutes)

**What to show:**
- Login as a student user
- Student dashboard with quick stats (skills, gaps, progress)
- Profile section with academic records and interests
- Career roadmap tab showing AI-generated learning path
- Skill gaps visualization with severity indicators

**Talking points:**
- "Each student gets a personalized profile capturing their academic background, skills, and career interests"
- "Our AI analyzes skill gaps by comparing student profiles against real job market requirements"
- "The career roadmap is generated using GenAI and includes specific courses, projects, and timelines"
- "Students can track their progress toward their career goals"

**Demo Actions:**
1. Click on "Student Dashboard" button
2. Show the Overview tab with key metrics
3. Navigate to Profile tab to show student information
4. Click on Career Roadmap tab to show the AI-generated path
5. Highlight the skill gaps with color-coded severity
6. Show the Progress tab with learning milestones

### 3. Skill Gap Analysis (2 minutes)

**What to show:**
- Skill gap identification with severity levels (critical, high, medium, low)
- Priority scoring for each gap
- Recommended learning resources
- Market demand context

**Talking points:**
- "The system identifies gaps by comparing student skills with job market requirements"
- "Gaps are prioritized based on market demand and criticality"
- "Each gap includes recommended courses and projects to bridge it"
- "This data-driven approach ensures students focus on the most valuable skills"

**Demo Actions:**
1. Point to the "Top Skill Gaps" section
2. Explain the severity color coding
3. Show how gaps are prioritized
4. Mention the recommended resources

### 4. Admin Dashboard (2-3 minutes)

**What to show:**
- Login as admin/placement cell user
- Cohort analytics with aggregate metrics
- Skill gap distribution across cohort
- Placement trend visualization
- Industry insights and top in-demand skills

**Talking points:**
- "Placement cells get a comprehensive view of cohort-level insights"
- "The dashboard shows skill gap distribution across all students"
- "Placement trends help track progress toward placement targets"
- "Industry trends inform training and upskilling initiatives"

**Demo Actions:**
1. Click on "Admin Dashboard" button
2. Show the key metrics (Total Students, Placement Rate, Avg Salary, Avg GPA)
3. Navigate to Analytics tab to show charts
4. Show the skill gap distribution bar chart
5. Show the placement trend line chart
6. Go to Skills tab to show top in-demand skills
7. Show Industry Trends tab with emerging opportunities

### 5. Technical Highlights (1 minute)

**What to show:**
- Brief overview of the technology stack
- Architecture diagram (if available)
- AI/RAG integration capabilities

**Talking points:**
- "Built with React 19, Express, and tRPC for type-safe APIs"
- "MySQL database with optimized schema for student and job data"
- "GenAI integration for intelligent recommendations and analysis"
- "RAG system retrieves relevant job market and educational data"
- "Real-time job market data integration from multiple sources"

## Key Features to Highlight

### 1. Personalized Career Roadmaps
- AI-generated based on individual profiles
- Includes specific courses, projects, and timelines
- Adaptive based on skill gaps and market demands

### 2. Skill Gap Analysis
- Semantic matching between student skills and job requirements
- Severity-based prioritization
- Actionable recommendations

### 3. Real-time Job Market Integration
- Data from LinkedIn, Naukri, Indeed
- Identifies in-demand skills and roles
- Salary trends and geographic opportunities

### 4. Cohort Analytics
- Aggregate skill distribution
- Placement tracking
- Industry trend monitoring
- Benchmarking capabilities

### 5. AI-Powered Recommendations
- GenAI for career advice
- Learning path optimization
- Resource curation

## Demo Data

### Sample Students
1. **Ujjwal Kumar** (IIT Delhi, B.Tech CS)
   - Skills: Python, JavaScript, React, SQL
   - Interests: Software Development, AI/ML
   - Target: Full Stack Developer

2. **Priya Sharma** (Delhi University, B.Sc IT)
   - Skills: Python, R, SQL, Tableau
   - Interests: Data Science, Analytics
   - Target: Data Scientist

3. **Arjun Patel** (Mumbai University, B.Tech ECE)
   - Skills: C++, Embedded C, Arduino
   - Interests: IoT, Embedded Systems
   - Target: IoT Solutions Architect

### Sample Job Market Data
- Full Stack Developer (45 openings, increasing demand)
- Data Scientist (38 openings, increasing demand)
- AI/ML Engineer (52 openings, increasing demand)
- IoT Engineer (22 openings, stable demand)
- Backend Developer (35 openings, increasing demand)

## Troubleshooting

### Issue: Page not loading
- Check network connection
- Refresh the browser
- Verify dev server is running

### Issue: No data showing
- Ensure database is seeded with demo data
- Check database connection
- Verify API endpoints are responding

### Issue: Slow performance
- Clear browser cache
- Close unnecessary tabs
- Check network latency

## Post-Demo Discussion Points

1. **Scalability**: How the system scales to handle thousands of students
2. **Data Privacy**: How student data is protected and isolated
3. **Accuracy**: How AI recommendations are validated and improved
4. **Integration**: How the system integrates with existing placement cell systems
5. **Future Enhancements**: Mobile app, real-time notifications, employer feedback

## Q&A Preparation

**Q: How accurate are the AI recommendations?**
A: Our system uses semantic matching and LLM-based analysis trained on real job market data. Recommendations are continuously refined based on placement outcomes.

**Q: How often is job market data updated?**
A: Data is ingested from multiple sources in real-time. The system continuously monitors LinkedIn, Naukri, and Indeed for the latest opportunities.

**Q: Can the system handle different industries?**
A: Yes, the system is industry-agnostic and can be configured for any sector. Demo data includes tech, manufacturing, and e-commerce roles.

**Q: How does this compare to existing career guidance platforms?**
A: Gyan-Maarg combines AI-powered personalization with real-time job market data and cohort-level analytics, providing a comprehensive solution for both students and institutions.

**Q: What's the implementation timeline for institutions?**
A: The system can be deployed within 2-4 weeks for a typical institution, including data migration and staff training.

## Success Metrics

- **Student Engagement**: % of students completing profiles and roadmaps
- **Placement Outcomes**: Correlation between roadmap completion and placement success
- **Skill Alignment**: % of placed students with target skills
- **User Satisfaction**: Feedback from students and placement cells

## Presentation Tips

1. **Speak to the Problem**: Start by highlighting India's skill mismatch challenge
2. **Show Real Impact**: Use demo data to illustrate tangible outcomes
3. **Emphasize AI**: Highlight how AI makes recommendations intelligent and personalized
4. **Focus on Users**: Show how both students and placement cells benefit
5. **Be Confident**: Know the features and be ready to answer questions
6. **Time Management**: Stick to the demo flow to stay within time limits

## Additional Resources

- README.md - Comprehensive project documentation
- ARCHITECTURE.md - Technical architecture details
- API Documentation - tRPC procedure specifications
- Database Schema - Complete data model

---

**Good luck with your demo! Remember: Focus on the problem you're solving and the real impact Gyan-Maarg can have on students' careers.**
