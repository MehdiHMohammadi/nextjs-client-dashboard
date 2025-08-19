import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "ترجمه",
};

export default function Translate() {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="ترجمه" />

      <div className="grid grid-cols-5 gap-8">
      
      </div>
    </div>
  );
};

