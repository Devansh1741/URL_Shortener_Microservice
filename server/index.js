import express from "express";
import cors from "cors";
import { createClient } from "redis";
import { encodeBase62 } from "./services/base_62_encoding_service.js";

const app = express();

app.use(cors());
app.use(express.json());

const redisClient = createClient({ url: "redis://localhost:6379" });

redisClient.on("connect", () => {
  console.log("Redis is connected");
});

redisClient.on("error", () => {
  console.log("Redis connection failed");
});

// async () => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// };

app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    res.json({ status: false, error: "Please pass a long URL" });
  }

  try {
    const existingUrl = await redisClient.hGet("reverse", originalUrl);

    if (existingUrl) {
      return res.json({
        status: true,
        data: existingUrl,
      });
    }

    const id = await redisClient.incr("global_counter");
    const shortURLid = encodeBase62(id);

    await Promise.all([
      redisClient.hSet("urls", shortURLid, originalUrl),
      redisClient.hSet("reverse", originalUrl, shortURLid),
    ]);
    res.json({
      status: true,
      data: shortURLid,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, error: error });
  }
});

app.get("/:shortUrlId", async (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  const originalUrl = await redisClient.hGet("urls", shortUrlId);

  res.redirect(originalUrl);
});

app.get("/get/:shortUrlId", async (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  const originalUrl = await redisClient.hGet("urls", shortUrlId);

  res.json({
    status: true,
    data: originalUrl,
  });
});

app.listen(3001, async () => {
  try {
    await redisClient.connect();
    console.log("Backend is running");
  } catch (error) {
    console.log(error);
  }
});
