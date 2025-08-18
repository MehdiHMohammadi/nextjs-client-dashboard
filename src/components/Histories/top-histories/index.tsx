import { TrashIcon } from "@/assets/icons";
import { DownloadIcon, PreviewIcon, ConclusionIcon } from "../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { compactFormat, standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getTopHistories } from "../fetch";

export async function TopHistories({ className }: { className?: string }) {
  const data = await getTopHistories();

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        آخرین گفتگوها
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="min-w-[120px] !text-right">عنوان</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead>جمع بندی</TableHead>
            <TableHead>وضعیت قرارداد</TableHead>
            <TableHead>عملیات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((channel, i) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={channel.name + i}
            >
              <TableCell className="flex min-w-fit flex-col items-start justify-start xl:pr-7.5">
                <h5 className="text-dark dark:text-white">{channel.name}</h5>
                <p className="mt-[3px] text-body-sm font-medium text-slate-500">
                  {channel.before} روز قبل
                </p>
              </TableCell>

              <TableCell>{channel.visitors}</TableCell>

              <TableCell className="!text-center text-green-light-1">
                <button className="hover:text-primary">
                  <span className="sr-only">نمایش جمع بندی</span>
                  {/* <ConclusionIcon /> */}
                  <Image
                    src={channel. revenues}
                    className="size-8 rounded-full object-cover"
                    width={40}
                    height={40}
                    alt={channel.name + " Logo"}
                    role="presentation"
                  />
                </button>
              </TableCell>

              <TableCell className="flex flex-auto min-w-fit items-center justify-center gap-3">
                <div
                  className={cn(
                    "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                    {
                      "bg-[#219653]/[0.08] text-[#219653]":
                        channel.status === "Done",
                      "bg-[#D34053]/[0.08] text-[#D34053]":
                        channel.status === "Notdone",
                      "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                        channel.status === "Pending",
                    },
                  )}
                >
                  {channel.labael_status}
                </div>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-center gap-x-3.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">مشاهده گفتگو</span>
                    <PreviewIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">حذف گفتگو</span>
                    <TrashIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">دانلود قرارداد</span>
                    <DownloadIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
