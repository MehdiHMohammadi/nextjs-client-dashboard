"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

import { useState, useEffect } from "react";
import { CameraIcon } from "./_components/icons";
import { SocialAccounts } from "./_components/social-accounts";

import { supabase } from "@/lib/supabaseClient";
import ContactPage from "./_components/contact";
import EmailForm from "./_components/EmailForm";
// import TestFunction from "./_components/Test";

// import { createClient } from "@/lib/supabase/client";
// import { useEmailSender } from "@/contexts/EmailContext";
// import { createClient } from "@/lib/supabase/client";

export default function Page() {
  // const supabase = await createClient();
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(
    null,
  );
  const [data, setData] = useState({
    name: "JustiQ",
    profilePhoto: "/images/loading.gif",
    coverPhoto: "/images/cover/cover-01.png",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser(); // فراخوانی تابع fetchUser
  }, []); // [] برای اجرای یک بار در زمان mount شدن

  const handleChange = (e: any) => {
    if (e.target.name === "profilePhoto") {
      const file = e.target?.files[0];

      setData({
        ...data,
        profilePhoto: file && URL.createObjectURL(file),
      });
    } else if (e.target.name === "coverPhoto") {
      const file = e.target?.files[0];

      setData({
        ...data,
        coverPhoto: file && URL.createObjectURL(file),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="پروفایل" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={data?.coverPhoto}
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
          />

          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-[15px] py-[5px] text-body-sm font-medium text-white hover:bg-opacity-90"
            >
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="sr-only"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg"
              />

              <CameraIcon />

              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            {/* <div className="relative drop-shadow-2"> */}
            {data?.profilePhoto && (
              <>
                {user && user.user_metadata?.picture ? (
                  <Image
                    src={user.user_metadata.picture}
                    alt={user?.user_metadata?.name || "Profile"}
                    width={160}
                    height={160}
                    className="size-40 rounded-full" // تنظیم اندازه
                  />
                ) : (
                  // <div className="flex items-center justify-center ">
                  // <span className="inline-block h-12 w-12 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
                  // </div>
                  <div className="bg-selection flex items-center justify-center rounded-full bg-cover bg-center bg-no-repeat pt-2 md:pt-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-user"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-0 left-0 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <CameraIcon />

                  <input
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    className="sr-only"
                    onChange={handleChange}
                    accept="image/png, image/jpg, image/jpeg"
                  />
                </label>
              </>
            )}
          </div>
          {/* </div> */}
          <div className="mt-4">
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
              <span>
                {user?.user_metadata?.name || user?.email || data.name}
              </span>
            </h3>
            <p className="font-medium">وکیل پایه یک</p>
            <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] grid-cols-3 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  259
                </span>
                <span className="text-body-sm">پست ها</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  129K
                </span>
                <span className="text-body-sm">دنبال کنندگان</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  2K
                </span>
                <span className="text-body-sm-sm">دنبال کردن</span>
              </div>
            </div>

            <div className="mx-auto max-w-[720px]">
              <h4 className="font-medium text-dark dark:text-white">
                درباره من
              </h4>
              <p className="mt-4">
                {" "}
                در JustiQ ، مأموریت ما ارائه خدمات حقوقی با دسترسی آنلاین به
                ساده‌ترین و مقرون به صرفه‌ترین شکل ممکن است تا اطمینان حاصل کنیم
                که شما می‌توانید با خیالی آسوده و بدون دغدغه، مسیر پیچیده‌ی حل
                مسائل حقوقی خود را طی کنید. با استفاده از راهکارهای نوآورانه و
                همراهی از متخصصین مجرب حقوقی، ما هر قدم شما را تا رسیدن به
                بهترین نتیجه ممکن همراهی می‌کنیم.
              </p>
            </div>
            {/* <ContactPage /> */}
            <EmailForm />
            {/* <TestFunction  /> */}
            <SocialAccounts />
          </div>
        </div>
      </div>
    </div>
  );
}
