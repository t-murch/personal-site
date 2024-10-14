"use server";

import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { ReviewParts } from "@/types";
import { get } from "aws-amplify/api/server";
import { cookies } from "next/headers";

export type ResumePayload = { text: ReviewParts };

export async function getResumeTLDRData(): Promise<ReviewParts> {
  let data: ReviewParts = {} as ReviewParts;
  console.debug("getting resume data...");

  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (context) => {
      try {
        // const { body } = await get(context, {
        const { body, statusCode } = await get(context, {
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
        // // return after 5 second delay
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        console.debug("resume data sent...");
        return data;
      }
    },
  });
}

export async function getResumeSummaryData(): Promise<string> {
  let data = "";
  console.debug("getting resume data...");

  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (context) => {
      try {
        const { body } = await get(context, {
          apiName: "robots",
          path: "/robots/summary",
        }).response;

        data = await body.text();
      } catch (error) {
        const errorMsg = `error getting resume: `;
        if (error instanceof Error) {
          console.error(errorMsg + error.message);
        } else {
          console.error(errorMsg);
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
