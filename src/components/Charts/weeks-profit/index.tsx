import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { getWeeksProfitData } from "@/services/charts.services";
import { WeeksProfitChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export async function WeeksProfit({ className, timeFrame }: PropsType) {
  const data = await getWeeksProfitData(timeFrame);

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
         درخواست ها {timeFrame || "این هفته"}
        </h2>

        <PeriodPicker
          items={["این هفته", "آخر هفته"]}
          defaultValue={timeFrame || "این هفته"}
          sectionKey="weeks_profit"
        />
      </div>

      <WeeksProfitChart data={data} />
    </div>
  );
}
