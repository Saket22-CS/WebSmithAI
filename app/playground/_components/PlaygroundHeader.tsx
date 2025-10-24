import { useContext } from "react";
import { OnSaveContext } from "@/context/OnSaveContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function PlaygroundHeader() {
  const context = useContext(OnSaveContext);

  if (!context) {
    // This prevents runtime errors in case context is missing
    return null;
  }

  const { onSaveData, setOnSaveData } = context;

  return (
    <div className="flex justify-between items-center p-4 shadow">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      <Button onClick={() => setOnSaveData(Date.now())}>Save</Button>
    </div>
  );
}

export default PlaygroundHeader;
