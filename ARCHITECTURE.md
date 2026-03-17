# Gyan-Maarg Technical Architecture

## System Overview

Gyan-Maarg is a full-stack web application designed to address India's skill mismatch problem through AI-powered career guidance. The system serves two primary user groups: students seeking personalized career paths and placement cells monitoring cohort-level insights.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (React)                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐ │
│  │ Student Dashboard│  │ Admin Dashboard  │  │ Home Page  │ │
│  └──────────────────┘  └──────────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓ (tRPC)
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (tRPC)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Student API  │  │  Admin API   │  │   Auth API       │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              Business Logic Layer (Express)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database Queries  │  AI Integration  │  Analytics   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                Data Layer (MySQL + Drizzle)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Student Data  │  Job Market Data  │  Analytics      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Frontend Layer

**Technology Stack:**
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- shadcn/ui for components
- Recharts for visualizations
- Wouter for routing

**Key Components:**

- **Home Page** (`client/src/pages/Home.tsx`)
  - Landing page with feature overview
  - Role-based navigation (student vs admin)
  - Call-to-action for new users

- **Student Dashboard** (`client/src/pages/StudentDashboard.tsx`)
  - Profile management interface
  - Career roadmap visualization
  - Skill gap display
  - Progress tracking
  - Learning recommendations

- **Admin Dashboard** (`client/src/pages/AdminDashboard.tsx`)
  - Cohort analytics with charts
  - Skill gap distribution
  - Placement trend monitoring
  - Industry insights
  - Top in-demand skills

**State Management:**
- tRPC React Query hooks for server state
- React Context for authentication state
- Local component state for UI interactions

### 2. API Layer (tRPC)

**Architecture:**
- Type-safe end-to-end APIs using tRPC
- Automatic client code generation
- Built-in error handling and validation

**Router Structure:**

```typescript
appRouter
├── auth
│   ├── me() - Get current user
│   └── logout() - Clear session
├── student
│   ├── getProfile() - Retrieve student profile
│   ├── updateProfile() - Update profile
│   ├── getSkills() - List skills
│   ├── getProjects() - List projects
│   ├── getCareerPath() - Get roadmap
│   ├── getSkillGaps() - Identify gaps
│   └── getProgress() - Track progress
└── admin
    ├── getCohortAnalytics() - Cohort stats
    └── getTopSkills() - In-demand skills
```

**Procedure Types:**
- `publicProcedure` - No authentication required
- `protectedProcedure` - Requires authenticated user
- Role-based access control for admin procedures

### 3. Business Logic Layer

**Database Query Helpers** (`server/db.ts`):
- `getStudentProfile()` - Fetch student profile
- `getStudentSkills()` - List student skills
- `getStudentProjects()` - List projects
- `getJobsBySkill()` - Find relevant jobs
- `getTopInDemandSkills()` - Get trending skills
- `getStudentCareerPath()` - Retrieve roadmap
- `getStudentSkillGaps()` - Get identified gaps
- `getRecommendedResources()` - Get learning resources
- `getCohortAnalytics()` - Get cohort statistics
- `getStudentProgress()` - Track progress

**AI Integration Points:**
- Skill gap analysis using semantic embeddings
- Career roadmap generation with LLM
- Learning path optimization
- Job market trend analysis

### 4. Data Layer

**Database Schema:**

**Core Tables:**

| Table | Columns | Purpose |
|-------|---------|---------|
| `users` | id, openId, name, email, role, createdAt, updatedAt | User accounts |
| `student_profiles` | id, userId, institution, degree, major, gpa, interests | Student info |
| `student_skills` | id, studentId, skillName, proficiencyLevel, source | Skills inventory |
| `student_projects` | id, studentId, projectName, technologies, link | Portfolio |
| `job_market_data` | id, jobTitle, requiredSkills, salary, industry | Job postings |
| `career_paths` | id, studentId, targetRole, skillGaps, courses | Roadmaps |
| `skill_gap_analysis` | id, studentId, skillName, gap, priority | Gap analysis |
| `learning_resources` | id, resourceName, skills, platform, link | Courses/projects |
| `cohort_analytics` | id, cohortName, students, placement, skills | Cohort stats |
| `student_progress` | id, studentId, skillId, percentage, status | Progress tracking |

**Indexing Strategy:**
- Primary keys on all tables
- Foreign key indexes for joins
- Indexes on frequently queried fields:
  - `student_profiles.user_id`
  - `student_skills.student_id`
  - `job_market_data.job_title`
  - `career_paths.student_id`

**Relationships:**
- One-to-Many: User → Student Profile
- One-to-Many: Student Profile → Skills
- One-to-Many: Student Profile → Projects
- One-to-Many: Student Profile → Career Paths
- Many-to-Many: Students ↔ Skills (via student_skills)
- Many-to-Many: Career Paths ↔ Learning Resources

### 5. Authentication & Authorization

**OAuth Flow:**
1. User clicks "Sign In"
2. Redirected to Manus OAuth portal
3. User authenticates with credentials
4. Callback to `/api/oauth/callback` with authorization code
5. Session cookie created with JWT token
6. User redirected to dashboard

