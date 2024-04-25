"use client";

import GeminiLogo from "@/../public/icons/gemini.svg";
import Image from "next/image";
import Link from "next/link";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useMediaQuery } from "./hooks/use-media-query";

export function NavigationContent() {
  const useDesktop = useMediaQuery();
  const displayLocation = useDesktop ? "right" : "bottom";
  const drawerHeight = useDesktop ? "" : "h-56";

  return (
    <SheetContent className={`${drawerHeight}`} side={displayLocation}>
      {" "}
      <SheetHeader>
        <SheetTitle className="flex text-3xl self-center">Nav</SheetTitle>
        <Separator />
        <SheetDescription
          className={`flex flex-col gap-2 text-2xl items-center`}
        >
          <SheetClose asChild>
            <Link href="/">Home</Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/music">Music</Link>
          </SheetClose>
          {/* <SheetClose asChild> */}
          {/*   <Link href="/movement">Movement</Link> */}
          {/* </SheetClose> */}
          <SheetClose asChild>
            <Link href="/resume_summary" className="flex flex-row">
              Resume Summary{" "}
              <Image
                className="pb-2"
                src={GeminiLogo}
                width={20}
                height={20}
                alt=""
              />
            </Link>
          </SheetClose>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
