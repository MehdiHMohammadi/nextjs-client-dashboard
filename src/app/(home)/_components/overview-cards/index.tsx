import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { views, profit, products, users } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="تعداد وکلای این ماه"
        data={{
          ...views,
          value: Math.floor( (views.value)/1000),
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="شرکت‌های حقوقی"
        data={{
          ...profit,
          value: Math.floor( (profit.value)/1000)+" پرونده ",
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="تاریخچه وکلای منتخب"
        data={{
          ...products,
          value: Math.floor( (products.value)/1000),
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="تعداد وکلا"
        data={{
          ...users,
          value: Math.floor( (users.value)/100),
        }}
        Icon={icons.Users}
      />
    </div>
  );
}
