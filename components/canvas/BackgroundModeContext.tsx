'use client';

import React, { createContext, useContext, useState } from 'react';

type Mode = 'fluid' | 'wireframe';

interface BackgroundModeContextType {
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
}

const BackgroundModeContext = createContext<BackgroundModeContextType>({
  mode: 'fluid',
  toggleMode: () => {},
  setMode: () => {},
});

export function BackgroundModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('fluid');

  const toggleMode = () => {
    setMode((prev) => (prev === 'fluid' ? 'wireframe' : 'fluid'));
  };

  return (
    <BackgroundModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </BackgroundModeContext.Provider>
  );
}

export function useBackgroundMode() {
  return useContext(BackgroundModeContext);
}
