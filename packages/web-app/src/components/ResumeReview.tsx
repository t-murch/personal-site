"use client";

import { useResumeDataAtom } from "@/app/store";
import { useAtom } from "jotai";
import { Suspense } from "react";

function ResumeReviewContent() {
  const [{ data }] = useAtom(useResumeDataAtom);
  const { StrongSuits, TLDR } = data;

  console.debug("StrongSuits", StrongSuits);
  console.debug("TLDR", TLDR);
  // return <div>poops</div>;
  return (
    <>
      <h2>
        Some Strong Suits
        <ul>
          {StrongSuits &&
            StrongSuits.map((strongSuit, idx) => {
              return (
                <li key={idx} className="list-none">
                  {strongSuit}
                </li>
              );
            })}
        </ul>
      </h2>
      <h2>
        TL;DR
        <ul>
          {TLDR &&
            TLDR.map((tldr, idx) => {
              return (
                <li key={idx} className="list-none">
                  {tldr}
                </li>
              );
            })}
        </ul>
      </h2>
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
