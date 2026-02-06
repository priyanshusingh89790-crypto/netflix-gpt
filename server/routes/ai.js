import express from "express";
import { aiSuggest } from "../ai/gemini.js"; 

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const text = await aiSuggest(prompt);
    res.json({ text });
  } catch (err) {
    console.error("AI route error:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

export default router;
