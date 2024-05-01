"use client";

import NextLogo from "@/../public/icons/next.svg";
import RideIcon from "@/../public/icons/ride.svg";
import RunIcon from "@/../public/icons/run.svg";
import WorkoutIcon from "@/../public/icons/workout.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Separator } from "../ui/separator";
import { ContentRowProps } from "./contentRow";

function iconSelector(type: string) {
  const titleLower = type.toLowerCase();
  if (titleLower === "run") {
    return RunIcon;
  } else if (titleLower === "workout") {
    return WorkoutIcon;
  } else if (titleLower === "ride") {
    return RideIcon;
  }
  return NextLogo;
}

export default function ActivityRow({
  additional,
  imageLink,
  secondaryInfo,
  title,
  url,
  data,
}: ContentRowProps) {
  let rowContainer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rowContainer.current = document.getElementById("container-card");
  }, []);
  // My personal choice to default to workout.
  // It is my most common activity.
  const iconPath = iconSelector((data?.type as string) || "workout");

  function Content() {
    return (
      <div className="flex flex-row gap-2 @xl/card:gap-3 items-center whitespace-nowrap overflow-hidden overflow-ellipsis @[14rem]/card:font-semibold @[14rem]/card:text-[#adbac7] text-sm @[14rem]/card:text-lg">
        <Image
          src={iconPath}
          alt={`${title} album cover`}
          width={25}
          height={25}
          className="bg-white p-1 rounded-md w-[25px] h-[25px]"
          priority
        />
        <div className="overflow-hidden overflow-ellipsis">
          <p>
            {title} <span className="text-xs font-bold text-[#2a2828]">--</span>{" "}
            {secondaryInfo}
          </p>
          <Separator className="hidden @xl/card:flex" />
          <p className="hidden @xl/card:flex text-sm">
            <span className="text-xs font-bold text-[#adbac7]">
              {additional}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // If rowContainer width is > 36rem, then wrap in LiveWrapper
  if (rowContainer.current && rowContainer.current.offsetWidth > 36 * 16) {
    return (
      <Content />
      // <LiveWrapper url={url}>
      // </LiveWrapper>
    );
  }

  return <Content />;
}
