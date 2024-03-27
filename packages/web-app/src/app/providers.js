import AmplifyConfig from "@/app/ui/AmplifyConfig";
import { Provider } from "jotai";

export default function Providers({ children }) {
  return (
    <Provider>
      <AmplifyConfig />
      {children}
    </Provider>
  );
}
