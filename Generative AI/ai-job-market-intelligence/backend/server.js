import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  const routes = (await import("./routes.js")).default;

  app.use("/api", routes);

  console.log("KEY:", process.env.GEMINI_KEY);

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}

startServer();
