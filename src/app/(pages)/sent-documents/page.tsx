"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface DocumentSummary {
  id: string;
  user_id: string;
  summary: string;
  created_at: string;
}

export default function LegalDocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setSummary(null);
      setError(null);
    }
  };

  const analyzeDocument = async () => {
    if (!file) {
      setError("لطفاً یک فایل انتخاب کنید.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // فرض می‌کنیم API xAI برای تحلیل فایل‌ها وجود دارد (باید با xAI هماهنگ کنی)
      const response = await fetch("https://api.xai.com/grok/analyze", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_XAI_API_KEY}`, // کلید API را در .env قرار بده
        },
      });

      if (!response.ok) throw new Error("خطا در پردازش فایل");

      const result = await response.json();
      const documentSummary = result.summary || "هیچ خلاصه‌ای یافت نشد.";

      // ذخیره در Supabase
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error: dbError } = await supabase
          .from("document_summaries")
          .insert({
            user_id: user.id,
            summary: documentSummary,
            created_at: new Date().toISOString(),
          });

        if (dbError) throw dbError;
      }

      setSummary(documentSummary);
    } catch (e) {
      setError("خطا در تحلیل مدرک: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        آپلود مدارک حقوقی
      </h1>

      <div className="mt-6 space-y-4">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
        />
        <button
          onClick={analyzeDocument}
          disabled={loading || !file}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            </div>
          ) : (
            "تحلیل مدرک"
          )}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {summary && (
          <div className="mt-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              خلاصه مدرک:
            </h2>
            <p className="text-gray-900 dark:text-white">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
