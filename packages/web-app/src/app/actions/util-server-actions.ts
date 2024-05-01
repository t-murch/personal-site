import { headers } from "next/headers";

async function getHost() {
  const headerList = headers();
  const host = headerList.get("host");

  return host;
}

export { getHost };
