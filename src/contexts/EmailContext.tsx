// src/contexts/EmailContext.tsx
'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';

// تعریف تایپ برای context
interface EmailContextType {
  sendEmail: (htmlContent: string) => Promise<{ success: boolean; message: string }>;
  status: string;
}

// ساخت context با مقادیر اولیه
const EmailContext = createContext<EmailContextType | undefined>(undefined);

// تعریف تایپ برای props مربوط به Provider
interface EmailProviderProps {
  children: ReactNode;
}

export const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<string>('');

  const sendEmail = async (htmlContent: string) => {
    setStatus('در حال ارسال...');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'خطا در ارسال ایمیل');
      }

      setStatus('ایمیل با موفقیت ارسال شد!');
      return { success: true, message: 'ایمیل با موفقیت ارسال شد!' };
    } catch (error: any) {
      console.error('Email sending failed:', error);
      setStatus(`خطا: ${error.message}`);
      return { success: false, message: error.message };
    }
  };

  return (
    <EmailContext.Provider value={{ sendEmail, status }}>
      {children}
    </EmailContext.Provider>
  );
};

// ساخت یک Hook سفارشی برای استفاده آسان از context
export const useEmailSender = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmailSender باید درون یک EmailProvider استفاده شود.');
  }
  return context;
};