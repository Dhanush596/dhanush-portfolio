'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export type ThemeName =
  | 'home'
  | 'work'
  | 'journey'
  | 'devops'
  | 'stack'
  | 'credentials'
  | 'about'
  | 'contact';

export function getThemeFromPathname(pathname: string): ThemeName {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/work')) return 'work';
  if (pathname.startsWith('/journey')) return 'journey';
  if (pathname.startsWith('/devops-lab')) return 'devops';
  if (pathname.startsWith('/stack')) return 'stack';
  if (pathname.startsWith('/credentials')) return 'credentials';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/resume')) return 'credentials';
  return 'home';
}

export function ThemeSetter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useMemo(() => getThemeFromPathname(pathname || '/'), [pathname]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div data-theme={theme} className="min-h-screen flex flex-col transition-colors duration-500 ease-in-out">
      {children}
    </div>
  );
}
