import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "گفتگو",
};

export default function Chat() {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="گفتگو" />

      <div className="grid grid-cols-5 gap-8">
      
      </div>
    </div>
  );
};

