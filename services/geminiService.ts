import { GoogleGenAI } from "@google/genai";
import { AnalysisTopic } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnalysis = async (topic: AnalysisTopic): Promise<string> => {
  const modelId = "gemini-2.5-flash";
  
  let prompt = "";

  switch (topic) {
    case AnalysisTopic.HISTORY:
      prompt = "Analyze the development history of Kuaishou (快手). Focus on its transition from 'GIF Kuaishou' to a short video platform, and its IPO. Structure the response with clear milestones.";
      break;
    case AnalysisTopic.BUSINESS_MODEL:
      prompt = "Analyze Kuaishou's business model. Explain its revenue streams: Live Streaming (virtual gifting), Online Marketing Services (Ads), and E-commerce. Provide insights on the shift in revenue composition over recent years.";
      break;
    case AnalysisTopic.COMPETITION:
      prompt = "Compare Kuaishou with its main competitor, Douyin (TikTok China). Analyze their differences in user demographics, algorithm philosophy (traffic distribution), and community culture (Laotie culture).";
      break;
    case AnalysisTopic.FUTURE:
      prompt = "Provide a future outlook for Kuaishou. Discuss challenges (user growth saturation) and opportunities (AI integration, overseas expansion, local services).";
      break;
    default:
      prompt = "Tell me about Kuaishou.";
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are a senior business analyst specializing in the Chinese tech sector. Your output should be professional, insightful, and formatted in clean Markdown. Use bolding for key terms.",
      }
    });

    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Error generating analysis:", error);
    return "## Error\nUnable to generate analysis at this time. Please check your API key or try again later.";
  }
};