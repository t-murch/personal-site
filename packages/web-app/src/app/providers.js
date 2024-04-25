import AmplifyConfig from "@/app/ui/AmplifyConfig";
import MyLoader from "@/components/MyLoader";
import { Provider } from "jotai";

export default function Providers({ children }) {
  return (
    <Provider>
      <AmplifyConfig />
      <MyLoader />
      {children}
    </Provider>
  );
}
