import type { Metadata } from "next";

import { GlobeIcon } from "@/assets/icons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import MultiSelect from "@/components/FormElements/MultiSelect";
import { Checkbox } from "@/components/FormElements/checkbox";
import { RadioInput } from "@/components/FormElements/radio";
import { Select } from "@/components/FormElements/select";
import { Switch } from "@/components/FormElements/switch";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export const metadata: Metadata = {
  title: "المانهای فرم",
};

export default function FormElementsPage() {
  return (
    <>
      <Breadcrumb pageName="المانهای فرم" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <ShowcaseSection title="فیلدهای رودی" className="space-y-5.5 !p-6.5">
            <InputGroup
              label="ورودی پیش فرض"
              placeholder="Default input text"
              type="text"
            />

            <InputGroup
              label="ورودی فعال"
              placeholder="Active input text"
              active
              type="text"
            />

            <InputGroup
              label="غیر فعال"
              placeholder="Disabled input text"
              type="text"
              disabled
            />
          </ShowcaseSection>

          <ShowcaseSection
            title="فعال / غیر فعال"
            className="space-y-5.5 !p-6.5"
          >
            <Switch />
            <Switch backgroundSize="sm" />
            <Switch withIcon />
            <Switch background="dark" />
          </ShowcaseSection>

          <ShowcaseSection title="Time and date" className="space-y-5.5 !p-6.5">
            <DatePickerOne />
            <DatePickerTwo />
          </ShowcaseSection>

          <ShowcaseSection title="File upload" className="space-y-5.5 !p-6.5">
            <InputGroup
              type="file"
              fileStyleVariant="style1"
              label="فایل ضمیمه"
              placeholder="فایل ضمیمه"
            />

            <InputGroup
              type="file"
              fileStyleVariant="style2"
              label="فایل ضمیمه"
              placeholder="فایل ضمیمه"
            />
          </ShowcaseSection>
        </div>

        <div className="flex flex-col gap-9">
          <ShowcaseSection title="Textarea Fields" className="space-y-6 !p-6.5">
            <TextAreaGroup
              label="پیش فرض"
              placeholder="پیش فرض"
            />

            <TextAreaGroup
              label="فعال"
              placeholder="فعال"
              active
            />

            <TextAreaGroup
              label="غیر فعال"
              placeholder="غیر فعال"
              disabled
            />
          </ShowcaseSection>

          <ShowcaseSection title="آیتم ای انتخابی" className="space-y-5.5 !p-6.5">
            <Select
              label="کشور مورد نظر ..."
              items={[
                { label: "آمریکا", value: "USA" },
                { label: "انگلیس", value: "UK" },
                { label: "کانادا", value: "Canada" },
              ]}
              defaultValue="USA"
              prefixIcon={<GlobeIcon />}
            />
            <MultiSelect id="multiSelect" />
          </ShowcaseSection>

          <ShowcaseSection
            title="چک باکس و دکمه های رادیویی"
            className="space-y-5.5 !p-6.5"
          >
            <Checkbox label="چک باکس" />
            <Checkbox label="چک باکس" withIcon="check" />
            <Checkbox label="چک باکس" withIcon="x" />
            <RadioInput label="چک باکس" />
            <RadioInput label="چک باکس" variant="circle" />
          </ShowcaseSection>
        </div>
      </div>
    </>
  );
}
