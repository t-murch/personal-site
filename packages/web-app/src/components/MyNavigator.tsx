import Icon from "./Icon";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { NavigationContent } from "./NavigationContent";
import { Button } from "./ui/button";

export function MyNavigator() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 px-0">
          <Icon className="self-center" name="menu" size={25} />
        </Button>
      </SheetTrigger>
      <NavigationContent />
    </Sheet>
  );
}
