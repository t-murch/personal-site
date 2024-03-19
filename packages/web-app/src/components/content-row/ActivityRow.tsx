import { ContentRowProps } from "./contentRow";

export default function ActivityRow({
  additional,
  imageLink,
  secondaryInfo,
  title,
  url,
}: ContentRowProps) {
  return (
    <>
      <div className="flex flex-row gap-2 @xl/card:gap-3 items-center whitespace-nowrap overflow-hidden overflow-ellipsis @[14rem]/card:font-semibold @[14rem]/card:text-[#adbac7] text-sm @[14rem]/card:text-lg"></div>
    </>
  );
}
