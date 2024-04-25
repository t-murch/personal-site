"use client";

import { resumeDataAtom } from "@/app/store";
import { useAtomValue } from "jotai";
import { Suspense, useEffect, useState } from "react";
import config from "../../config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function ResumeReviewContent() {
  // const [{ data }] = useAtom(useResumeTLDRDataAtom);
  const data = useAtomValue(resumeDataAtom);
  const [summary, setSummary] = useState("");
  const TLDR = data?.TLDR ?? "";

  useEffect(() => {
    const apiUrl = config.apiGateway.URL_STREAMING_ROBOTS!;

    async function fetchSummary() {
      try {
        const response = await fetch(apiUrl);
        console.debug("fetched summary");

        const reader = response.body?.getReader();
        if (!reader) return;
        const decoder = new TextDecoder();

        const appendToSummary = (chunk: Uint8Array) => {
          setSummary((prev) => prev + decoder.decode(chunk));
        };

        const read = async () => {
          while (true) {
            const { done, value } = await reader?.read();
            if (done) break;
            appendToSummary(value);
          }
        };

        read();
      } catch (error) {
        console.error("Error fetching resume summary: ", error);
      }
    }

    fetchSummary();
  }, []);

  return (
    <>
      <Tabs
        defaultValue="StrongSuits"
        className="w-full h-full overflow-hidden"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="StrongSuits">
            <h2 className="font-bold">Summary</h2>
          </TabsTrigger>
          <TabsTrigger value="TLDR">
            <h2 className="font-bold">TL;DR</h2>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="StrongSuits" className="h-full">
          <p className="font-normal text-base h-full overflow-scroll">
            {!!summary.length && summary}
          </p>
        </TabsContent>
        <TabsContent value="TLDR">
          <p className="font-normal text-base">{!!TLDR && TLDR}</p>
          {/* <p className="font-normal text-base">{"We Testing..."}</p> */}
        </TabsContent>
      </Tabs>
    </>
  );
}

const skeletonWidths = ["w-3/4", "w-4/5", "w-[90%]"] as const;
type SkeletonWidth = (typeof skeletonWidths)[number];

function getRandomWidth(idx: number): SkeletonWidth {
  return skeletonWidths[idx % skeletonWidths.length];
}

function ResumeReviewSkeleton() {
  return (
    <div className="animate-pulse h-full w-full p-2">
      <div className="flex flex-col items-start gap-3 mb-2">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className={`bg-gray-200 ${getRandomWidth(index)} h-8 rounded`}
          />
        ))}
      </div>
    </div>
  );
}

export function ResumeReview() {
  // return <ResumeReviewSkeleton />;
  return (
    <Suspense fallback={<ResumeReviewSkeleton />}>
      <ResumeReviewContent />
    </Suspense>
  );
}
