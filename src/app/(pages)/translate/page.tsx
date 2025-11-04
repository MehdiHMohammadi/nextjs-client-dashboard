"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DocumentUpload from "@/components/FileUpload/DocumentUpload";
import { saveAs } from 'file-saver';

interface TranslationResult {
  translation: string;
  legalNotes: string[];
  originalText: string;
  fileName: string;
  targetLanguage: string;
}

export default function Translate() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'fa' | 'ar'>('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TranslationResult | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setError(null);
    setResult(null);
  };

  const handleTranslate = async () => {
    if (!selectedFile) {
      setError("لطفاً یک فایل انتخاب کنید");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('targetLanguage', targetLanguage);

      console.log('Sending request to API...');
      console.log('File:', selectedFile.name, selectedFile.type, selectedFile.size);
      console.log('Target language:', targetLanguage);

      const response = await fetch('/api/translate-document', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || 'خطا در ترجمه فایل');
        } catch (parseError) {
          throw new Error(`خطا در سرور: ${response.status} - ${errorText}`);
        }
      }

      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      try {
        const translationResult = JSON.parse(responseText);
        setResult(translationResult);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('پاسخ نامعتبر از سرور');
      }
    } catch (err) {
      console.error('Translation error:', err);
      setError(err instanceof Error ? err.message : 'خطای ناشناخته');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const content = `
ترجمه داکیومنت: ${result.fileName}
زبان مقصد: ${result.targetLanguage}

=== ترجمه ===
${result.translation}

=== نکات مهم حقوقی ===
${result.legalNotes.map((note, index) => `${index + 1}. ${note}`).join('\n')}

=== متن اصلی ===
${result.originalText}
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const fileName = `translation_${result.fileName}_${result.targetLanguage}_${new Date().toISOString().split('T')[0]}.txt`;
    saveAs(blob, fileName);
  };

  const languageOptions = [
    { value: 'en', label: 'انگلیسی', flag: '🇺🇸' },
    { value: 'fa', label: 'فارسی', flag: '🇮🇷' },
    { value: 'ar', label: 'عربی', flag: '🇸🇦' },
  ];

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="ترجمه" />

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark dark:text-white mb-4">
            ترجمه داکیومنت‌های حقوقی
          </h1>
          <p className="text-dark-6 dark:text-gray-400 max-w-2xl mx-auto">
            فایل داکیومنت خود را آپلود کنید و آن را به زبان مورد نظر ترجمه کنید. 
            همچنین نکات مهم حقوقی استخراج شده برای شما نمایش داده خواهد شد.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="bg-white dark:bg-dark-2 rounded-lg p-6 shadow-sm border border-stroke dark:border-dark-3">
          <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">
            آپلود فایل
          </h2>
          <DocumentUpload
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            loading={loading}
            error={error}
          />
        </div>

        {/* Language Selection */}
        <div className="bg-white dark:bg-dark-2 rounded-lg p-6 shadow-sm border border-stroke dark:border-dark-3">
          <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">
            انتخاب زبان مقصد
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTargetLanguage(option.value as 'en' | 'fa' | 'ar')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  targetLanguage === option.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-stroke dark:border-dark-3 hover:border-primary/50'
                }`}
                disabled={loading}
              >
                <div className="text-2xl mb-2">{option.flag}</div>
                <div className="font-medium text-dark dark:text-white">
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Translate Button */}
        <div className="text-center">
          <button
            onClick={handleTranslate}
            disabled={!selectedFile || loading}
            className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>در حال ترجمه...</span>
              </div>
            ) : (
              'شروع ترجمه'
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Download Button */}
            <div className="text-center">
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                دانلود نتایج
              </button>
            </div>

            {/* Translation Result */}
            <div className="bg-white dark:bg-dark-2 rounded-lg p-6 shadow-sm border border-stroke dark:border-dark-3">
              <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">
                ترجمه ({result.targetLanguage})
              </h2>
              <div className="bg-gray-50 dark:bg-dark-3 rounded-lg p-4 max-h-96 overflow-y-auto">
                <p className="text-dark dark:text-white whitespace-pre-wrap leading-relaxed">
                  {result.translation}
                </p>
              </div>
            </div>

            {/* Legal Notes */}
            <div className="bg-white dark:bg-dark-2 rounded-lg p-6 shadow-sm border border-stroke dark:border-dark-3">
              <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">
                نکات مهم حقوقی
              </h2>
              <div className="space-y-3">
                {result.legalNotes.map((note, index) => (
                  <div
                    key={index}
                    className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-dark dark:text-white">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Original Text */}
            <div className="bg-white dark:bg-dark-2 rounded-lg p-6 shadow-sm border border-stroke dark:border-dark-3">
              <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">
                متن اصلی
              </h2>
              <div className="bg-gray-50 dark:bg-dark-3 rounded-lg p-4 max-h-96 overflow-y-auto">
                <p className="text-dark dark:text-white whitespace-pre-wrap leading-relaxed text-sm">
                  {result.originalText}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

