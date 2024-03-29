import { Config } from "sst/node/config";

export * as Robots from "./robots";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com";
const MODEL_NAME = "gemini-1.0-pro";
// const INITIAL_PROMPT = "Based on your resume, I have generated a summary of your experience. Please review the summary and let me know if you would like to make any changes. \n\n";
const INITIAL_PROMPT =
  "You are an Senior Engineering Manager reviewing resumes for an open FullStack Developer role. \n\nNow look at the resume below, and answer the following questions in 1-2 sentences.\n\nWhat are this Developers strong suits? \nWhat is the TL;DR of this resume? \n\n,";

export async function analyze() {
  const path = `v1beta/models/${MODEL_NAME}:generateContent?key=${Config.GEMINI_API_KEY}`;
  let resume = "";

  const response = await fetch(`${GEMINI_BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: INITIAL_PROMPT + resume }],
        },
      ],
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
        stopSequences: [],
      },
    }),
  });
}
