import { useEffect } from 'react';

export const useTheme = () => {
  useEffect(() => {
    // Explicitly lock root to light mode
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
  }, []);

  return { theme: 'light', toggleTheme: () => {}, isDark: false };
};
