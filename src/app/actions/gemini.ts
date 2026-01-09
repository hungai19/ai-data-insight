"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.Gemini_API_Key || process.env.GEMINI_API_KEY;

export async function generateInsights(summaryData: string) {
    if (!apiKey) {
        console.error("Gemini API Key is missing.");
        throw new Error("API Key missing. Please set Gemini_API_Key in .env.local");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Using gemini-2.0-flash for better stability/speed if available, or stay with requested

    const prompt = `
    Bạn là một chuyên gia phân tích dữ liệu. Hãy phân tích bản tóm tắt dữ liệu sau đây và đưa ra 3-5 thông tin hiểu biết (insights) quan trọng nhất cho doanh nghiệp. 
    Lưu ý: 
    - Không giả định đây là dữ liệu cụ thể nào (như bán hàng) trừ khi tiêu đề cột (headers) cho thấy điều đó.
    - Hãy dựa vào tên các cột và dữ liệu mẫu để xác định ngữ cảnh của dữ liệu.
    - Câu trả lời viết bằng tiếng Việt, ngắn gọn, súc tích và trực tiếp.
    - Sử dụng định dạng bullet points.
    
    Tóm tắt dữ liệu:
    ${summaryData}
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Error generating insights:", error);
        if (error.message?.includes("API key")) {
            throw new Error("Invalid API Key provided.");
        }
        throw new Error(error.message || "Failed to generate insights.");
    }
}

export async function getAnalysisSuggestions(headers: string[]) {
    if (!apiKey) {
        throw new Error("API Key missing.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    Dựa trên danh sách các cột (headers) của một tệp dữ liệu sau đây:
    Headers: ${headers.join(", ")}
    
    Hãy gợi ý 3 hướng phân tích dữ liệu hoặc câu hỏi kinh doanh quan trọng mà người dùng có thể muốn biết từ dữ liệu này.
    Trả lời bằng tiếng Việt, ngắn gọn, dưới dạng danh sách.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Error getting suggestions:", error);
        throw new Error("Failed to get suggestions.");
    }
}

export async function analyzeChartData(chartInfo: { type: string, xAxis: string, yAxis: string, summary: string }) {
    if (!apiKey) {
        throw new Error("API Key missing.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    Bạn là một chuyên gia phân tích dữ liệu. Hãy phân tích biểu đồ sau đây và đưa ra các nhận xét quan trọng:
    - Loại biểu đồ: ${chartInfo.type}
    - Trục X (Nhãn): ${chartInfo.xAxis}
    - Trục Y (Giá trị): ${chartInfo.yAxis}
    - Dữ liệu tóm tắt: ${chartInfo.summary}
    
    Yêu cầu:
    1. Chỉ ra xu hướng nổi bật nhất (ví dụ: tăng/giảm, mục nào cao nhất/thấp nhất).
    2. Đưa ra 1-2 nhận xét về ý nghĩa kinh doanh của dữ liệu này.
    3. Trả lời bằng tiếng Việt, ngắn gọn, súc tích, sử dụng bullet points.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Error analyzing chart:", error);
        throw new Error("Failed to analyze chart data.");
    }
}
