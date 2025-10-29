import { NextRequest, NextResponse } from "next/server";
import translate from "google-translate-api-x";
import { GoogleGenAI } from "@google/genai";

// --- Ensure API key exists ---
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables.");
}

// Initialize the new SDK client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- Translation helper ---
async function translateText(text: string, target: string = "en") {
  try {
    const res = await translate(text, { to: target });
    return res.text;
  } catch (err) {
    console.error("Translation error:", err);
    return text; // fallback to original
  }
}

// --- Safe generation with retry ---
async function safeGenerate(model: string, options: any) {
  try {
    return await ai.models.generateContent({
      model,
      ...options,
    });
  } catch (err: any) {
    if (err.status === 429) {
      const retryDelay =
        err.errorDetails?.find((d: any) => d["@type"]?.includes("RetryInfo"))
          ?.retryDelay || "10s";
      const delayMs = parseInt(retryDelay) * 1000 || 10000;
      console.warn(`Rate limit hit. Retrying after ${delayMs / 1000}s...`);
      await new Promise((r) => setTimeout(r, delayMs));
      return await ai.models.generateContent({
        model,
        ...options,
      });
    }
    throw err;
  }
}

// --- Gemini AI analysis ---
async function analyzeWithGemini(symptoms: string) {
  const prompt = `
You are a professional medical assistant AI.
Analyze the following symptoms and respond strictly in JSON format.
Text: ${symptoms}

JSON format:
{
  "condition": "<probable condition>",
  "confidence": "<confidence level like 'High (85%)'>",
  "firstAid": ["<tip1>", "<tip2>", "<tip3>"],
  "whenToSeeDoctor": ["<situation1>", "<situation2>"]
}`;

  // Use the new Gemini 2 model
  const result = await safeGenerate("gemini-2.0-flash-001", {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
  });
  const text = result.text || "";



  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return { rawResponse: text };
      }
    }
    return { rawResponse: text };
  }
}

// --- POST handler ---
export async function POST(req: NextRequest) {
  try {
    const { symptoms, language = "English" } = await req.json();

    if (!symptoms) {
      return NextResponse.json(
        { error: "Missing 'symptoms' field in request." },
        { status: 400 }
      );
    }

    // Step 1: Translate to English
    const translated = await translateText(symptoms, "en");

    // Step 2: Analyze using Gemini
    const analysis = await analyzeWithGemini(translated);

    // Step 3: If not English, translate back results
    if (language.toLowerCase() !== "english") {
      analysis.condition = await translateText(analysis.condition, language);
      analysis.firstAid = await Promise.all(
        (analysis.firstAid || []).map((t: string) =>
          translateText(t, language)
        )
      );
      analysis.whenToSeeDoctor = await Promise.all(
        (analysis.whenToSeeDoctor || []).map((t: string) =>
          translateText(t, language)
        )
      );
    }

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Error in /check-symptoms:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// --- GET handler ---
export async function GET() {
  return NextResponse.json({
    message: "🩺 Symptom Checker Backend running with Gemini 2.0 🚀",
  });
}
