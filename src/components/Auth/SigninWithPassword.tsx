'use client'

import { CallIcon, UserIcon, EmailIcon } from "@/assets/icons";
import { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
// import { createClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// راه‌اندازی کلاینت Supabase
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// );
export default  function SigninWithPassword() {
  const supabase = createClient();
  const router = useRouter();

  const [data, setData] = useState({
    phoneNumber: process.env.NEXT_PUBLIC_DEMO_USER_PHONE || "",
    name: "",
    email: "",
    remember: false,
  });
  const [userOtp, setUserOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState(1); // مرحله 1: شماره موبایل، مرحله 2: کد تأیید
  // const [otp, setOtp] = useState<string>("");

  const showToast = (variant: string, title: string, description: string) => {
    let toastFunction: any;
    switch (variant) {
      case "success":
        toastFunction = toast.success;
        break;
      case "warning":
        toastFunction = toast.warn;
        break;
      case "destructive":
        toastFunction = toast.error;
        break;
      default:
        console.error(`Invalid variant: ${variant}`);
        return;
    }

    toastFunction(
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>,
    );
  };
  // تابع ارسال OTP
  const sendOtp = async () => {
    let phone = data.phoneNumber;
    setError(null);
    setLoading(true);

    try {
      if (!phone.startsWith("+") || phone.length < 10) {
        // throw new Error( "لطفاً شماره تلفن را در فرمت وارد کنید (مثال: 989121234545+", );
        showToast(
          "destructive",
          " شماره تماس اشتباه است!",
          "لطفاً شماره تلفن را در فرمت وارد کنید (مثال: 989121234545+",
        );
      }
      if (!data.name.trim() || data.name.length < 2) {
        throw new Error("لطفاً نام معتبر وارد کنید (حداقل ۲ کاراکتر)");
        showToast(
          "destructive",
          "خطا در ارسال ",
          "لطفاً نام معتبر وارد کنید (حداقل ۲ کاراکتر)",
        );
      }
      if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        // throw new Error("لطفاً یک ایمیل معتبر وارد کنید");
        showToast(
          "destructive",
          "خطا در ارسال OTP",
          "لطفاً یک ایمیل معتبر وارد کنید",
        );
      }

      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          data: {
            dispatch_id: `client-${Date.now()}`,
            full_name: data.name.trim(),
            email: data.email.trim(),
          },
        },
      });

      if (error) {
        if (error.message.includes("invalid_phone_number")) {
          // throw new Error("فرمت شماره تلفن نامعتبر است.");
          showToast("destructive", "خطا", "فرمت شماره تلفن نامعتبر است.");
        } else if (error.message.includes("supabase_not_enabled")) {
          // throw new Error("احراز هویت تلفنی Supabase فعال نیست.");
          showToast(
            "destructive",
            "خطا",
            "احراز هویت تلفنی Supabase فعال نیست.",
          );
        } else {
          throw new Error(error.message);
        }
      }

      setStep(2);
    } catch (err: any) {
      setError(err.message || "خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  // تابع تأیید OTP
  const verifyOtp = async () => {
    // if (userOtp === generatedOtp && userOtp !== "") {
    //   showToast("success", "کد OTP درست است.", "شما با موفقیت وارد شدید.");
    //   router.push("/");
    // } else {
    //   console.error("کد OTP اشتباه است");
    //   showToast(
    //     "destructive",
    //     "کد OTP اشتباه است",
    //     "لطفاً کد OTP صحیح را وارد نمائید.",
    //   );
    // }
    let phone = data.phoneNumber;
    setError(null);
    setLoading(true);
    try {
      const { error, data } = await supabase.auth.verifyOtp({
        phone,
        token: userOtp,
        type: "sms",
      });

      if (error) {
        if (error.message.includes("invalid_api_key")) {
          // throw new Error("پیکربندی وب‌هوک نامعتبر است.");
             showToast(
          "destructive",
          "خطا",
          "پیکربندی وب‌هوک نامعتبر است."
        );
        } else if (error.message.includes("blocked")) {
          // throw new Error("تلاش برای احراز هویت مسدود شده است.");
          showToast(
            "destructive",
            "خطا",
            "تلاش برای احراز هویت مسدود شده است.",
          );
        } else {
          // throw new Error("کد OTP نامعتبر است.");
          showToast("destructive", "خطا", "کد OTP نامعتبر است.");
        }
      }

      if (data.session) {
        router.push("/smart-lawyer");
      } else {
        throw new Error("هیچ جلسه‌ای بازنگشت.");
      }
    } catch (error: any) {
      console.error("خطا:", error);
      showToast(
        "destructive",
        "خطا در ارسال OTP",
        error.message || "سرور پاسخگو نیست.",
      );
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // مدیریت تغییرات ورودی‌ها
  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // مدیریت ارسال فرم
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (step === 1) {
      sendOtp();
    } else {
      verifyOtp();
    }
  };

  // تنظیمات انیمیشن
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <InputGroup
                type="text"
                label="نام و نام خانوادگی"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="نام خود را وارد نمایید"
                name="name"
                handleChange={handleChange}
                value={data.name}
                iconPosition={"right"}
                icon={<UserIcon />}
              />
              <InputGroup
                type="email"
                label="ایمیل"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="email@mail.com"
                name="email"
                handleChange={handleChange}
                value={data.email}
                iconPosition="right"
                icon={<EmailIcon />}
              />
              <InputGroup
                type="tel"
                label="موبایل"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="+98912XXXXX"
                name="phoneNumber"
                handleChange={handleChange}
                value={data.phoneNumber}
                iconPosition="left"
                icon={<CallIcon />}
              />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <InputGroup
                type="text"
                label="کد تأیید"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="کد OTP را وارد کنید"
                name="otp"
                handleChange={(e: any) => setUserOtp(e.target.value)}
                value={userOtp}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <button
            type="submit"
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition hover:bg-opacity-90 ${
              step === 1 ? "bg-primary" : "bg-green-500"
            }`}
            disabled={loading}
          >
            {step === 1 ? "فرستادن کد" : "تأیید کد"}
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
            )}
          </button>
        </motion.div>
      </form>
    </>
  );
}
