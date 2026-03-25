import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_KEY,
});

async function getAIRecommendation(skills, goal, jobs) {
  try {
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
• career
• career

SECTION: Skill gaps
• skill
• skill

SECTION: Salary in India
Write one paragraph only.

SECTION: Learning roadmap
• step
• step

SECTION: Market demand
Write one paragraph only.

SECTION: Jobs fit user best
• job
• job

RULES:

Never use numbering inside sections
Never use bold formatting
Never use **
Never use markdown
Never output JSON
Never restart numbering
Use only clean bullet points

Return clean readable report.

`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.5,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);

    return "AI analysis unavailable";
  }
}

export default getAIRecommendation;
