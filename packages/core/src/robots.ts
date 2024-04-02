export * as Robots from "./robots";

import * as PDFJS from "pdfjs-dist";
const PDFWorker = require("pdfjs-dist/build/pdf.worker.mjs");
PDFJS.GlobalWorkerOptions.workerSrc = PDFWorker;
import AWS from "aws-sdk";
import { Buffer } from "node:buffer";
import { Bucket } from "sst/node/bucket";
import { Config } from "sst/node/config";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com";
const MODEL_NAME = "gemini-1.0-pro";
// const INITIAL_PROMPT = "Based on your resume, I have generated a summary of your experience. Please review the summary and let me know if you would like to make any changes. \n\n";
const INITIAL_PROMPT =
  "You are an Senior Engineering Manager reviewing resumes for open FullStack Developer roles. \n\nNow look at the resume below, and answer the following questions in 1-2 sentences.\n\nWhat are this Developers strong suits? \nWhat is the TL;DR of this resume? \n\n,";

async function parsePdf(fileContent: Buffer): Promise<string> {
  let fileData = "";
  try {
    const loadPdf = await PDFJS.getDocument(new Uint8Array(fileContent))
      .promise;
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

export async function analyze() {
  let text = "";
  const urlPath = `v1beta/models/${MODEL_NAME}:generateContent?key=${Config.GEMINI_API_KEY}`;
  // Need to get the resume from the s3 bucket
  const s3 = new AWS.S3();
  const resumeText = await getResume(s3);

  const response = await fetch(`${GEMINI_BASE_URL}/${urlPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: INITIAL_PROMPT + resumeText }],
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

  try {
    const { candidates } =
      (await response.json()) as GeminiGenerateContentReturn;
    const data = candidates[0].content.parts[0]?.text;
    text = data;
  } catch (error) {
    console.error("Error fetching the data from gemini: ", error);
  }
  return { text: text };
}

async function getResume(s3: AWS.S3): Promise<string> {
  let resumeText = "";
  const params = {
    Bucket: Bucket.RobotsBucket.bucketName,
    Key: "samples/tm-resume.txt",
  };

  try {
    const resume = await s3.getObject(params).promise();
    resumeText = resume.Body?.toString("utf-8") ?? "";
  } catch (error) {
    console.error("Error getting the resume from s3: ", error);
  }

  return resumeText;
}

// Upload the resume to the s3 bucket
export async function upload(fileContent: Buffer) {
  const parsedFile = await parsePdf(fileContent);
  // console.debug("parsedFile: ", parsedFile + "\n\n");
  const s3 = new AWS.S3();
  const params = {
    Bucket: Bucket.RobotsBucket.bucketName,
    Key: "samples/tm-resume.txt",
    Body: parsedFile,
  };

  await s3.upload(params).promise();

  return "Resume uploaded successfully!";
}
