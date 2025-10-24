import React from "react";
import { PricingTable } from "@clerk/nextjs";

function Pricing() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[70%]">
      <h2 className="font-bold text-3xl my-5">Pricing</h2>
      <div className="flex w-[800px]">
        <PricingTable />
      </div>
      
    </div>
  );
}

export default Pricing;
