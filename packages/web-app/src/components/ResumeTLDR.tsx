import { getResumeTLDRData } from "@/app/actions/robots";

export async function TLDRContent() {
  const data = await getResumeTLDRData();

  return (
    <p className="font-normal text-base h-full overflow-y-scroll">
      {data?.TLDR && data.TLDR.join(" ")}
    </p>
  );
}
