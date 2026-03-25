import axios from "axios";

async function fetchJobs(query) {
  const res = await axios.get(
    "https://jsearch.p.rapidapi.com/search",

    {
      params: {
        query: query,

        page: "1",

        num_pages: "1",
      },

      headers: {
        "X-RapidAPI-Key": process.env.RAPID_KEY,

        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    },
  );

  return res.data.data;
}

async function getJobs(skills) {
  try {
    let jobs = await fetchJobs(`${skills} developer India`);

    let indiaJobs = jobs.filter(
      (j) =>
        j.job_country === "IN" ||
        j.job_location?.toLowerCase().includes("india"),
    );

    if (indiaJobs.length < 9) {
      let extra = await fetchJobs(`${skills} software engineer India`);

      indiaJobs = [...indiaJobs, ...extra];
    }

    indiaJobs = indiaJobs.slice(0, 9);

    return indiaJobs.map((job) => ({
      title: job.job_title,

      company: job.employer_name,

      location: job.job_city || "India",

      salary: job.job_salary || estimateSalary(job.job_title),

      description: job.job_description?.substring(0, 160) || "See job link",

      skills: extractSkills(job.job_description),

      experience: extractExperience(job.job_description),

      logo:
        job.employer_logo ||
        `https://logo.clearbit.com/${job.employer_name}.com`,

      link: job.job_apply_link || `https://www.naukri.com/${skills}-jobs`,
    }));
  } catch (error) {
    console.log(error);

    return [];
  }
}
function estimateSalary(title) {
  if (title.toLowerCase().includes("senior")) return "₹15–35 LPA";

  if (title.toLowerCase().includes("backend")) return "₹8–22 LPA";

  return "₹5–18 LPA";
}

function extractSkills(desc) {
  if (!desc) return ["Software"];

  const common = ["Java", "Spring", "React", "Node", "AWS", "Docker", "SQL"];

  return common.filter((skill) =>
    desc.toLowerCase().includes(skill.toLowerCase()),
  );
}

function extractExperience(desc) {
  if (!desc) return "Not specified";

  const match = desc.match(/\d+\s*years?/);

  return match ? match[0] : "0–3 years";
}

export default getJobs;
