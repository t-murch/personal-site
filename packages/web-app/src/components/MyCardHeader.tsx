"use client";

import Icon from "./Icon";
import { useMediaQuery } from "./hooks/use-media-query";

export function MyCardHeader({ title }: { title: string }) {
  const useDesktop = useMediaQuery();
  const iconSize = useDesktop ? 50 : 25;

  return (
    <div className="flex gap-1 text-xl md:text-6xl font-bold items-center">
      <Icon name="scroll-text" alt="scroll-icon" size={iconSize} />
      {title}
    </div>
  );
}
