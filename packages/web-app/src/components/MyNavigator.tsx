import Icon from "./Icon";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { NavigationContent } from "./NavigationContent";

export function MyNavigator() {
  return (
    <Sheet>
      <SheetTrigger>
        <Icon
          className="self-center"
          name="menu"
          size={25}
          // color='#adbac7'
        />
      </SheetTrigger>
      <NavigationContent />
    </Sheet>
  );
}
