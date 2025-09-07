import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.YT_API_KEY;

if (!API_KEY) {
  console.error("❌ YouTube API key missing in .env!");
  process.exit(1);
}

app.use(cors());

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

// ==================== Fetch list of videos ====================
app.get("/api/videos", async (req, res) => {
  const { q } = req.query;
  const query = q?.trim() || "New";
  if (!q)
    return res.status(400).json({ error: "Query parameter q is required" });
  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        part: "snippet",
        maxResults: 50,
        q: query,
        key: API_KEY,
        type: "video",
      },
    });

    // Return full response as-is for frontend to access items
    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    res.status(status).json({ error: message });
  }
});

// ==================== Fetch single video details ====================
app.get("/api/video/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Video ID is required" });

  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/videos`, {
      params: {
        part: "snippet,statistics",
        id,
        key: API_KEY,
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Return single video object directly
    res.json(response.data.items[0]);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    res.status(status).json({ error: message });
  }
});

// ==================== Start server ====================
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
