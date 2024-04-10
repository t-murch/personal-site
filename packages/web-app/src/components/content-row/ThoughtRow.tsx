"use client";

import NextLogo from "@/../public/icons/next.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Separator } from "../ui/separator";
import LiveWrapper from "./LiveWrapper";
import { ContentRowProps } from "./contentRow";

export default function ThoughtRow({
  additional,
  imageLink,
  secondaryInfo,
  title,
  url,
}: ContentRowProps) {
  let rowContainerOffset = useRef<number>(0);

  useEffect(() => {
    // console.debug("musicRowContainer.current", rowContainerOffset.current);
    let rowContainer = document.getElementById("container-card");
    rowContainerOffset.current = rowContainer
      ? rowContainer.offsetWidth
      : rowContainerOffset.current;
  }, []);

  function Content() {
    return (
      <div className="flex flex-row gap-2 @xl/card:gap-3items-center whitespace-nowrap overflow-hidden overflow-ellipsis @[14rem]/card:font-semibold @[14rem]/card:text-[#adbac7] text-sm @[14rem]/card:text-lg">
        <Image
          src={imageLink ?? NextLogo}
          alt={`${title} album cover`}
          width={25}
          height={25}
          className="rounded-md w-[25px] h-[25px]"
          priority
        />
        <div className="h-full overflow-hidden overflow-ellipsis">
          <p>
            {title} <span className="text-xs font-bold text-[#2a2828]">by</span>{" "}
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
  if (rowContainerOffset.current && rowContainerOffset.current > 36 * 16) {
    return (
      <LiveWrapper url={url}>
        <Content />
      </LiveWrapper>
    );
  }

  return <Content />;
}
