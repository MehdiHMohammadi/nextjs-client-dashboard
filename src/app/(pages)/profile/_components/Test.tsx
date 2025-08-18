// در یک component یا test file
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TestFunction = async () => {
  const { data, error } = await supabase.functions.invoke('resend-email', {
    body: { 
      emailTo: 'test@example.com',
      subject: 'Test',
      message: 'Test message'
    },
  })
  console.log({ data, error })
}

export default TestFunction;