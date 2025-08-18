import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import { LawForm } from "./_components/contact-form";
import { SignInForm } from "./_components/sign-in-form";
import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "فرمهای وکیل",
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="فرمهای وکیل" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* {lawForm()} */}
          <LawForm/>
        </div>
      </div>
    </>
  );
}
