"use client";
import { createContext } from "react";

export type OnSaveContextType = {
  onSaveData: any;
  setOnSaveData: React.Dispatch<React.SetStateAction<any>>;
};

export const OnSaveContext = createContext<OnSaveContextType | null>(null);
