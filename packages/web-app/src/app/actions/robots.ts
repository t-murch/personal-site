"use server";

import { parseError } from "@/lib/utils";
import { GeneralResponse, ReviewParts } from "@/types";
import { Resource } from "sst";

const ROBOTS_API = Resource.RobotsAPI.url;
export type ResumePayload = { text: ReviewParts };

export async function getResumeTLDRData(): Promise<
  GeneralResponse<ReviewParts, { message: string }>
> {
  console.debug("getting resume data...");

  const response = await fetch(`${ROBOTS_API}/robots/tldr`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data: ReviewParts = await response.json().catch((error) => {
    let errorMsg = parseError(error);

    return {
      error: { message: errorMsg },
      success: false,
    };
  });

  console.debug("resume data sent...");
  return { data, success: true };
}

export async function getResumeSummaryData(): Promise<
  GeneralResponse<string, { message: string }>
> {
  console.debug("getting resume data...");

  const response = await fetch(`${ROBOTS_API}/robots/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: string = await response.text().catch((error) => {
    let errorMsg = parseError(error);
    return { error: { message: errorMsg }, success: false };
  });

  console.debug("resume data sent...");
  return { data, success: true };
}

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const encoder = new TextEncoder();

async function* makeIterator(content: string) {
  const parsedContent = content.split("\n");

  for (const line of parsedContent) {
    for (const char of line) {
      yield encoder.encode(char);
      await sleep(200);
    }
    yield encoder.encode("\n");
  }
}

export async function streamResumeSummaryData() {
  const resumeSummaryData = JSON.stringify(await getResumeSummaryData());
  const iterator = makeIterator(resumeSummaryData);
  const stream = iteratorToStream(iterator);

  return new Response(stream);
}
