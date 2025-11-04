"use client";

import React, { useCallback, useState } from 'react';
import { UploadIcon } from '@/assets/icons';

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  loading?: boolean;
  error?: string | null;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onFileSelect,
  selectedFile,
  loading = false,
  error = null
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // Supported file types
  const supportedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
    'application/rtf',
    'text/rtf'
  ];

  // Maximum file size (15MB)
  const maxFileSize = 15 * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!supportedTypes.includes(file.type)) {
      return 'نوع فایل پشتیبانی نمی‌شود. فرمت‌های مجاز: PDF, DOC, DOCX, TXT, RTF';
    }

    // Check file size
    if (file.size > maxFileSize) {
      return 'حجم فایل نباید از 15 مگابایت بیشتر باشد';
    }

    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      // You might want to show this error in a toast or alert
      console.error(validationError);
      return;
    }
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-primary bg-primary/5'
            : 'border-stroke hover:border-primary dark:border-dark-3 dark:hover:border-primary'
        } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={loading}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <UploadIcon className="w-8 h-8 text-primary" />
          </div>

          <div>
            <p className="text-lg font-medium text-dark dark:text-white">
              فایل داکیومنت را اینجا بکشید یا کلیک کنید
            </p>
            <p className="text-sm text-dark-6 dark:text-gray-400 mt-2">
              فرمت‌های پشتیبانی شده: PDF, DOC, DOCX, TXT, RTF
            </p>
            <p className="text-sm text-dark-6 dark:text-gray-400">
              حداکثر حجم: 15 مگابایت
            </p>
          </div>

          {loading && (
            <div className="flex items-center space-x-2 text-primary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">در حال پردازش...</span>
            </div>
          )}
        </div>
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-2 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-dark dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-dark-6 dark:text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={() => onFileSelect(null as any)}
              className="text-red-500 hover:text-red-700 text-sm"
              disabled={loading}
            >
              حذف
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
