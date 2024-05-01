"use client";

import { usePathname } from "next/navigation";

export default function MyLoader() {
  const pathName = usePathname();

  return null;
}
