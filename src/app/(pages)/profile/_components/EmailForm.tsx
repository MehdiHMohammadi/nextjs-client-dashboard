'use client'
import { useState } from 'react'

export default function EmailForm() {
  const [emailTo, setEmailTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSendEmail = async () => {
    setStatus('در حال ارسال...')
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailTo, subject, message }),
    })
    if (res.ok) setStatus('ایمیل با موفقیت ارسال شد!')
    else setStatus('ارسال ایمیل ناموفق بود.')
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="email"
        className="border p-2 w-full mb-2"
        placeholder="ایمیل گیرنده"
        value={emailTo}
        onChange={e => setEmailTo(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="موضوع"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <textarea
        rows={4}
        className="border p-2 w-full mb-2"
        placeholder="پیام"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSendEmail}
      >
        ارسال ایمیل
      </button>
      <p className="mt-2">{status}</p>
    </div>
  )
}
