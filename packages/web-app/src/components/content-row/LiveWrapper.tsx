import Link from "next/link";
import React from "react";

function LiveWrapper({
  children,
  newTab = false,
  url,
}: {
  children: React.ReactNode;
  newTab?: boolean;
  url: string;
}) {
  return newTab ? (
    <Link href={url} target="_blank">
      {children}
    </Link>
  ) : (
    <Link href={url}>{children}</Link>
  );
}

export default LiveWrapper;
