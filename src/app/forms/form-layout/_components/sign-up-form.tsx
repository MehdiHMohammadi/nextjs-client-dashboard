import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export function SignUpForm() {
  return (
    <ShowcaseSection title="فرم ثبت نام" className="!p-6.5">
      <form action="#">
        <InputGroup
          label="نام و نام خانوادگی"
          type="text"
          placeholder="نام و نام خانوادگی خود را وارد کنید"
          className="mb-4.5"
        />

        <InputGroup
          label="ایمیل"
          type="email"
          placeholder="ایمیل خود را وارد کنید"
          className="mb-4.5"
        />

        <InputGroup
          label="رمز عبور"
          type="password"
          placeholder="رمز عبور خود را وارد کنید"
          className="mb-4.5"
        />

        <InputGroup
          label="رمز عبور (تکرار)"
          type="password"
          placeholder="رمز عبور خود را مجددا وارد کنید"
          className="mb-5.5"
        />

        <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          ثبت نام
        </button>
      </form>
    </ShowcaseSection>
  );
}
