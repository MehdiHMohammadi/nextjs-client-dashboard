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

export default function ConversationsPage() {
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
        <div>
          <button
            onClick={() => setSelectedConversationId(null)}
            className="mb-4 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            بازگشت به تاریخچه
          </button>
          <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            مکالمات گفتگو
          </h2>
          {conversationMessages.length == 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              هیچ مکالمه‌ای برای این گفتگو ثبت نشده است.
            </p>
          ) : (
            <div className="space-y-4">
              {conversationMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(msg.created_at).toLocaleTimeString("fa-IR")} -{" "}
                    {msg.role}
                  </p>
                  <p className="text-gray-900 dark:text-white">{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
