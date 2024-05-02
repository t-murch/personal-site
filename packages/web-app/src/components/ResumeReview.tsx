"use client";

import { Suspense } from "react";
import { TLDRContent } from "./ResumeTLDR";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ResumeSummary } from "./ResumeSummary";

function ResumeReviewContent() {
  return (
    <>
      <Tabs
        // defaultValue="StrongSuits"
        defaultValue="TLDR"
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
          <Suspense fallback={<ResumeReviewSkeleton />}>
            <ResumeSummary />
          </Suspense>
        </TabsContent>
        <TabsContent value="TLDR" className="h-full">
          <Suspense fallback={<ResumeReviewSkeleton />}>
            <TLDRContent />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}

export function ResumeReview() {
  return <ResumeReviewContent />;
}

const skeletonWidths = ["w-3/4", "w-4/5", "w-[90%]"] as const;
type SkeletonWidth = (typeof skeletonWidths)[number];

function getRandomWidth(idx: number): SkeletonWidth {
  return skeletonWidths[idx % skeletonWidths.length];
}
export function ResumeReviewSkeleton() {
  return (
    <div className="animate-pulse h-full w-full p-2">
      <div className="flex flex-col items-start gap-3 mb-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`bg-gray-200 ${getRandomWidth(index)} h-8 rounded`}
          />
        ))}
      </div>
    </div>
  );
}
