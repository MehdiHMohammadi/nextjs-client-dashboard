'use client'
import { useState,useEffect } from "react";
import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export function PersonalInfoForm() {
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
  
  console.log(user)
  return (
    <ShowcaseSection title="اطلاعات تکمیلی" className="!p-7">
      <form>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="نام و نام خانوادگی"
            label="نام و نام خانوادگی"
            placeholder="نام و نام خانوادگی"
            defaultValue={user?.user_metadata?.full_name}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="شماره تماس  "
            label="شماره تماس"
            placeholder="+971 52 912 4075"
            defaultValue={user?.user_metadata?.provider_id}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="ایمیل"
          label="آدرس ایمیل"
          placeholder="devidjond45@gmail.com"
          defaultValue={user?.user_metadata?.email}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="نام کاربری"
          label="نام کاربری"
          placeholder="Sina_Koosha"
          defaultValue={user?.user_metadata?.name}
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
          />

        <TextAreaGroup
          className="mb-5.5"
          label="رزومه"
          placeholder="با چند جمله خود را معرفی کنید."
          icon={<PencilSquareIcon />}
          defaultValue={user?.role}
          // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales, enim arcu pellentesque lectus ac suscipit diam sem a felis. Cras sapien ex, blandit eu dui et suscipit gravida nunc. Sed sed est quis dui."
        />

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            انصراف
          </button>

          <button
            className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
          >
            ذخیرره
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
