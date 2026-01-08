"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.Gemini_API_Key || process.env.GEMINI_API_KEY;

export async function generateInsights(summaryData: string) {
    if (!apiKey) {
        console.error("Gemini API Key is missing.");
        throw new Error("API Key missing. Please set Gemini_API_Key in .env.local");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-2.5-flash as requested
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are a data analyst assistant. Analyze the following summary of sales data and provide 3-5 key business insights being brief and direct.
    Please write your response in Vietnamese.
    Use bullet points.
    
    Data Summary:
    ${summaryData}
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Error generating insights:", error);
        // Pass the actual error message if safe, or a specific one
        if (error.message?.includes("API key")) {
            throw new Error("Invalid API Key provided.");
        }
        throw new Error(error.message || "Failed to generate insights.");
    }
}