**Role-Based Access Control:**
- `user` - Student access (default)
- `admin` - Full system access
- `placement_cell` - Admin dashboard access

**Session Management:**
- JWT-based sessions stored in HTTP-only cookies
- Automatic session validation on each request
- Logout clears session cookie

## Data Flow

### Student Career Planning Flow

```
1. Student logs in
   ↓
2. Completes/updates profile
   ├── Academic records
   ├── Skills and projects
   └── Career interests
   ↓
3. System analyzes profile
   ├── Vectorizes student data
   ├── Retrieves job market data
   └── Identifies skill gaps
   ↓
4. AI generates career roadmap
   ├── Identifies target roles
   ├── Calculates skill gaps
   ├── Recommends learning resources
   └── Estimates timeline
   ↓
5. Student views recommendations
   ├── Career roadmap
   ├── Skill gaps with priorities
   ├── Recommended courses
   └── Progress tracking
   ↓
6. Student tracks progress
   └── Updates completion status
```

### Admin Analytics Flow

```
1. Admin logs in
   ↓
2. Selects cohort
   ↓
3. System aggregates data
   ├── Collects student profiles
   ├── Analyzes skill distribution
   ├── Calculates placement stats
   └── Identifies trends
   ↓
4. Visualizations generated
   ├── Skill gap charts
   ├── Placement trends
   ├── Industry insights
   └── Benchmarking data
   ↓
5. Admin reviews analytics
   └── Makes data-driven decisions
```

## AI & RAG Integration

### Skill Gap Analysis

**Process:**
1. **Profile Vectorization**: Student profile converted to semantic embeddings
2. **Job Market Retrieval**: Relevant jobs retrieved from vector database
3. **Semantic Matching**: Compare student skills with job requirements
4. **Gap Identification**: Calculate gaps for each skill
5. **Prioritization**: Rank gaps by market demand and criticality

### Career Roadmap Generation

**Process:**
1. **Target Role Selection**: Based on interests and current skills
2. **Skill Gap Analysis**: Identify required skills
3. **Learning Path Optimization**: Sequence courses for efficient learning
4. **Resource Curation**: Recommend specific courses and projects
5. **Timeline Estimation**: Calculate realistic timelines

### Knowledge Base

**Data Sources:**
- Job postings from LinkedIn, Naukri, Indeed
- Course catalogs from Coursera, edX, Udemy
- Industry reports from McKinsey, BCG, WEF
- Academic datasets and skill taxonomies

**Retrieval Strategy:**
- Vector embeddings for semantic search
- Keyword matching for exact queries
- Hybrid approach combining both methods

## Performance Optimization

### Database Optimization
- Indexes on frequently queried columns
- Efficient query design with proper joins
- Connection pooling for concurrent requests
- Query result caching where applicable

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization and compression
- CSS-in-JS for minimal bundle size
- Efficient re-rendering with React hooks

### API Optimization
- Request batching where possible
- Pagination for large datasets
- Compression of responses
- Caching of static resources

## Security Measures

### Authentication
- OAuth 2.0 for secure user authentication
- JWT tokens for session management
- HTTP-only cookies to prevent XSS attacks

### Authorization
- Role-based access control (RBAC)
- Procedure-level authorization checks
- Database-level row-level security

### Data Protection
- SQL injection prevention via Drizzle ORM
- Input validation on all endpoints
- HTTPS for all communications
- Secure password handling (delegated to OAuth)

### Privacy
- Student data isolation by user
- Admin access logging
- GDPR-compliant data handling
- Consent-based data collection

## Deployment Architecture

**Hosting:** Manus Platform
- Automatic scaling
- Built-in CDN
- SSL/TLS certificates
- Database backups

**Environment Variables:**
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Session signing key
- `VITE_APP_ID` - OAuth application ID
- `OAUTH_SERVER_URL` - OAuth backend URL
- `BUILT_IN_FORGE_API_KEY` - GenAI API key

**Build Process:**
1. Frontend build with Vite
2. Backend bundle with esbuild
3. Docker containerization
4. Deployment to Manus infrastructure

## Monitoring & Logging

**Logs Available:**
- `devserver.log` - Server startup and errors
- `browserConsole.log` - Client-side errors
- `networkRequests.log` - HTTP requests
- `sessionReplay.log` - User interactions

**Metrics Tracked:**
- API response times
- Database query performance
- User engagement
- Feature usage statistics

## Future Scalability

### Horizontal Scaling
- Stateless API servers
- Load balancing across instances
- Database read replicas

### Vertical Scaling
- Database optimization
- Caching layer (Redis)
- CDN for static assets

### Feature Scaling
- Microservices for AI/RAG
- Separate analytics service
- Real-time notification service

## Testing Strategy

### Unit Tests
- Business logic validation
- Database query correctness
- API procedure behavior

### Integration Tests
- End-to-end user flows
- API integration
- Database transactions

### Performance Tests
- Load testing
- Query optimization
- API response times

## Conclusion

Gyan-Maarg's architecture is designed for scalability, maintainability, and performance. The separation of concerns across frontend, API, business logic, and data layers enables independent scaling and updates. The use of modern technologies like tRPC, Drizzle, and React ensures type safety and developer productivity.
