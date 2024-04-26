"use client";

import NextLogo from "@/../public/icons/next.svg";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { ContentRowProps } from "./contentRow";
import LiveWrapper from "./LiveWrapper";

export default function MusicRow({
  additional,
  imageLink,
  secondaryInfo,
  title,
  url,
}: ContentRowProps) {
  function Content() {
    return (
      <div className="flex flex-row min-h-10 px-2 @[14rem]/card:min-h-14 gap-2 @xl/card:gap-3 items-center whitespace-nowrap overflow-hidden overflow-ellipsis @[14rem]/card:font-semibold @[14rem]/card:text-[#adbac7] text-sm @[14rem]/card:text-lg">
        <Image
          src={imageLink ?? NextLogo}
          alt={``}
          width={25}
          height={25}
          className="rounded-md w-[25px] h-[25px]"
          // These rows are all within a list of 50+, so no.
          // priority
        />
        <div className="h-full overflow-hidden overflow-ellipsis">
          <p>
            {title}
            <span className="text-xs font-bold text-[#2a2828]"> by</span>{" "}
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

  return (
    <LiveWrapper url={url} newTab>
      <Content />
    </LiveWrapper>
  );
}
