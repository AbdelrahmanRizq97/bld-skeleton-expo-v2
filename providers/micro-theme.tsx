import * as React from 'react';
import { View } from 'react-native';
import { useColorScheme as useNWColorScheme } from 'nativewind';

type Scheme = 'light' | 'dark';

type MicroThemeContextValue = {
  scheme: Scheme;
  setScheme: (s: Scheme) => void;
  toggle: () => void;
};

const MicroThemeContext = React.createContext<MicroThemeContextValue | undefined>(undefined);

export function useMicroTheme() {
  const ctx = React.useContext(MicroThemeContext);
  if (!ctx) {
    throw new Error('useMicroTheme must be used within MicroThemeProvider');
  }
  return ctx;
}

type ProviderProps = {
  children: React.ReactNode;
};

export function MicroThemeProvider({ children }: ProviderProps) {
  // Initialize from system/nativewind but do not mutate global scheme afterwards
  const { colorScheme: systemScheme } = useNWColorScheme();
  const [scheme, setScheme] = React.useState<Scheme>((systemScheme as Scheme) ?? 'light');

  const value = React.useMemo<MicroThemeContextValue>(
    () => ({
      scheme,
      setScheme,
      toggle: () => setScheme((s) => (s === 'dark' ? 'light' : 'dark')),
    }),
    [scheme],
  );

  // Scope CSS variables to subtree using micro-scoped classes
  const wrapperClass = scheme === 'dark' ? 'micro-dark' : 'micro-light';

  return (
    <MicroThemeContext.Provider value={value}>
      <View className={wrapperClass} style={{ flex: 1 }}>
        {children}
      </View>
    </MicroThemeContext.Provider>
  );
}


