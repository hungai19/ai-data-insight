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

async function test() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.Gemini_API_Key;
    console.log("Testing with API Key:", apiKey ? "Present (" + apiKey.substring(0, 5) + "...)" : "Missing");

    if (!apiKey) {
        console.error("No API KEY found!");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // List models
    try {
        console.log("Listing available models...");
        // For some reason listModels isn't always easy to reach on the main client, but let's try direct instantiation of a likely model
        // Actually, 'gemini-1.5-flash-latest' is a known alias.
    } catch (e) { }

    const modelsToTry = ["gemini-1.5-flash-latest", "gemini-1.0-pro", "gemini-pro-vision"];

    for (const m of modelsToTry) {
        try {
            console.log(`Attempting model: ${m}`);
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Hello, are you there?");
            console.log(`Success with ${m}!`);
            console.log(result.response.text());
            return;
        } catch (e) {
            console.error(`Failed with ${m}:`, e.message);
        }
    }
}

test();
