"use client";

import GeminiLogo from "@/../public/icons/gemini.svg";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useMediaQuery } from "./hooks/use-media-query";
import { Separator } from "./ui/separator";

export function MyNavigator() {
  const useDesktop = useMediaQuery("(min-width: 768px)");
  const displayLocation = useDesktop ? "right" : "bottom";
  const drawerHeight = useDesktop ? "" : "h-56";

  return (
    <Sheet>
      <SheetTrigger>
        <Icon
          className="self-center"
          name="menu"
          size={25}
          // color='#adbac7'
        />
      </SheetTrigger>
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
    </Sheet>
  );
}
