import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export function LawForm() {
  return (
    <ShowcaseSection title="فرم ورود وکیل جدید" className="!p-6.5">
      <form action="#">
        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <InputGroup
            label="نام"
            type="text"
            placeholder="نام خود را وارد کنید"
            className="w-full xl:w-1/2"
          />

          <InputGroup
            label="نام خانوادگی"
            type="text"
            placeholder="نام خانوادگی خود را وارد کنید"
            className="w-full xl:w-1/2"
          />
        </div>

        <InputGroup
          label="ایمیل"
          type="email"
          placeholder="ایمیل خود را وارد کنید"
          className="mb-4.5"
          required
        />

        <InputGroup
          label="موضوع"
          type="text"
          placeholder="موضوع خود را وارد کنید"
          className="mb-4.5"
        />

        <Select
          label="موضوع"
          placeholder="موضوع خود را انتخاب کنید"
          className="mb-4.5"
          items={[
            { label: "آمریکا", value: "USA" },
            { label: "انگلستان", value: "UK" },
            { label: "کانادا", value: "Canada" },
          ]}
        />

        <TextAreaGroup label="پیام" placeholder="پیام خود وارد کنید." />

        <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          ارسال پیام
        </button>
      </form>
    </ShowcaseSection>
  );
}
