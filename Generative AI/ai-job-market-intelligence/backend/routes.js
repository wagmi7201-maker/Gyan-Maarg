import express from "express";
import getAIRecommendation from "./aiService.js";
import getJobs from "./jobService.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { skills, goal } = req.body;

    let jobs = [];
    let ai = "";

    try {
      jobs = await getJobs(skills);
    } catch (error) {
      console.log("Job API failed");

      jobs = [];
    }

    try {
      ai = await getAIRecommendation(skills, goal, jobs);
    } catch (error) {
      console.log("Gemini failed");

      ai = "AI analysis unavailable";
    }

    res.json({
      jobs,
      ai,
    });
  } catch (error) {
    console.log(error);

    res.json({
      jobs: [],
      ai: "System error",
    });
  }
});

export default router;
