import { headers } from "next/headers";

async function getHost() {
  const headerList = await headers();
  const host = headerList.get("host");

  return host;
}

export { getHost };
