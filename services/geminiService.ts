import { GoogleGenAI } from "@google/genai";

// Read key safely
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Create Gemini client ONLY if key exists
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getAIInsight = async (
  topic: string,
  context: string
): Promise<string> => {
  // Fallback if AI is unavailable
  if (!ai) {
    return "Small sustainable choices add up over time. Keep making eco-friendly decisions for a better future 🌱";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are an expert environmental scientist.
        Topic: ${topic}
        Context: ${context}
        Provide a short motivating insight.
      `,
    });

    return (
      response.text ||
      "Sustainable habits today lead to a healthier planet tomorrow."
    );
  } catch (error) {
    console.error("Gemini error:", error);
    return "Every eco-friendly action contributes to a greener planet 🌍";
  }
};

export const getSimulatedAdvice = async (
  uses: number,
  scrubbers: number
): Promise<string> => {
  if (!ai) {
    return `Great job! You’ve made ${uses} eco-friendly choices. Keep earning EcoPoints!`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        The user reused a bag ${uses} times and bought ${scrubbers} scrubbers.
        Give short encouraging feedback mentioning EcoPoints.
      `,
    });

    return response.text || "Keep it up! You’re earning EcoPoints!";
  } catch (error) {
    console.error("Gemini error:", error);
    return "Great work! Your sustainable actions are making a difference.";
  }
};
