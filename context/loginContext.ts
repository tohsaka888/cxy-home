import { createContext, Dispatch, SetStateAction } from "react";

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>
}

export const LoginContext = createContext<Props | null>(null)