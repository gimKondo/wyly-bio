'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      updateResolvedTheme(theme === 'system' ? getSystemTheme() : (theme as 'light' | 'dark'));
    };

    mediaQuery.addEventListener('change', handleChange);
    handleChange();

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const updateResolvedTheme = (newTheme: 'light' | 'dark') => {
    setResolvedTheme(newTheme);
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    const resolved = newTheme === 'system' ? getSystemTheme() : (newTheme as 'light' | 'dark');
    updateResolvedTheme(resolved);
  };

  return {
    theme,
    setTheme: changeTheme,
    resolvedTheme,
  };
}
