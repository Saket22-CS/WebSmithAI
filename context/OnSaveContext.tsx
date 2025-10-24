// context/OnSaveContext.tsx
import { createContext } from "react";

export interface OnSaveContextType {
  onSaveData: any;
  setOnSaveData: React.Dispatch<React.SetStateAction<any>>;
}

export const OnSaveContext = createContext<OnSaveContextType | null>(null);
