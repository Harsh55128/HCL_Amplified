require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error(
        "GEMINI_API_KEY is missing from environment variables"
    );
}

console.log("Gemini API key loaded successfully.");

const ai = new GoogleGenAI({
    apiKey: apiKey
});

const generateText = async ({
    systemPrompt,
    userPrompt
}) => {

    try {

        const response =
            await ai.models.generateContent({

                model:
    process.env.GEMINI_MODEL ||
    "gemini-3.6-flash",

                contents:
                    `${systemPrompt}\n\n${userPrompt}`

            });

        return response.text;

    } catch (error) {

        console.error(
            "Gemini generation error:",
            error
        );

        throw new Error(
            "Failed to generate LLM response"
        );
    }
};

module.exports = {
    generateText
};