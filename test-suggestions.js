const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

// Simple .env.local parser
function loadEnv() {
    try {
        const data = fs.readFileSync('.env.local', 'utf8');
        const lines = data.split('\n');
        for (const line of lines) {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                process.env[match[1].trim()] = match[2].trim();
            }
        }
    } catch (e) {
        console.log("Could not read .env.local");
    }
}

loadEnv();

const apiKey = process.env.Gemini_API_Key || process.env.GEMINI_API_KEY;

async function testSuggestions(headers) {
    if (!apiKey) {
        console.error("API Key missing.");
        return;
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
        console.log(`Testing with headers: ${headers.join(", ")}`);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log("Suggestions from AI:");
        console.log(response.text());
        console.log("-------------------");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function runTests() {
    await testSuggestions(["Order ID", "Product", "Qty", "Price", "Customer Name", "Date"]);
    await testSuggestions(["Student ID", "Math", "Physics", "Chemistry", "Full Name", "Class"]);
    await testSuggestions(["Timestamp", "CPU Usage", "Memory Usage", "Disk I/O", "Server Name"]);
}

runTests();
