import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Signin from "@/components/Auth/Signin";

export const metadata: Metadata = {
  title: "Login",
};
export default function SignIn() {
  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card" dir="ltr">
        <div className="flex flex-col-reverse  md:flex-row-reverse  md:flex-nowrap flex-wrap items-center">
          <div className="flex w-full md:w-1/2 md:min-w-[400px]">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Signin />
            </div>
          </div>

          <div className="w-full  p-1  md:p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 pb-8 overflow-hidden  rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <Image className="hidden dark:block" src={"/images/logo/logo.webp"} alt="Logo" width={176} height={32} />
                <Image className="dark:hidden" src={"/images/logo/main.webp"} alt="Logo" width={176} height={32}
                />
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Sign in to the application
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Please complete the form to sign in to your account.
              </p>

              <div className="hidden md:block mt-31 w-auto h-auto">
                <Image src={"/images/grids/grid-02.svg"} alt="Logo" width={405} height={323} className="mx-auto dark:opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
