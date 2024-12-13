import { getResumeSummaryData } from "@/app/actions/robots";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * CONSTANTS HERE UNTIL I NEED ANOTHER FILE
 */
export const MUSIC_TITLE = "Popular Jams";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
async function* streamingFetch(url: string) {
  console.log(`hit streamingFetch`);
  const response = await fetch(url);

  if (!response.ok) {
    console.log(`response.status ?? ${response.status}`);
    console.log(`body = ${response.body}`);
    return;
  }
  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  if (reader) {
    console.log(`hit reader reader ?= ${JSON.stringify(reader)}`);
    while (true) {
      const { done, value } = await reader?.read();
      if (done) break;

      try {
        yield decoder.decode(value);
      } catch (error: any) {
        console.warn(error?.message ?? "Error in stream consumption.");
      }
    }
  }
}

export async function delayFetch(
  apiCall: () => Promise<any>,
  delay: number = 1500,
) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return await apiCall();
}

export function parseError(error: any) {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
}
