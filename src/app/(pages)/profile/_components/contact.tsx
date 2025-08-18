'use client'
import React, { useState } from 'react';
import { useEmailSender } from '@/contexts/EmailContext';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { sendEmail, status } = useEmailSender();

  const handleSend = async () => {
    const htmlEmailContent = `
      <h1>فرم تماس جدید</h1>
      <p><b>نام:</b> ${name}</p>
      <p><b>ایمیل:</b> ${email}</p>
      <p><b>پیام:</b> ${message}</p>
    `;

    const result = await sendEmail(htmlEmailContent);
    if (result.success) {
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">تماس با ما</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">نام</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="نام خود را وارد کنید"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="ایمیل خود را وارد کنید"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">پیام</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              rows={5}
              placeholder="پیام خود را بنویسید"
            />
          </div>

          <button
            onClick={handleSend}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            ارسال ایمیل
          </button>

          {status && (
            <p className={`text-center text-sm ${status.includes('خطا') ? 'text-red-600' : 'text-green-600'}`}>
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}