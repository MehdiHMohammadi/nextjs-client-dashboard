"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ChevronUpIcon } from "@/assets/icons";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";

import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";

// import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/lib/supabaseClient";
// import { createClient } from "@/lib/supabase/client";

import { User } from "@supabase/supabase-js";

export   function UserInfo() {
  // const supabase =  createClient();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSignOut = async () => {

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        setUser(null);
        setUserName(null);
        setUserEmail(null);
        setUserPicture(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { user_metadata } = session.user;
        setUser(session.user);
        setUserName(user_metadata.full_name || "کاربر مهمان");
        setUserEmail(user_metadata.email || "ایمیل موجود نیست");
        setUserPicture(user_metadata.picture || "/images/user/default-avatar.svg");
      } else {
        setUser(null);
        setUserName(null);
        setUserEmail(null);
        setUserPicture(null);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const { user_metadata } = session.user;
        setUser(session.user);
        setUserName(user_metadata.full_name || "کاربر مهمان");
        setUserEmail(user_metadata.email || "ایمیل موجود نیست");
        setUserPicture(user_metadata.picture || "/images/user/default-avatar.svg");
      } else {
        setUser(null);
        setUserName(null);
        setUserEmail(null);
        setUserPicture(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">حساب کاربری من</span>
        <figure className="flex items-center justify-center align-middle gap-x-3">
          {loading || !user ? (
            <div className="flex items-center justify-center">
              <span className="inline-block w-4 h-4 animate-spin rounded-full border-2 border-solid border-black border-t-transparent dark:border-primary dark:border-t-transparent" />
            </div>
          ) : user.user_metadata?.picture || userPicture ? (
               <>
               <p className="flex pt-2">

              {userName || (user?.email && `کاربر: ${user.email}`) || "کاربر مهمان"}
               </p>
            <Image
              src={user.user_metadata?.picture || userPicture!}
              alt="Profile"
              width={24}
              height={24}
              className="size-6 rounded-full object-cover"
              />
              </>
          ) : (
            <div className="bg-selection p-2 flex items-center justify-center rounded-full bg-cover bg-center bg-no-repeat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            {/* {loading || !user ? (
              <div className="flex items-center justify-center">
                <span className="inline-block w-4 h-4 animate-spin rounded-full border-2 border-solid border-black border-t-transparent dark:border-primary dark:border-t-transparent" />
              </div>
            ) : (
              <span>{userName || user?.email || "نام کاربری"}</span>
            )} */}
            <ChevronUpIcon
              aria-hidden
              className={cn("rotate-180 transition-transform", isOpen && "rotate-0")}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">اطلاعات کاربری</h2>
        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          {loading || !user ? (
            <div className="flex items-center justify-center  bg-gray-400">
              <span className="inline-block w-4 h-4 animate-spin rounded-full border-2 border-solid border-black border-t-transparent dark:border-primary dark:border-t-transparent" />
            </div>
          ) : user.user_metadata?.picture || userPicture ? (
            <>
            <Image
              src={user.user_metadata?.picture || userPicture!}
              alt="Profile"
              width={24}
              height={24}
              className="size-6 rounded-full object-cover"
              />
              </>
          ) : (
            <div className="bg-selection p-2 flex items-center justify-center rounded-full bg-cover bg-center bg-no-repeat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {userName || (user?.email && `کاربر: ${user.email}`) || "کاربر مهمان"}
            </div>
            <div className="leading-none text-gray-6">
              {userEmail || (user?.email && user.email) || "ایمیل موجود نیست"}
            </div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full flex-row-reverse items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <UserIcon />
            <span className="ml-auto text-base font-medium">نمایش حساب کاربری</span>
          </Link>

          <Link
            href={"/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full flex-row-reverse items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />
            <span className="ml-auto text-base font-medium">تنظیمات حساب کاربری</span>
          </Link>
        </div>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={handleSignOut}
          >
            <LogOutIcon />
            <span className="text-base font-medium">خروج</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}