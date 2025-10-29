"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { supabase } from "@/lib/supabaseClient";

const SmartLawyer = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError) {
          console.error("خطای احراز هویت:", authError.message);
          return;
        }
        if (user) {
          setUserId(user.id);
          localStorage.setItem("user_id", user.id); // ذخیره userId در localStorage
        }
      } catch (error) {
        console.error("خطا در دریافت کاربر:", error);
      } finally {
        setLoading(false); // همیشه پس از اتمام عملیات لودینگ را غیرفعال کن
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* <Breadcrumb pageName="دستیار حقوقی" /> */}
      <div className="space-y-10">
        <div>
          <iframe
            src={`https://smart-legal-git-branchnew-mehdihmohammadis-projects.vercel.app/?userId=${userId}`}
            className="h-screen w-full border-none"
            title="دستیار حقوقی"
          />
        </div>
      </div>
    </>
  );
};

export default SmartLawyer;
