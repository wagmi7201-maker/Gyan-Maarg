import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Sample student data
const sampleStudents = [
  {
    userId: 1,
    institutionName: 'Indian Institute of Technology Delhi',
    degree: 'B.Tech',
    major: 'Computer Science',
    graduationYear: 2024,
    gpa: '8.5',
    careerInterests: JSON.stringify(['Software Development', 'AI/ML', 'Full Stack']),
    bio: 'Passionate about building scalable systems and exploring AI applications'
  },
  {
    userId: 2,
    institutionName: 'Delhi University',
    degree: 'B.Sc',
    major: 'Information Technology',
    graduationYear: 2025,
    gpa: '7.8',
    careerInterests: JSON.stringify(['Data Science', 'Analytics', 'Business Intelligence']),
    bio: 'Interested in turning data into actionable insights'
  },
  {
    userId: 3,
    institutionName: 'Mumbai University',
    degree: 'B.Tech',
    major: 'Electronics and Communication',
    graduationYear: 2024,
    gpa: '8.2',
    careerInterests: JSON.stringify(['IoT', 'Embedded Systems', 'Hardware']),
    bio: 'Fascinated by IoT and smart device development'
  }
];

// Sample skills
const sampleSkills = [
  { studentId: 1, skillName: 'Python', proficiencyLevel: 'Advanced', source: 'University Coursework' },
  { studentId: 1, skillName: 'JavaScript', proficiencyLevel: 'Intermediate', source: 'Self-learning' },
  { studentId: 1, skillName: 'React', proficiencyLevel: 'Intermediate', source: 'Projects' },
  { studentId: 1, skillName: 'SQL', proficiencyLevel: 'Advanced', source: 'University Coursework' },
  
  { studentId: 2, skillName: 'Python', proficiencyLevel: 'Advanced', source: 'University Coursework' },
  { studentId: 2, skillName: 'R', proficiencyLevel: 'Intermediate', source: 'Self-learning' },
  { studentId: 2, skillName: 'SQL', proficiencyLevel: 'Advanced', source: 'University Coursework' },
  { studentId: 2, skillName: 'Tableau', proficiencyLevel: 'Beginner', source: 'Online Course' },
  
  { studentId: 3, skillName: 'C++', proficiencyLevel: 'Advanced', source: 'University Coursework' },
  { studentId: 3, skillName: 'Embedded C', proficiencyLevel: 'Intermediate', source: 'Projects' },
  { studentId: 3, skillName: 'Arduino', proficiencyLevel: 'Intermediate', source: 'Hobby Projects' },
];

// Sample job market data
const sampleJobs = [
  {
    jobTitle: 'Full Stack Developer',
    company: 'Google India',
    industry: 'Technology',
    requiredSkills: JSON.stringify(['Python', 'JavaScript', 'React', 'Node.js', 'SQL']),
    preferredSkills: JSON.stringify(['Docker', 'Kubernetes', 'AWS']),
    salary: '12-18 LPA',
    jobCount: 45,
    demandTrend: 'increasing'
  },
  {
    jobTitle: 'Data Scientist',
    company: 'Amazon India',
    industry: 'Technology',
    requiredSkills: JSON.stringify(['Python', 'SQL', 'Machine Learning', 'Statistics']),
    preferredSkills: JSON.stringify(['Deep Learning', 'NLP', 'Apache Spark']),
    salary: '15-22 LPA',
    jobCount: 38,
    demandTrend: 'increasing'
  },
  {
    jobTitle: 'IoT Engineer',
    company: 'Bosch India',
    industry: 'Manufacturing',
    requiredSkills: JSON.stringify(['C++', 'Embedded Systems', 'Arduino', 'MQTT']),
    preferredSkills: JSON.stringify(['IoT Protocols', 'Cloud Integration', 'Linux']),
    salary: '8-14 LPA',
    jobCount: 22,
    demandTrend: 'stable'
  },
  {
    jobTitle: 'AI/ML Engineer',
    company: 'Microsoft India',
    industry: 'Technology',
    requiredSkills: JSON.stringify(['Python', 'TensorFlow', 'PyTorch', 'Machine Learning']),
    preferredSkills: JSON.stringify(['Computer Vision', 'NLP', 'Reinforcement Learning']),
    salary: '16-24 LPA',
    jobCount: 52,
    demandTrend: 'increasing'
  },
  {
    jobTitle: 'Backend Developer',
    company: 'Flipkart',
    industry: 'E-commerce',
    requiredSkills: JSON.stringify(['Java', 'Spring Boot', 'SQL', 'Microservices']),
    preferredSkills: JSON.stringify(['Kafka', 'Redis', 'AWS']),
    salary: '11-17 LPA',
    jobCount: 35,
    demandTrend: 'increasing'
  }
];

