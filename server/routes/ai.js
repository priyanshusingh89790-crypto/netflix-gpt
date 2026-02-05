import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const text = await aiSuggest(prompt);

    console.log("TEXT FROM GEMINI:", text);

    res.json({ text });
  } catch (err) {
    console.error("AI route error:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

export default router;
