# Gyan-Maarg: AI-Driven Personalized Career Pathing

An intelligent career guidance platform that leverages GenAI and real-time job market data to help students bridge skill gaps and plan their careers effectively.

## Overview

Gyan-Maarg addresses the critical skill mismatch problem in India's education system by providing:

- **Personalized Career Roadmaps**: AI-generated learning paths tailored to individual student profiles and market demands
- **Skill Gap Analysis**: Semantic matching between student capabilities and industry requirements
- **Real-time Job Market Intelligence**: Integration with job market data to identify in-demand skills
- **Cohort Analytics**: Placement cell dashboards for monitoring student progress and industry trends

## Features

### For Students

- **Profile Management**: Build comprehensive profiles with academic records, projects, and career interests
- **Skill Assessment**: Input current skills with proficiency levels and sources
- **Career Roadmap**: Receive AI-generated personalized learning paths with estimated timelines
- **Progress Tracking**: Monitor advancement toward career goals
- **Learning Recommendations**: Curated courses, projects, and certifications from top platforms
- **Skill Gap Insights**: Identify critical gaps between current and required skills

### For Placement Cells & Admins

- **Cohort Analytics Dashboard**: View aggregate skill gaps and placement statistics
- **Industry Trend Monitoring**: Track emerging skills and job market demands
- **Placement Tracking**: Monitor placement outcomes and salary statistics
- **Skill Distribution Analysis**: Visualize skill gaps across cohorts
- **Benchmarking Tools**: Compare cohort performance against market standards

## Technology Stack

### Frontend
- **React 19** with TypeScript for type-safe UI development
- **Tailwind CSS 4** for responsive, utility-first styling
- **shadcn/ui** for accessible, reusable components
- **Recharts** for data visualization and analytics
- **Wouter** for lightweight client-side routing

### Backend
- **Express 4** for HTTP server and API routing
- **tRPC 11** for end-to-end type-safe APIs
- **Drizzle ORM** for database abstraction and migrations
- **MySQL/TiDB** for data persistence

### AI & Data
- **GenAI LLM Integration** for intelligent recommendations and analysis
- **RAG System** for knowledge retrieval from job market and educational data
- **Semantic Embeddings** for skill-to-skill and student-to-job matching

### Authentication
- **Manus OAuth** for secure user authentication
- **JWT-based Sessions** for maintaining authenticated state

## Architecture

### Database Schema

The system uses a normalized relational schema with the following core entities:

| Table | Purpose |
|-------|---------|
| `users` | Core user accounts with role-based access (user, admin, placement_cell) |
| `student_profiles` | Student academic information and career interests |
| `student_skills` | Skills with proficiency levels and sources |
| `student_projects` | Portfolio projects with technologies used |
| `job_market_data` | Real-time job postings and skill requirements |
| `career_paths` | AI-generated career roadmaps for students |
| `skill_gap_analysis` | Identified gaps between student and job requirements |
| `learning_resources` | Curated courses, certifications, and projects |
| `cohort_analytics` | Aggregate statistics for student cohorts |
| `student_progress` | Tracking of learning path completion and milestones |

### API Layer (tRPC)

The backend exposes three main router groups:

**Student Router**
- `getProfile()` - Retrieve student profile
- `updateProfile()` - Update academic and career information
- `getSkills()` - List student skills
- `getProjects()` - List portfolio projects
- `getCareerPath()` - Retrieve personalized career roadmap
- `getSkillGaps()` - Identify skill gaps
- `getProgress()` - Track learning progress

**Admin Router**
- `getCohortAnalytics()` - Retrieve cohort statistics
- `getTopSkills()` - Get in-demand skills

**Auth Router**
- `me()` - Get current user
- `logout()` - Clear session

### Frontend Architecture

The frontend is organized into distinct pages for different user roles:

- **Home Page**: Landing page with feature overview and call-to-action
- **Student Dashboard**: Personal career planning and progress tracking
- **Admin Dashboard**: Cohort analytics and industry trend monitoring

