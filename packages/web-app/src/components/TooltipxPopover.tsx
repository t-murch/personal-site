"use client";

import { JSX } from "react";
import Icon from "./Icon";
import { useMediaQuery } from "./hooks/use-media-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const MESSAGE =
  "Created using the Google Gemini API, so responses may vary and sometimes untrue. ";

export function TooltipxPopover() {
  let Content: JSX.Element;
  const useDesktop = useMediaQuery();

  Content = useDesktop ? GeminiToolTip() : GeminiPopover();

  return Content;
}

function GeminiToolTip() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="self-baseline cursor-default">
            <Icon name="info" size={25} />
          </TooltipTrigger>
          <TooltipContent className="border bg-[rgb(12, 10, 9)] text-white max-h-20">
            <p>{MESSAGE}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

function GeminiPopover() {
  return (
    <>
      <Popover>
        <PopoverContent>{MESSAGE}</PopoverContent>
        <PopoverTrigger>
          <Icon name="info" size={25} />
        </PopoverTrigger>
      </Popover>
    </>
  );
}
