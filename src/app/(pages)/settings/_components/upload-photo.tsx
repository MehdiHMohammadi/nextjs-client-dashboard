'use client'
import { useState,useEffect } from "react";
import { UploadIcon } from "@/assets/icons";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Image from "next/image";


// import { createClient } from "@/lib/supabase/client";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export  function UploadPhotoForm() {
  // const supabase = await createClient();
  const [user, setUser] = useState<User | null>(null); 

   useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser(); // فراخوانی تابع fetchUser
  }, []); // [] برای اجرای یک بار در زمان mount شدن


  return (
    <ShowcaseSection title="Your Photo" className="!p-7">
      <form>
        <div className="mb-4 flex items-center gap-3">
           {user && user.user_metadata?.picture ? (
                      <Image
                        src={user.user_metadata.picture}
                        alt="Profile"
                        width={55}
                        height={55}
                        className="size-14 rounded-full" // تنظیم اندازه مشابه
                      />
                    ) : (
                      <div className="flex items-center justify-center">
                        <span
                          className={`inline-block w-4 h-4 animate-spin rounded-full border-2 border-solid border-black border-t-transparent dark:border-primary dark:border-t-transparent`}
                        />
                      </div>
                    )}
          {/* <Image
            src="/images/user/user-03.png"
            width={55}
            height={55}
            alt="User"
            className="size-14 rounded-full object-cover"
            quality={90}
          /> */}

          <div>
            <span className="mb-1.5 font-medium text-dark dark:text-white">
              ویرایش عکس
            </span>
            <span className="flex gap-3">
              <button type="button" className="text-body-sm hover:text-red">
                حذف
              </button>
              <button className="text-body-sm hover:text-primary">
                بروزرسانی
              </button>
            </span>
          </div>
        </div>

        <div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            accept="image/png, image/jpg, image/jpeg"
            hidden
          />

          <label
            htmlFor="profilePhoto"
            className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
          >
            <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
              <UploadIcon />
            </div>

            <p className="mt-2.5 text-body-sm font-medium">
              <span className="text-primary">برای آپلود کلیک کن </span> یا فایل مورد نظر را اینجا بنداز.
            </p>

            <p className="mt-1 text-body-xs">
              SVG, PNG, JPG or GIF (max, 800 X 800px)
            </p>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="flex justify-center rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            انصراف
          </button>
          <button
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
          >
            ذخیره
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