// Sample career paths
const sampleCareerPaths = [
  {
    studentId: 1,
    targetRole: 'Full Stack Developer',
    estimatedTimeMonths: 6,
    recommendedCourses: JSON.stringify(['Advanced React Patterns', 'Node.js Mastery', 'System Design']),
    skillGaps: JSON.stringify(['Node.js', 'Docker', 'System Design']),
    currentLevel: 'Intermediate',
    targetLevel: 'Advanced'
  },
  {
    studentId: 2,
    targetRole: 'Data Scientist',
    estimatedTimeMonths: 8,
    recommendedCourses: JSON.stringify(['Advanced Machine Learning', 'Deep Learning Specialization', 'Big Data Analytics']),
    skillGaps: JSON.stringify(['Machine Learning', 'Deep Learning', 'Big Data']),
    currentLevel: 'Beginner',
    targetLevel: 'Advanced'
  },
  {
    studentId: 3,
    targetRole: 'IoT Solutions Architect',
    estimatedTimeMonths: 10,
    recommendedCourses: JSON.stringify(['Advanced IoT Design', 'Cloud Integration for IoT', 'IoT Security']),
    skillGaps: JSON.stringify(['Cloud Platforms', 'IoT Security', 'System Architecture']),
    currentLevel: 'Intermediate',
    targetLevel: 'Advanced'
  }
];

// Sample skill gaps
const sampleSkillGaps = [
  { studentId: 1, skillName: 'Node.js', gapSeverity: 'high', priority: 9, requiredLevel: 'Advanced' },
  { studentId: 1, skillName: 'Docker', gapSeverity: 'high', priority: 8, requiredLevel: 'Intermediate' },
  { studentId: 1, skillName: 'System Design', gapSeverity: 'critical', priority: 10, requiredLevel: 'Advanced' },
  
  { studentId: 2, skillName: 'Machine Learning', gapSeverity: 'critical', priority: 10, requiredLevel: 'Advanced' },
  { studentId: 2, skillName: 'Deep Learning', gapSeverity: 'high', priority: 9, requiredLevel: 'Advanced' },
  { studentId: 2, skillName: 'Big Data', gapSeverity: 'medium', priority: 7, requiredLevel: 'Intermediate' },
  
  { studentId: 3, skillName: 'Cloud Platforms', gapSeverity: 'high', priority: 8, requiredLevel: 'Intermediate' },
  { studentId: 3, skillName: 'IoT Security', gapSeverity: 'high', priority: 9, requiredLevel: 'Advanced' },
];

// Sample progress tracking
const sampleProgress = [
  { studentId: 1, skillId: 1, progressPercentage: 45, status: 'In Progress' },
  { studentId: 1, skillId: 2, progressPercentage: 30, status: 'In Progress' },
  { studentId: 2, skillId: 5, progressPercentage: 60, status: 'In Progress' },
  { studentId: 3, skillId: 9, progressPercentage: 75, status: 'Completed' },
];

async function seedData() {
  try {
    console.log('Starting demo data seeding...');

    // Insert student profiles
    console.log('Inserting student profiles...');
    for (const student of sampleStudents) {
      await connection.execute(
        `INSERT INTO student_profiles (userId, institutionName, degree, major, graduationYear, gpa, careerInterests, bio) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          student.userId,
          student.institutionName,
          student.degree,
          student.major,
          student.graduationYear,
          student.gpa,
          student.careerInterests,
          student.bio
        ]
      );
    }

    // Insert skills
    console.log('Inserting skills...');
    for (const skill of sampleSkills) {
      await connection.execute(
        `INSERT INTO student_skills (studentId, skillName, proficiencyLevel, source) 
         VALUES (?, ?, ?, ?)`,
        [skill.studentId, skill.skillName, skill.proficiencyLevel, skill.source]
      );
    }

    // Insert job market data
    console.log('Inserting job market data...');
    for (const job of sampleJobs) {
      await connection.execute(
        `INSERT INTO job_market_data (jobTitle, company, industry, requiredSkills, preferredSkills, salary, jobCount, demandTrend) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          job.jobTitle,
          job.company,
          job.industry,
          job.requiredSkills,
          job.preferredSkills,
          job.salary,
          job.jobCount,
          job.demandTrend
        ]
      );
    }

    // Insert career paths
    console.log('Inserting career paths...');
    for (const path of sampleCareerPaths) {
      await connection.execute(
        `INSERT INTO career_paths (studentId, targetRole, estimatedTimeMonths, recommendedCourses, skillGaps, currentLevel, targetLevel) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          path.studentId,
          path.targetRole,
          path.estimatedTimeMonths,
          path.recommendedCourses,
          path.skillGaps,
          path.currentLevel,
          path.targetLevel
        ]
      );
    }

    // Insert skill gaps
    console.log('Inserting skill gaps...');
    for (const gap of sampleSkillGaps) {
      await connection.execute(
        `INSERT INTO skill_gap_analysis (studentId, skillName, gapSeverity, priority, requiredLevel) 
         VALUES (?, ?, ?, ?, ?)`,
        [gap.studentId, gap.skillName, gap.gapSeverity, gap.priority, gap.requiredLevel]
      );
    }

    // Insert progress
    console.log('Inserting progress data...');
    for (const prog of sampleProgress) {
      await connection.execute(
        `INSERT INTO student_progress (studentId, skillId, progressPercentage, status) 
         VALUES (?, ?, ?, ?)`,
        [prog.studentId, prog.skillId, prog.progressPercentage, prog.status]
      );
    }

    console.log('✅ Demo data seeding completed successfully!');
    console.log(`
Demo Data Summary:
- Student Profiles: ${sampleStudents.length}
- Skills: ${sampleSkills.length}
- Job Market Data: ${sampleJobs.length}
- Career Paths: ${sampleCareerPaths.length}
- Skill Gaps: ${sampleSkillGaps.length}
- Progress Records: ${sampleProgress.length}
    `);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.end();
  }
}

seedData();
