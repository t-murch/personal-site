import Icon from "./Icon";
import { MyNavigator } from "./MyNavigator";
import { Card } from "./ui/card";

export async function NavigationBar() {
  return (
    // <Card className="flex flex-row h-full py-1 px-3 justify-between">
    <Card className="flex flex-row h-full w-full gap-2 py-1 px-3 justify-between">
      <div className="flex flex-row gap-2">
        <a
          href="https://www.linkedin.com/in/toddmurch/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row h-full gap-1 items-center"
        >
          <Icon name="linkedin" alt="linkedin-icon" size={25} color="#0a66c2" />
          <p className="text-lg font-bold mb-[-0.3rem]">LinkedIn</p>
        </a>
        <a
          href="https://github.com/t-murch"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row h-full gap-1 items-center"
        >
          <Icon name="github" size={25} color="#adbac7" />
          <p className="text-lg font-bold mb-[-0.3rem]">GitHub</p>
        </a>
      </div>

      <MyNavigator />
    </Card>
  );
}
