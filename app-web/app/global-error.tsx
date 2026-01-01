'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // エラーをログサービスに送信
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">エラーが発生しました</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              申し訳ございません。アプリケーションで重大なエラーが発生しました。
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              もう一度試す
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
