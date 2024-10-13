export * as Robots from "./robots";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Buffer } from "node:buffer";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { Resource } from "sst";
import { ReviewParts } from "../../web-app/src/types";
import * as PDFJS from "pdfjs-dist";
import { GeminiGenerateContentReturn } from "./utils/types";
PDFJS.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url,
).toString();

const geminiBaseUrl = "https://generativelanguage.googleapis.com";
export const MODEL_NAME = "gemini-1.0-pro";
// const INITIAL_PROMPT =
//   "You are an Senior Engineering Manager reviewing resumes for open FullStack Developer roles. \n\nNow look at the resume below, and answer the following questions in 1-2 sentences.\n\nWhat are this Developers strong suits? \nWhat is the TL;DR of this resume? \n\n,";
//

// We need to update the INITIAL_PROMPT to split it into two different requests
// So that we can stream the StrongSuits requests back to the user
// TLDR will still be a single request
// The return values will be simple strings
const STRONG_SUITS_PROMPT = `You are an Senior Engineering Manager reviewing resumes for open FullStack Developer roles. \n\nNow look at the resume below, and answer the following question in 7-10 sentences.\n\nWhat are this Developers strong suits? \n\n`;
const INITIAL_PROMPT = `Please respond with a JSON object without trailing commas in the form of: \n\t{ \n\t\t"StrongSuits": [Answer/Content as an array of strings with the value being \n\t\t\tsentences.],\n\t\t"TLDR": [Answer/Content as an array of strings with the value being sentences.]\n\t}. The response should start with an "{" and end with an "}".\n\nYou are an Senior Engineering Manager reviewing resumes for open FullStack Developer roles. \n\nNow look at the resume below, and answer the following questions in 7-10 sentences.\n\n[key: "Strong Suits"] - What are this Developers strong suits? \n[key: "TLDR"] - What is the TL;DR of this resume?\n`;

async function parsePdf(fileContent: Buffer): Promise<string> {
  let fileData = "";
  try {
    const loadPdf = await getDocument({
      data: new Uint8Array(fileContent),
      useSystemFonts: true,
    }).promise;
    const pages = loadPdf.numPages;
    // parse the text from the pdf document
    let text = "";
    for (let i = 1; i <= pages; i++) {
      const page = await loadPdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => {
        if (!!item?.str) {
          return item.str;
        }
        return "";
      });
      text += strings.join(" ");
    }

    fileData = text;
  } catch (error) {
    console.error("Error parsing the pdf file: ", error);
  }
  return fileData;
}

export async function analyze(): Promise<string> {
  console.log("Analyze invoked");
  let data: GeminiGenerateContentReturn | null = null;
  const s3 = new S3Client({});
  // const s3 = new AWS.S3();
  const resumeText = await getResume(s3);
  const { urlPath, requestOptions } = getGeminiRequest(
    resumeText,
    STRONG_SUITS_PROMPT,
  );
  try {
    const response = await fetch(
      new URL(urlPath, geminiBaseUrl),
      requestOptions,
    );
    data = (await response.json()) as GeminiGenerateContentReturn;
  } catch (error) {}

  const textResponse = data?.candidates[0].content.parts[0].text;
  console.log("Analyze response parsed text: ", textResponse);
  return textResponse ?? "";
}

export async function tldr(): Promise<ReviewParts> {
  console.log("TLDR invoked");
  const s3 = new S3Client({});
  const resumeText = await getResume(s3);
  const { urlPath, requestOptions } = getGeminiRequest(
    resumeText,
    INITIAL_PROMPT,
  );

  const response = await fetch(new URL(urlPath, geminiBaseUrl), requestOptions);

  const data = (await response.json()) as GeminiGenerateContentReturn;
  const textResponse = data.candidates[0].content.parts[0].text;
  const parsedData = JSON.parse(textResponse) as ReviewParts;

  return parsedData;
}

export async function getResume(s3: S3Client): Promise<string> {
  let resumeText = "";
  const params = {
    Bucket: Resource.RobotsBucket.name,
    Key: "samples/tm-resume.txt",
  };

  try {
    console.log("Getting resume from s3");
    const resume = await s3.send(new GetObjectCommand(params));
    resumeText = (await resume.Body?.transformToString()) ?? "";
    // console.debug(`resume text from s3 = ${resumeText}`);
    // resumeText = resume.Body?.toString("utf-8") ?? "";
  } catch (error) {
    console.error("Error getting the resume from s3: ", error);
  }

  return resumeText;
}

// Upload the resume to the s3 bucket
export async function upload(fileContent: Buffer) {
  const parsedFile = await parsePdf(fileContent);
  // console.debug("parsedFile: ", parsedFile + "\n\n");
  const s3 = new S3Client({});
  // const s3 = new AWS.S3();
  const params = {
    Bucket: Resource.RobotsBucket.name,
    Key: "samples/tm-resume.txt",
    Body: parsedFile,
  };

  // await s3.upload(params).promise();
  await s3.send(new PutObjectCommand(params));

  return "Resume uploaded successfully!";
}

function getGeminiRequest(
  resumeText: string,
  prompt: string,
): { urlPath: string; requestOptions: RequestInit } {
  const urlPath = `/v1beta/models/${MODEL_NAME}:generateContent?key=${Resource.GEMINI_API_KEY.value}`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt + resumeText }],
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
  };

  return { urlPath, requestOptions };
}
