import { GoogleGenAI } from "@google/genai";
import { Company, CorporateAction, ActionType } from "../types";

// Initialize the Gemini AI client
// Note: In a real production app, ensure your API key is restricted or proxied.
const getGeminiKey = () => process.env.API_KEY || localStorage.getItem('GEMINI_API_KEY') || '';
const ai = new GoogleGenAI({ apiKey: getGeminiKey() });

export const GeminiService = {
  /**
   * Analyzes the potential impact of a corporate action using Gemini.
   */
  analyzeActionImpact: async (company: Company, action: CorporateAction): Promise<string> => {
    if (!getGeminiKey()) {
      return "AI Analysis Unavailable: API Key missing.";
    }

    try {
      // Define specific analysis instructions based on the action type
      let specificInstructions = `
        1. The immediate expected impact on stock price.
        2. What this signals about the company's health.
        3. Sentiment (Bullish/Bearish/Neutral).
      `;

      // Tailored prompt for Dividend actions
      if (action.type === ActionType.DIVIDEND) {
        specificInstructions = `
          1. The immediate impact on stock price (considering ex-dividend adjustments).
          2. Impact on investor sentiment, specifically regarding income stability and yield attractiveness.
          3. Assessment of future payout expectations and sustainability.
          4. Overall Sentiment (Bullish/Bearish/Neutral).
        `;
      }

      const prompt = `
        You are a senior financial analyst.
        Analyze the following corporate action for ${company.name} (${company.ticker}).
        
        Action Type: ${action.type}
        Description: ${action.description}
        Date: ${action.date}
        Value: ${action.value || 'N/A'}
        
        Current Market Context:
        Price: $${company.price}
        Market Cap: $${(company.marketCap / 1e9).toFixed(2)} Billion
        Dividend Yield: ${(company.dividendYield * 100).toFixed(2)}%
        
        Please provide a concise, plain-language analysis (max 150 words) covering:
        ${specificInstructions}
        
        Format the response in simple Markdown (use bolding for key terms and numbered lists for points).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || "Analysis could not be generated.";
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "An error occurred while generating the analysis. Please try again later.";
    }
  },

  /**
   * Generates a visual summary graphic for a stock.
   */
  generateStockImage: async (company: Company): Promise<string | null> => {
    if (!getGeminiKey()) {
      console.warn("API Key missing for image generation");
      return null;
    }

    try {
      const prompt = `
        Create a professional, futuristic, and clean financial infographic for ${company.name} (${company.ticker}).
        The image should feature a stylized bullish chart background in teal and blue tones.
        It should visually represent the concept of "Growth" and "Stability".
        Do not include text overlays. 
        Style: 3D, Minimalist, Fintech, High Quality.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image', // Using flash-image for speed/standard quality
        contents: prompt,
      });

      // Extract image from response
      // For Gemini 2.5 Flash Image, we look for inlineData in the parts
      const candidates = response.candidates;
      if (candidates && candidates.length > 0) {
        for (const part of candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
      }
      return null;
    } catch (error) {
      console.error("Gemini Image Gen Error:", error);
      return null;
    }
  }
};