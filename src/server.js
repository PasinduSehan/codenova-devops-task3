const express = require("express");
const redis = require("redis");

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";

const client = redis.createClient({ url: REDIS_URL });

client.on("error", (err) => console.error("Redis Client Error", err));

async function startServer() {
  await client.connect();
  console.log("Connected to Redis successfully!");

  app.get("/", async (req, res) => {
    const visits = await client.incr("visits");
    res.send(`
      <h1>CodeNova DevOps Internship - Task 03</h1>
      <p>Multi-Container Application running with Docker Compose!</p>
      <h2>Total Page Visits (stored in Redis): ${visits}</h2>
    `);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();