import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    // بررسی environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json({ 
        error: 'Server configuration error: Missing Supabase credentials' 
      }, { status: 500 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    const { emailTo, subject, message } = await request.json()
    
    console.log('Sending email request:', { emailTo, subject, message })
    
    // فراخوانی edge function با استفاده از Supabase client:
    // دریافت user session
const { data: { session } } = await supabase.auth.getSession()

const { data, error } = await supabase.functions.invoke('resend-email', {
  body: { emailTo, subject, message },
  headers: {
    'Authorization': `Bearer ${session?.access_token}`,
  },
})
    console.log('Supabase response:', { data, error })
    
    if (error) {
      console.error('Supabase function error:', error)
      return NextResponse.json({ 
        error: 'Failed to send email',
        details: error.message 
      }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'Email request sent', data })
    
  } catch (err) {
    console.error('API route error:', err)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}