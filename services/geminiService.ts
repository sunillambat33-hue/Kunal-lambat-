// Fix: Refactored to align with @google/genai SDK guidelines.
// Removed manual API key checks and streamlined initialization, assuming `process.env.API_KEY` is always available.
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchChapterNotes = async (
    subject: string,
    chapter: string,
    onUpdate: (chunk: string) => void,
    onError: (error: string) => void,
): Promise<void> => {
    try {
        const prompt = `Provide detailed, well-structured notes for a Class 10 student on the topic of "${chapter}" from the subject "${subject}". The notes should be comprehensive, easy to understand, and formatted using markdown. Use headings for main topics, sub-headings for sub-topics, bullet points for lists, and bold text for key terms. Ensure the content is accurate and suitable for exam preparation. Do not use markdown code blocks (\`\`\`).`;

        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        for await (const chunk of responseStream) {
            onUpdate(chunk.text);
        }
    } catch (error) {
        console.error("Error fetching notes from Gemini API:", error);
        onError("Failed to load notes. An error occurred while contacting the AI service. Please check the console for details.");
    }
};

export const generateHtmlCode = async (description: string): Promise<string> => {
  try {
    const prompt = `Generate only the HTML code for the following request. The code should be self-contained and ready to be rendered. Do not include any explanations, markdown code blocks (\`\`\`html), or anything other than the raw HTML code itself. The user's request is: "${description}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating HTML from Gemini API:", error);
    return "Failed to generate HTML. An error occurred while contacting the AI service. Please check the console for details.";
  }
};