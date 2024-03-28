import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * CONSTANTS HERE UNTIL I NEED ANOTHER FILE
 */
export const MUSIC_TITLE = "Popular Jams";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
