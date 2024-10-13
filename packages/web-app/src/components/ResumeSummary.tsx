"use client";

import { useEffect, useState } from "react";

async function* streamingFetch(url: string) {
  console.log(`hit streamingFetch`);
  const response = await fetch(url);

  console.log(`response.status ?? ${response.status}`);
  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  if (reader) {
    console.log(`hit reader`);
    for (;;) {
      const { done, value } = await reader?.read();
      if (done) break;

      try {
        yield decoder.decode(value, { stream: true });
      } catch (error: any) {
        console.warn(error?.message ?? "Error in stream consumption.");
      }
    }
  }
}

export function ResumeSummary() {
  console.log(`hit summary component`);
  const [data, setData] = useState("");

  useEffect(() => {
    async function asyncFetch() {
      console.log(`hit asyncFetch`);
      const myRes = streamingFetch("/api?query=resumeSummary");

      for await (let value of myRes) {
        try {
          // const chunk = JSON.parse(value);
          // console.log(`hit chunk = ${chunk}`);
          setData((prev) => `${prev}${value}`);
        } catch (error: any) {
          console.warn(error?.message ?? "Error rendering stream.");
        }
      }
    }

    asyncFetch();
  }, []);

  return (
    <p className="font-normal text-base h-full overflow-y-scroll">{data}</p>
  );
}
