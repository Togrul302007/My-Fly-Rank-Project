// app/chat/error.tsx
'use client';

import { useEffect } from 'react';

export default function GlobalChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route level error:', error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="rounded-full bg-red-500/10 p-3 text-red-500">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Bir xəta baş verdi
      </h2>
      <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        Səhifə yüklənərkən gözlənilməz texniki problem yarandı. Səhifəni yenidən sınaya bilərsiniz.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
      >
        Yenidən cəhd et
      </button>
    </div>
  );
}