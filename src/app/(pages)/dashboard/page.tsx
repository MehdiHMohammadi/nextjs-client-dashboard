// app/dashboard/page.js
// import ProtectedRoute from '@/components/ProtectedRoute'

// export default function Dashboard() {
//   return (
//     <ProtectedRoute>
//       <div className="p-8">
//         <h1 className="text-2xl font-bold">داشبورد</h1>
//         <p>این صفحه محافظت شده است</p>
//       </div>
//     </ProtectedRoute>
//   )
// }


// app/profile/page.tsx - همان کد قبلی
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = createClient()
  
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (!user || error) {
    redirect('/login?message=برای دسترسی به این صفحه باید وارد شوید')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">پروفایل کاربری</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p><strong>ایمیل:</strong> {user.email}</p>
        <p><strong>تاریخ عضویت:</strong> {new Date(user.created_at).toLocaleDateString('fa-IR')}</p>
      </div>
    </div>
  )
}