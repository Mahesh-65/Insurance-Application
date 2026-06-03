import { useEffect, useState } from 'react';

const key = 'insurance-theme';

const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem(key) || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(key, theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
