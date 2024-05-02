import Image from "next/image";
import Link from "next/link";
import { CardPlacementOptions, IconxRoutes } from "./ListCard";
import { TooltipxPopover } from "./TooltipxPopover";

type CardHeaderContentProps = {
  iconPath: string;
  link: keyof typeof IconxRoutes;
  placement: CardPlacementOptions;
  TitleJSX: () => JSX.Element;
  titleColor: string;
};

export default function CardHeaderContent({
  iconPath,
  link,
  placement,
  TitleJSX,
  titleColor,
}: CardHeaderContentProps) {
  return (
    <div className="flex flex-row justify-between items-center px-2 h-full overflow-hidden text-ellipsis">
      <div className={`flex w-4/5 gap-1 items-center ${titleColor}`}>
        <Title
          iconPath={iconPath}
          link={link}
          placement={placement}
          TitleJSX={TitleJSX}
        />
      </div>
      {iconPath && (
        <Image
          className="inline @xl/card:hidden w-[25px] h-[25px]"
          src={iconPath}
          alt={`${link.slice(0, 1).toUpperCase() + link.slice(1)}-icon`}
          width={25}
          height={25}
        />
      )}
    </div>
  );
}

const Title = ({
  iconPath,
  link,
  placement,
  TitleJSX,
}: Omit<CardHeaderContentProps, "titleColor">) => {
  const TitleContent = () => (
    <>
      {iconPath && (
        <Image
          className="hidden @xl/card:inline w-[50px] h-[50px]"
          src={iconPath}
          alt={`${link.slice(0, 1).toUpperCase() + link.slice(1)}-icon`}
          width={50}
          height={50}
        />
      )}
      {/* TODO: Think about if this should stay this way.  */}
      <TitleJSX />
    </>
  );

  if (placement === "side") {
    return (
      <Link
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        href={IconxRoutes[link]}
      >
        <TitleContent />
      </Link>
    );
  }

  return <TitleContent />;
};
