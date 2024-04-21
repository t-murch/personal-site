"use server";

import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { get } from "aws-amplify/api/server";
import { cookies } from "next/headers";

export type ResumePayload = { text: ReviewParts };
export type ReviewParts = { StrongSuits: string; TLDR: string };

export async function getResumeTLDRData(): Promise<ReviewParts> {
  let data: ReviewParts = { StrongSuits: "", TLDR: "" };
  console.debug("getting resume data...");

  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (context) => {
      try {
        const { body } = await get(context, {
          apiName: "robots",
          path: "/robots/tldr",
        }).response;

        data = (await body.json()) as ReviewParts;
      } catch (error) {
        if (error instanceof Error) {
          console.debug(
            "error getting resume: ",
            JSON.stringify(error, null, 2),
          );
        } else {
          console.error("error is not of Error type: ", error);
        }
      } finally {
        console.debug("resume data sent...");
        return data;
      }
    },
  });
}

export async function getResumeSummaryData(): Promise<ReviewParts> {
  let data: ReviewParts = {} as ReviewParts;
  console.debug("getting resume data...");

  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (context) => {
      try {
        const { body } = await get(context, {
          apiName: "summary",
          path: "/",
        }).response;

        data = (await body.json()) as ReviewParts;
      } catch (error) {
        if (error instanceof Error) {
          console.debug(
            "error getting resume: ",
            JSON.stringify(error, null, 2),
          );
        } else {
          console.error("error is not of Error type: ", error);
        }
      } finally {
        console.debug("resume data sent...");
        return data;
      }
    },
  });
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
