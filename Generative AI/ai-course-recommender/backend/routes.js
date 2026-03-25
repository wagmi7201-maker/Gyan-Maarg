import express from "express";

import generateRoadmap from "./roadmapAI.js";

const router = express.Router();

router.post(
  "/recommend",

  async (req, res) => {
    try {
      const { skills, goal } = req.body;

      const roadmap = await generateRoadmap(skills, goal);

      res.json({
        success: true,

        roadmap,
      });
    } catch (e) {
      console.log(e);

      res.status(500).json({
        success: false,
      });
    }
  },
);

export default router;
