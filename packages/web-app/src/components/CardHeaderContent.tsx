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
    <div className="flex flex-row justify-between pr-1 h-full overflow-hidden text-ellipsis">
      <div className={`flex gap-1 items-center ${titleColor}`}>
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
            className="inline @xl/card:hidden w-[30px] h-[30px]"
            src={iconPath}
            alt={`${title}-icon`}
            width={30}
            height={30}
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
      {title}
    </>
  );

  if (placement === "side") {
    return (
      <Link href={IconxRoutes[link]}>
        <TitleContent />
      </Link>
    );
  }

  return <TitleContent />;
};
