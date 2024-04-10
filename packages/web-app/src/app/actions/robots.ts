"use server";

import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { get } from "aws-amplify/api/server";
import { cookies } from "next/headers";

// export type ResumePayload = { text: string };
export type ResumePayload = { text: ReviewParts };
export type ReviewParts = { StrongSuits: string[]; TLDR: string[] };

export async function getResumeData(): Promise<ReviewParts> {
  // let data: ResumePayload = { text: "" };
  let data: ReviewParts = { StrongSuits: [], TLDR: [] };
  console.debug("getting resume data...");

  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (context) => {
      try {
        const { body } = await get(context, {
          apiName: "robots",
          path: "/robots/analyze",
        }).response;
        data = (await body.json()) as ReviewParts;
        // reviewParts = JSON.parse(data.text);
        // console.debug("reviewParts", reviewParts + '\n\n');
        // console.debug("data", data.text);
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
