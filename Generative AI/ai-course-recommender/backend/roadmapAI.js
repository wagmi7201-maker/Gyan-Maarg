import Groq from "groq-sdk";

async function generateRoadmap(skills, goal) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      temperature: 0.2,

      response_format: { type: "json_object" },

      messages: [
        {
          role: "user",

          content: `

User skills:
${skills}

Career goal:
${goal}

Generate learning roadmap.

Return JSON:

{
"roadmap":[
{
"step":1,
"title":"Skill",
"description":"Why needed",
"time":"Time",
"level":"Beginner",

"topics":[
"topic1",
"topic2"
],

"courses":[
{
"name":"Course name",
"platform":"Udemy",
"price":"Free",
"rating":"4.5",
"duration":"20 hours",
"students":"100k"
}
]
}
]
}

Rules:

Generate 5 steps
2 courses each
Use platforms:
Udemy
Coursera
NPTEL
edX

Do NOT generate links
Do NOT generate images
Return only JSON

`,
        },
      ],
    });

    /* PARSE */

    const data = JSON.parse(completion.choices[0].message.content);

    if (!data.roadmap) {
      console.log("AI EMPTY");

      return [];
    }

    /* NORMALIZE PLATFORM */

    function normalizePlatform(p) {
      if (!p) return "Udemy";

      p = p.toLowerCase();

      if (p.includes("coursera")) return "Coursera";

      if (p.includes("udemy")) return "Udemy";

      if (p.includes("edx")) return "edX";

      if (p.includes("nptel")) return "NPTEL";

      return "Udemy";
    }

    /* GENERATE LINK */

    function generateLink(platform, query) {
      query = encodeURIComponent(query);

      if (platform === "Udemy") return;
      "https://www.udemy.com/courses/search/?q=" + query;

      if (platform === "Coursera") return;
      "https://www.coursera.org/search?query=" + query;

      if (platform === "edX") return;
      "https://www.edx.org/search?q=" + query;

      if (platform === "NPTEL") return;
      "https://onlinecourses.nptel.ac.in/search?query=" + query;

      return;
      "https://www.google.com/search?q=" + query + " course";
    }

    /* GENERATE IMAGE */

    function generateImage(platform) {
      if (platform === "Udemy") return;
      ("https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg");

      if (platform === "Coursera") return;
      ("https://about.coursera.org/static/blueCoursera-646f855eae3b5e9f69d7.svg");

      if (platform === "edX") return;
      ("https://www.edx.org/images/logos/edx-logo-elm.svg");

      if (platform === "NPTEL") return;
      ("https://nptel.ac.in/assets/shared/logo-nptel.png");

      return;
      ("https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg");
    }

    /* SAFE STRUCTURE */

    return data.roadmap.map((step) => ({
      step: step?.step || 1,

      title: step?.title || "Skill",

      description: step?.description || "",

      time: step?.time || "2 weeks",

      level: step?.level || "Beginner",

      topics: Array.isArray(step?.topics) ? step.topics : [],

      courses: Array.isArray(step?.courses)
        ? step.courses.map((c) => {
            const platform = normalizePlatform(c.platform);

            const searchTerm = c.name || step.title;

            return {
              name: c.name || "Course",

              platform,

              price: c.price || "Free",

              rating: c.rating || "4.5",

              duration: c.duration || "10 hours",

              students: c.students || "10k",

              link: generateLink(platform, searchTerm),

              image: generateImage(platform),
            };
          })
        : [],
    }));
  } catch (error) {
    console.log("AI ERROR");

    console.log(error.message);

    return [];
  }
}

export default generateRoadmap;
