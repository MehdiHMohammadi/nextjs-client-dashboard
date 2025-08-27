"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  role: string;
  conversation_id: string;
}

interface GroupedConversations {
  [date: string]: Conversation[];
}
interface Attorney {
  id: string;
  item_name: string;
  name: string;
  item_company: string;
  Specialisms: string[];
  Location: string;
  Languages: string[];
  Size: string;
  Website: string;
  Email: string;
  Phone: string;
  Years_of_experience: number;
  Google_reviews: number;
  Legal_500: boolean;
  image: string;
}
export default function ConversationsPage() {
  // ✅ تابع ارسال درخواست به وکلا
  const requestConsultation = async (id: string, item_name: string) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // to: ['mehdihmohammadi@gmail.com', 'mehdihmohammadi@outlook.com'], // می‌تونی یک یا چند ایمیل بزنی
          to: ["sina.koosha1992@gmail.com", "info@koosha.group"], // می‌تونی یک یا چند ایمیل بزنی
          clientName: `${item_name}`,
          caseSummary:
            "جمع‌بندی مشکل حقوقی شما به شرح زیر است: شما با موجر خود بر سر بازپرداخت ودیعه مشکل دارید. قرارداد اجاره شما کتبی است اما بندی برای بازپرداخت ودیعه در آن وجود ندارد. شما ملک را تخلیه کرده‌اید و موجر بهانه می‌آورد و ودیعه را بازپرداخت نمی‌کند. تا به حال به صورت رسمی و کتبی درخواست بازپرداخت نداده‌اید و موضوع برای شما فوریت ندارد.",
          subject: ` درخواست بررسی مشکل حقوقی کاربر به ${item_name}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`مشکل حقوقی شما به وکیل ${item_name} ارسال شد.`);
      } else {
        alert(`مشکل حقوقی شما به وکیل ${item_name} ارسال نشد.`);
      }
    } catch (err: any) {
      alert("❌ خطا: " + err.message);
    } finally {
    }
  };

  const [groupedConversations, setGroupedConversations] =
    useState<GroupedConversations>({});
  const [conversationMessages, setConversationMessages] = useState<Message[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchConversations = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        if (isMounted) setError("خطای احراز هویت: " + authError.message);
        setLoading(false);
        return;
      }

      if (user) {
        const { data: conversations, error } = await supabase
          .from("conversations")
          .select("id, user_id, title, created_at, updated_at")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false });

        if (error) {
          if (isMounted) setError("خطا در واکشی گفتگوها: " + error.message);
        } else {
          const conversationsToGroup = conversations || [];
          const newGroupedConversations = conversationsToGroup.reduce(
            (acc, conv) => {
              const dateKey = new Date(conv.created_at).toLocaleDateString(
                "fa-IR",
              );
              if (!acc[dateKey]) acc[dateKey] = [];
              acc[dateKey].push(conv);
              return acc;
            },
            {} as GroupedConversations,
          );

          if (isMounted) setGroupedConversations(newGroupedConversations);
        }
      }
      if (isMounted) setLoading(false);
    };

    fetchConversations();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewMessages = async (conversationId: string) => {
    console.log(conversationId);
    setSelectedConversationId(conversationId);
    setLoading(true);
    setError(null);

    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      setError("خطا در واکشی مکالمات: " + error.message);
    } else {
      console.log(messages);
      setConversationMessages(messages || []);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const dates = Object.keys(groupedConversations);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        تاریخچه گفتگوها
      </h1>

      {dates.length === 0 && !selectedConversationId && (
        <p className="text-gray-500 dark:text-gray-400">
          هیچ تاریخچه‌ای ثبت نشده است.
        </p>
      )}

      {!selectedConversationId ? (
        dates.map((dateKey) => (
          <div key={dateKey} className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              {dateKey}
            </h2>
            <div className="space-y-4">
              {groupedConversations[dateKey].map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800"
                >
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(conv.created_at).toLocaleTimeString("fa-IR")}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {conv.title}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      آخرین بروزرسانی:{" "}
                      {new Date(conv.updated_at).toLocaleString("fa-IR")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleViewMessages(conv.id)}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    مشاهده گفتگو
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-start">
          <button
            onClick={() => setSelectedConversationId(null)}
            className="mb-4 self-end rounded-md bg-red-900 px-4 py-2 text-white hover:bg-red-700"
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="12.000000pt"
              height="12.000000pt"
              viewBox="0 0 1280.000000 1226.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <metadata>
                Created by potrace 1.15, written by Peter Selinger 2001-2017
              </metadata>
              <g
                transform="translate(0.000000,1226.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M5485 11778 c-302 -265 -802 -703 -1110 -973 -308 -270 -1124 -985
-1814 -1589 -1005 -881 -1251 -1101 -1239 -1110 8 -6 900 -825 1983 -1821
1083 -995 2181 -2005 2440 -2242 258 -238 472 -433 475 -433 3 0 4 633 2 1407
-1 774 1 1410 5 1414 11 11 327 -8 458 -27 848 -122 1536 -568 1913 -1239 120
-214 200 -444 248 -710 25 -143 26 -497 1 -650 -71 -430 -267 -850 -561 -1200
-142 -169 -315 -338 -493 -482 -103 -83 -123 -106 -38 -43 63 46 90 54 160 42
46 -8 53 -6 90 21 29 21 23 13 -20 -28 -96 -89 -277 -228 -451 -343 -88 -59
-169 -113 -180 -120 -17 -11 -17 -11 3 -2 12 5 68 10 125 10 l103 0 -25 -21
c-48 -39 14 -2 159 95 145 98 332 242 435 336 l58 54 230 3 c224 2 230 3 261
26 38 28 67 45 52 30 -21 -21 -167 -125 -276 -196 -159 -102 -313 -193 -473
-277 -131 -69 -166 -91 -108 -69 15 6 79 12 143 12 98 2 114 0 100 -11 -26
-22 189 92 300 158 146 88 304 193 444 295 66 48 109 75 95 61 l-25 -27 95 2
95 1 85 72 c120 101 376 353 485 476 572 652 899 1382 1002 2240 21 176 23
624 4 800 -35 321 -94 605 -183 880 -254 784 -726 1480 -1373 2021 -758 635
-1753 1013 -2780 1057 l-160 7 -3 1288 -2 1287 -93 0 -92 0 -550 -482z m2825
-9571 c0 -2 -19 -21 -42 -42 l-43 -40 40 43 c36 39 45 47 45 39z m730 -1 c0
-2 -8 -10 -17 -17 -16 -13 -17 -12 -4 4 13 16 21 21 21 13z"
                />
                <path
                  d="M9068 2084 c-32 -25 -58 -48 -58 -50 0 -3 27 16 60 41 52 40 68 55
58 55 -2 0 -29 -21 -60 -46z"
                />
                <path
                  d="M7669 2023 c-13 -16 -12 -17 4 -4 16 13 21 21 13 21 -2 0 -10 -8 -17
-17z"
                />
              </g>
            </svg>{" "}
          </button>
          <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            مکالمات گفتگو
          </h2>
          {conversationMessages.length == 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              هیچ مکالمه‌ای برای این گفتگو ثبت نشده است.
            </p>
          ) : (
            <div className="w-full space-y-4">
              {conversationMessages.map((msg) => {
                if (msg.role === "tool") {
                  try {
                    const parsedContent = JSON.parse(msg.content);
                    const attorneys: Attorney[] = parsedContent.attorneys || [];
                    return (
                      <div key={msg.id} className="space-y-4">
                        <div className="flex w-full flex-col space-x-2 md:flex-row md:overflow-x-scroll">
                          {attorneys.map((attorney) => (
                            <div className="relative m-3 flex h-auto w-72 flex-shrink-0 flex-col justify-between overflow-hidden overflow-x-auto rounded-2xl border border-gray-200 bg-gray-50 p-4">
                              {attorney.Legal_500 ? (
                                <div className="absolute -right-12 top-6">
                                  <div className="-translate-x-8 -translate-y-3 rotate-45 rounded-md bg-white px-4 py-1 text-xs font-bold text-gray-700 shadow">
                                    <span className="font-bold">Legal</span>
                                    <span className="font-normal">500</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="animate-puls"></div>
                              )}
                              {/* <div className="flex flex-col items-center"> */}
                              <div className="flex flex-col items-center gap-1">
                                {attorney.image &&
                                attorney.image.match(
                                  /\.(jpeg|jpg|gif|png|webp)$/,
                                ) ? (
                                  <img
                                    src={`/images/UAE_Ministry_of_Justice.webp`}
                                    alt={
                                      attorney.item_company || "Lawyer Image"
                                    }
                                    className="h-20 w-full rounded-lg border bg-gray-50 object-contain p-2"
                                  />
                                ) : (
                                  <div className="h-full w-full animate-pulse bg-gray-200"></div>
                                )}
                                <div className="flex w-full flex-col gap-1">
                                  <div className="flex items-center justify-between">
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                                      +{attorney.Years_of_experience} سال تجربه
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <span className="text-sm font-bold text-gray-700">
                                        {attorney.Google_reviews}
                                      </span>
                                      <span className="text-xl text-yellow-400">
                                        ★
                                      </span>
                                    </div>
                                  </div>
                                  <div className="dir-ltr truncate text-center font-bold text-gray-900">
                                    {attorney.item_company}
                                    <hr className="my-2 opacity-20" />
                                  </div>
                                </div>
                              </div>
                              {/* اطلاعات */}
                              <div className="flex flex-col gap-2 text-sm text-gray-700">
                                <div className="items-top flex gap-2">
                                  <span className="text-gray-400">🏢</span>
                                  <span className="text-sm font-bold">
                                    سایز شرکت :
                                  </span>
                                  <span className="text-gray-500">
                                    {attorney.Size
                                      ? attorney.Size.toLocaleString()
                                      : "نامشخص"}
                                  </span>
                                </div>
                                <div className="items-top flex gap-1">
                                  <span>📚</span>
                                  <span className="flex-none text-sm font-bold">
                                    تخصص ها :
                                  </span>
                                  <span className="list-disc pl-5 text-xs text-gray-500">
                                    {Array.isArray(attorney.Specialisms) &&
                                    attorney.Specialisms.length > 0 ? (
                                      attorney.Specialisms.map(
                                        (spec: string, index: number) => (
                                          <span key={index}>{spec}</span>
                                        ),
                                      )
                                    ) : (
                                      <span className="text-gray-400">
                                        {attorney.Specialisms}
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <div className="items-top flex gap-2">
                                  <span>🌐</span>
                                  <span className="font-bold">زبان ها :</span>
                                  <span className="text-gray-500">
                                    {" "}
                                    {attorney.Languages
                                      ? attorney.Languages.toLocaleString()
                                      : "نامشخص"}
                                  </span>
                                </div>
                              </div>
                              {/* دکمه */}
                              <button
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-100 py-2 font-bold text-red-600 transition hover:bg-red-200"
                                aria-label="درخواست مشاوره"
                                onClick={() =>
                                  requestConsultation(
                                    attorney.id,
                                    attorney.item_name,
                                  )
                                }
                              >
                                درخواست مشاوره
                                <span className="text-lg">📞</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } catch (e) {
                    console.error("Error parsing tool message content:", e);
                    return (
                      <div
                        key={msg.id}
                        className="rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(msg.created_at).toLocaleTimeString("fa-IR")}{" "}
                          - {msg.role}
                        </p>
                        <p className="text-red-500 dark:text-red-400">
                          خطا در پردازش اطلاعات وکیل
                        </p>
                      </div>
                    );
                  }
                } else {
                  return (
                    <div
                      key={msg.id}
                      className="rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(msg.created_at).toLocaleTimeString("fa-IR")} -{" "}
                        {msg.role}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {msg.content}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
