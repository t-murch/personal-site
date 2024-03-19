"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import NextLogo from "@/../public/next.svg";
import { ContentRowProps } from "./contentRow";

export default function MusicRow({
  additional,
  imageLink,
  secondaryInfo,
  title,
  url,
}: ContentRowProps) {
  const activePath = usePathname();
  function LiveWrapper({ children }: { children: React.ReactNode }) {
    return (
      <a
        href={url}
        className="flex flex-row gap-2 @xl/card:gap-3 items-center whitespace-nowrap overflow-hidden overflow-ellipsis @[14rem]/card:font-semibold @[14rem]/card:text-[#adbac7] text-sm @[14rem]/card:text-lg"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  if (activePath === "/music") {
    return (
      <>
        <LiveWrapper>
          <Image
            src={imageLink ?? NextLogo}
            alt={`${title} album cover`}
            width={50}
            height={50}
            className="rounded-md"
            priority
          />
          <div className="overflow-hidden overflow-ellipsis">
            <p>
              {title}{" "}
              <span className="text-xs font-bold text-[#2a2828]">by</span>{" "}
              {secondaryInfo}
            </p>
            <p className="hidden @xl/card:flex text-sm">
              <span className="text-xs font-bold text-[#adbac7]">
                {additional}
              </span>
            </p>
          </div>
        </LiveWrapper>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-row gap-2 @xl/card:gap-3 items-center whitespace-nowrap overflow-hidden overflow-ellipsis @[14rem]/card:font-semibold @[14rem]/card:text-[#adbac7] text-sm @[14rem]/card:text-lg">
        <Image
          src={imageLink ?? NextLogo}
          alt={`${title} album cover`}
          width={50}
          height={50}
          className="rounded-md"
          priority
        />
        <div className="overflow-hidden overflow-ellipsis">
          <p>
            {title} <span className="text-xs font-bold text-[#2a2828]">by</span>{" "}
            {secondaryInfo}
          </p>
          <p className="hidden @xl/card:flex text-sm">
            <span className="text-xs font-bold text-[#adbac7]">
              {additional}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
