'use client'
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

const alertVariants = cva(
  "relative w-full max-w-sm rounded-lg border p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-400",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-400",
        destructive: "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// آیکون‌ها (اختیاری، می‌تونی SVG خودت رو بذاری)
const icons = {
  success: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  destructive: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
  default: null,
};

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {
    title?: string;
    description?: string;
  }
>(({ className, variant, title, description, ...props }, ref) => {
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  // برای تایمر 4 ثانیه‌ای
  React.useEffect(() => {
    setMounted(true); // فقط در کلاینت رندر بشه
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 4000); // 4000 میلی‌ثانیه = 4 ثانیه

    // Cleanup تایمر وقتی کامپوننت unmount می‌شه
    return () => clearTimeout(timer);
  }, []);

  // اگه بسته شده، چیزی رندر نکن
  if (!isOpen) return null;

  const alertContent = (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant }),
        "fixed bottom-4 left-4 z-50 flex items-start gap-3 animate-in slide-in-from-bottom",
        className
      )}
      {...props}
    >
      {variant && icons[variant]}
      <div className="flex-1">
        {title && <div className="font-bold">{title}</div>}
        {description && <div className="text-sm">{description}</div>}
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="ml-auto text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );

  return mounted ? createPortal(alertContent, document.body) : null;
});
Alert.displayName = "Alert";

export { Alert };