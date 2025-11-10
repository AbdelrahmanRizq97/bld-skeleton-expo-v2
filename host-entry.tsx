/**
 * ⚠️ CRITICAL: DO NOT MODIFY THIS FILE ⚠️
 * 
 * This file is the host entry point for the micro-frontend architecture.
 * It handles React Native AppRegistry registration and must remain unchanged.
 * Any modifications will break the app initialization.
 * 
 * LLMs should NEVER attempt to modify, refactor, or "improve" this file.
 * This file is managed externally and should remain unchanged.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppRegistry, Appearance, View } from 'react-native';

console.log('Micro: host-entry.tsx');

const mod = require('./host-root.tsx');
const App = mod.default ?? mod.App ?? mod.Root ?? mod;

if (typeof App !== 'function') {
  console.log('Micro entry: App is not a component, got:', typeof App, App);
  throw new Error('host-root must default-export a React component');
}

/**
 * MicroThemeIsolator
 *
 * Isolates the micro app's theme from the super app by:
 * - Intercepting Appearance.setColorScheme() within this JS runtime
 * - Returning the local theme from Appearance.getColorScheme()
 * - Applying a className 'dark' at the root to enable NativeWind dark: variants
 *
 * This ensures calls like nativewind's useColorScheme().setColorScheme('dark')
 * only affect this micro app and not the super app.
 */
function MicroThemeIsolator({ children }: { children: React.ReactNode }) {
  // Initialize from current system/theme value
  const initial = useMemo(() => {
    try {
      return (Appearance.getColorScheme?.() as 'light' | 'dark' | null) ?? 'light';
    } catch {
      return 'light';
    }
  }, []);
  const [theme, setTheme] = useState<'light' | 'dark'>(initial === 'dark' ? 'dark' : 'light');

  const originalsRef = useRef<{
    get?: any;
    set?: any;
  }>({});

  useEffect(() => {
    // Capture originals
    const RN_Appearance = Appearance;
    originalsRef.current.get = RN_Appearance.getColorScheme?.bind(RN_Appearance);
    originalsRef.current.set = RN_Appearance.setColorScheme?.bind(RN_Appearance);

    // Override getters/setters locally
    RN_Appearance.getColorScheme = () => theme;
    RN_Appearance.setColorScheme = (scheme?: 'light' | 'dark' | null) => {
      if (scheme === 'light' || scheme === 'dark') {
        setTheme(scheme);
      } else {
        // Reset to system -> fallback to original getter if present
        const sys = originalsRef.current.get?.() ?? 'light';
        setTheme(sys === 'dark' ? 'dark' : 'light');
      }
      // Do NOT forward to original setter to avoid changing host/super app
      return undefined;
    };

    return () => {
      // Restore originals on unmount
      if (originalsRef.current.get) {
        RN_Appearance.getColorScheme = originalsRef.current.get;
      }
      if (originalsRef.current.set) {
        RN_Appearance.setColorScheme = originalsRef.current.set;
      }
    };
  }, [theme]);

  return (
    <View className={theme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
      {children}
    </View>
  );
}

AppRegistry.registerComponent('MicroMain', () => {
  console.log('Micro: Returning App from registerComponent');
  return function WrappedApp() {
    return (
      <MicroThemeIsolator>
        <App />
      </MicroThemeIsolator>
    );
  };
});
console.log('Micro: host-entry.tsx registered');