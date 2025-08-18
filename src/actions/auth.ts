'use server' // این خط نشان می‌دهد که این فایل یک Server Action است.

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error signing in:', error.message)
    // می‌توانید پیام خطای بهتری را به کاربر نمایش دهید
    return { error: error.message }
  }

  redirect('/') // پس از ورود موفق، به صفحه داشبورد هدایت کنید
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Error signing up:', error.message)
    return { error: error.message }
  }

  redirect('/login?message=Check email to confirm signup') // پس از ثبت‌نام، به صفحه ورود هدایت کنید
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login') // پس از خروج، به صفحه ورود هدایت کنید
}