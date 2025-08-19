'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
// import { createClient } from "@/lib/supabase/client";

import { useRouter } from 'next/navigation';
import { GoogleIcon } from "@/assets/icons";

export default  function GoogleSigninButton({ text }: { text: string }) {
  // const supabase =  createClient();
  const router = useRouter();
   useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.push("/smart-lawyer");
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    })
    if (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };
  return (
    <button onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-[15px] font-medium hover:bg-opacity-50 dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-opacity-50">
      <GoogleIcon />
      {text} با گوگل
    </button>
  );
}
