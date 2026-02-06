export const aiSuggest = async (prompt) => {
  const allMovies = [];
  let offset = 1;

  while (allMovies.length < 20) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `give me 10 movie titles .do not give any extra text or anything else just give me movie titles 
                  and each movie title should be different like: "sholay", "dilwale", "kuch kuch" "avengers" "the lion king" "avatar" "juno" "interstellar" "jumanji" "anaconda" etc

Topic: ${prompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 200
          }
        })
      }
    );

    const data = await response.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const text = parts.map(p => p.text || "").join("");

    const movies = text
      .split("\n")
      .map(m => m.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    allMovies.push(...movies);
  }

  return allMovies.slice(0, 10).join("\n");
};
