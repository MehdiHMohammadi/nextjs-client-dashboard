import { Checkbox } from "@/components/FormElements/checkbox";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Link from "next/link";

export function SignInForm() {
  return (
    <ShowcaseSection title="فرم ورود" className="!p-6.5">
      <form action="#">
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
        />

        <div className="mb-5.5 mt-5 flex items-center justify-between">
          <Checkbox label="به یاد داشته باش" minimal withBg withIcon="check" />

          <Link href="#" className="text-body-sm text-primary hover:underline">
            رمز خود را فراموش کردم؟
          </Link>
        </div>

        <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          ورود
        </button>
      </form>
    </ShowcaseSection>
  );
}
