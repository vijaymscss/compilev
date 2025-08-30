export async function executeCode(requestBody) {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  return response.json();
}

export async function reviewCodeWithGemini({ code, language }) {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) throw new Error("Gemini API key not set in .env");
  const prompt = `Review and optimize this ${language} code, if any.\n\nCode:\n${code}\n\nPlease provide:\n- Feedback on the code\n- An optimized version of the code, if any\n- A rating for the code from 1 to 5 based on the code complexity and optimization(just the number)`;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error("Failed to get review from AI");
  const data = await res.json();
  // Parse the response (Gemini returns a text block, so we need to extract sections)
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback";
  // Try to extract feedback, optimized code, and rating from the text
  let feedback = "",
    optimizedCode = "",
    rating = 0;
  const feedbackMatch = text.match(/Feedback[\s\S]*?:([\s\S]*?)Optimized/i);
  const optimizedMatch = text.match(/Optimized[\s\S]*?:([\s\S]*?)Rating/i);
  const ratingMatch = text.match(/Rating[\s\S]*?:\s*(\d(?:\.\d)?)/i);
  feedback = feedbackMatch ? feedbackMatch[1].trim() : text;
  optimizedCode = optimizedMatch ? optimizedMatch[1].trim() : "N/A";
  rating = ratingMatch ? Number(ratingMatch[1]) : 0;
  return { feedback, optimizedCode, rating };
}
