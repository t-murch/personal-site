import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CardPlacementOptions, IconxRoutes } from "./ListCard";

type CardHeaderContentProps = {
  iconPath: string;
  link: keyof typeof IconxRoutes;
  placement: CardPlacementOptions;
  title: string;
  titleColor: string;
};

export default function CardHeaderContent({
  iconPath,
  link,
  placement,
  title,
  titleColor,
}: CardHeaderContentProps) {
  return (
    <div className="flex flex-row justify-between items-center px-2 h-full overflow-hidden text-ellipsis">
      <div className={`flex w-4/5 gap-1 items-center ${titleColor}`}>
        <Title
          iconPath={iconPath}
          link={link}
          placement={placement}
          title={title}
        />
      </div>
      <div>
        {iconPath && (
          <Image
            className="inline @xl/card:hidden w-[25px] h-[25px]"
            src={iconPath}
            alt={`${title}-icon`}
            width={25}
            height={25}
          />
        )}
        <Link href="/">
          <Icon name="minimize" className="hidden @xl/card:inline" />
        </Link>
      </div>
    </div>
  );
}

const Title = ({
  iconPath,
  link,
  placement,
  title,
}: Omit<CardHeaderContentProps, "titleColor">) => {
  const TitleContent = () => (
    <>
      {iconPath && (
        <Image
          className="hidden @xl/card:inline w-[30px] h-[30px]"
          src={iconPath}
          alt={`${title}-icon`}
          width={30}
          height={30}
        />
      )}
      {/* TODO: Think about if this should stay this way.  */}
      <span title={title}>{title}</span>
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
