import Image from "next/image";
import NextLogo from "@/../public/next.svg";
import { ContentRowProps } from "./contentRow";

export default function SpotifyRow({
  additional,
  imageLink,
  secondaryInfo,
  title,
  url,
}: ContentRowProps) {
  return (
    <>
      <a
        href={url}
        className="flex flex-row gap-2 @xl/card:gap-3 items-center whitespace-nowrap overflow-hidden overflow-ellipsis @[14rem]/card:font-semibold @[14rem]/card:text-[#adbac7] text-sm @[14rem]/card:text-lg"
        target="_blank"
      >
        <Image
          src={imageLink ?? NextLogo}
          alt={`${title} album cover`}
          // fill={true}
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
      </a>
    </>
  );
}