Each page uses tRPC hooks to fetch and mutate data with full type safety.

## Getting Started

### Prerequisites

- Node.js 22.13.0+
- pnpm 10.4.1+
- MySQL 8.0+ or TiDB compatible database

### Installation

```bash
# Install dependencies
pnpm install

# Set up database
pnpm db:push

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build frontend and backend
pnpm build

# Start production server
pnpm start
```

## Development Workflow

### Adding Features

1. **Update Schema**: Modify `drizzle/schema.ts` with new tables or columns
2. **Migrate Database**: Run `pnpm db:push` to apply schema changes
3. **Add Queries**: Implement database helpers in `server/db.ts`
4. **Create Procedures**: Add tRPC procedures in `server/routers.ts`
5. **Build UI**: Create React components in `client/src/pages/`
6. **Write Tests**: Add vitest tests in `server/*.test.ts`
7. **Test Locally**: Run `pnpm test` to verify functionality

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch
```

## Key Implementation Details

### Skill Gap Analysis

The skill gap analysis engine compares student profiles against job market requirements:

1. **Profile Vectorization**: Student skills are converted to semantic embeddings
2. **Job Market Retrieval**: Relevant job postings are retrieved based on career interests
3. **Gap Calculation**: Gaps are identified by comparing skill levels against requirements
4. **Prioritization**: Gaps are ranked by severity and market demand

### Career Roadmap Generation

Personalized roadmaps are generated through:

1. **Target Role Identification**: Based on student interests and current skills
2. **Skill Gap Analysis**: Identify required skills and proficiency levels
3. **Learning Path Optimization**: Sequence courses and projects for efficient learning
4. **Timeline Estimation**: Calculate realistic timelines based on skill complexity
5. **Resource Curation**: Recommend specific courses, projects, and certifications

### Real-time Job Market Data

The system integrates job market data from multiple sources:

- LinkedIn job postings
- Naukri.com listings
- Indeed.com data
- Industry reports from McKinsey, BCG, WEF

Data is continuously ingested and analyzed to identify:
- In-demand skills and roles
- Salary trends and market compensation
- Geographic opportunities
- Industry growth trends

## Demo Data

The system includes sample data for demonstration purposes:

- **Sample Students**: Pre-populated student profiles with various skill levels
- **Job Market Data**: Real job postings from major platforms
- **Learning Resources**: Curated courses from Coursera, edX, Udemy
- **Cohort Analytics**: Sample cohort statistics for visualization

## Deployment

The application is designed for deployment on Manus platform:

1. Create a checkpoint: `webdev_save_checkpoint`
2. Click the Publish button in the Management UI
3. Configure custom domain in Settings > Domains
4. Enable notifications for owner alerts

## Performance Considerations

- **Database Indexing**: Indexes on frequently queried fields (user_id, student_id, job_title)
- **Query Optimization**: Efficient queries with proper joins and filtering
- **Caching**: Session caching for authenticated requests
- **Pagination**: Large result sets are paginated to reduce load

## Security

- **Authentication**: OAuth-based user authentication via Manus
- **Authorization**: Role-based access control (user, admin, placement_cell)
- **Data Privacy**: Student data is isolated and only accessible to authorized users
- **SQL Injection Prevention**: Parameterized queries via Drizzle ORM

## Future Enhancements

- **Advanced RAG**: Implement semantic search with vector embeddings
- **GenAI Recommendations**: Fine-tuned LLM for personalized guidance
- **Real-time Notifications**: Alert students about new opportunities
- **Mobile App**: Native mobile applications for iOS and Android
- **Employer Integration**: Direct employer feedback on student profiles
- **Skill Marketplace**: Connect students with internship and job opportunities

## Contributing

This is a hackathon prototype. Contributions are welcome for:

- Feature enhancements
- Bug fixes
- Performance optimizations
- Documentation improvements

## License

This project is created for the ET GenAI Hackathon 2026.

## Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for the ET GenAI Hackathon 2026**

Empowering India's youth with AI-driven career guidance.
