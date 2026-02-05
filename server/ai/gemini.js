import fetch from "node-fetch";

export const aiSuggest = async (prompt) => {
  try {
    console.log("AI request received", prompt);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give exactly 5 funny Indian movie titles.
Return only movie names, one per line.
Query: ${prompt}`
                }
              ]
            }
          ]
        })
      }
    );

    console.log("Gemini HTTP status:", response.status);

    const data = await response.json();
    console.log("RAW GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (err) {
    console.error("Gemini fetch error:", err);
    return "";
  }
};
