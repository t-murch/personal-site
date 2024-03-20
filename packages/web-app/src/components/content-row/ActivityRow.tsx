"use client";

import RideIcon from "@/../public/ride.svg";
import RunIcon from "@/../public/run.svg";
import WorkoutIcon from "@/../public/workout.svg";
import NextLogo from "@/../public/next.svg";
import Image from "next/image";
import { ContentRowProps } from "./contentRow";
import LiveWrapper from "./LiveWrapper";
import { Separator } from "../ui/separator";

function iconSelector(type: string) {
  const titleLower = type.toLowerCase();
  console.debug("titleLower", titleLower);
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

  const rowContainer = document.getElementById("container-card");
  // If rowContainer width is > 36rem, then wrap in LiveWrapper
  if (rowContainer && rowContainer.offsetWidth > 36 * 16) {
    return (
      <LiveWrapper url={url}>
        <Content />
      </LiveWrapper>
    );
  }

  return <Content />;
}
