"use client";

import { JSX } from "react";
import Icon from "./Icon";
import { useMediaQuery } from "./hooks/use-media-query";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
          <TooltipTrigger asChild className="cursor-default">
            <Button variant="ghost" className="h-8 w-8 px-0">
              <Icon name="info" size={25} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
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
