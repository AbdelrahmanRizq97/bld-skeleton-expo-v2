## 🚨 CRITICAL: Replace Root Index File

- **ALWAYS replace `app/index.tsx`** with a redirect to your actual app when building a new feature. The skeleton provides a component showcase template at `app/index.tsx` that will be the landing page.
- **🚨 NEVER use `as any` type casts with Redirect** - This can cause "This screen doesn't exist" errors and routing failures.
- **Redirect strategy**: Always redirect to a specific screen, never to a route group alone.
  - **IF using tabs**: Use `<Redirect href="/(tabs)/screen-name" />` where `screen-name` is your default tab (e.g., `playdates`, `overview`, `home`)
  - **IF NOT using tabs**: Use `<Redirect href="/screen-name" />` to your main screen
  - **🚨 DO NOT create `index.tsx` inside `(tabs)`** - All tabs should have semantic names (e.g., `playdates.tsx`, `contacts.tsx`) for clarity

```tsx
// ✅ CORRECT - Tab-based app with named tabs
import { Redirect } from 'expo-router';

export default function RootIndex() {
  return <Redirect href="/(tabs)/playdates" />;
}

// ✅ CORRECT - Non-tab app
import { Redirect } from 'expo-router';

export default function RootIndex() {
  return <Redirect href="/home" />;
}

// ❌ WRONG - Using 'as any' type cast
export default function RootIndex() {
  return <Redirect href="/(tabs)/playdates" as any />; // Causes routing errors!
}

// ❌ WRONG - Redirecting to group without specific screen
export default function RootIndex() {
  return <Redirect href="/(tabs)" />; // "This screen doesn't exist" error!
}
```

## Folder structure and responsibilities

Use this structure when adding or modifying code. Keep modules small, composable, and placed by responsibility. Import with the `@` alias from the repo root (e.g., `@/components/ui/button`).

### app

- **Purpose**: Route-driven screens and layouts (Expo Router). Page-level composition only.
- **Contains**: Screens, `_layout.tsx`, `+html.tsx`, `+not-found.tsx`, screen-specific loaders/actions.
- **Put here**: Navigation, screen composition, local screen state, wiring UI primitives and hooks.
- **Avoid**: Reusable primitives, global state, generic hooks, low-level utilities.

#### 🚨 CRITICAL: Stack Navigator Header Configuration

- **ALWAYS configure headers in root `_layout.tsx`** - The Stack component in your root layout MUST have `screenOptions={{ headerShown: false }}` to prevent showing default route names as titles.
- **Default behavior shows route folder names** - Without explicit configuration, Stack will show route folder names like "(tabs)" as header titles.
- **Example**:

```tsx
// ✅ CORRECT - Root layout with headers disabled and GestureHandlerRootView
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// ❌ WRONG - Will show "(tabs)" or other route folder names as titles
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <Stack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

**Note:** The `GestureHandlerRootView` wrapper is required if you use bottom sheets, swipeable components, or any gesture-based UI. Always include it as the outermost wrapper.

- **When to show headers**: Only enable headers when you explicitly want them and have configured proper titles for each screen in that Stack's options.
- **Tab layouts**: Tab navigators should also have `headerShown: false` in their screenOptions, and individual screens can use `<Stack.Screen options={{ headerShown: false }} />` if needed.
- **CRITICAL: Explicit headerShown for consistent positioning** - Always explicitly set `headerShown: true` in `Stack.Screen` options when using headers on individual screens. Omitting this can cause inconsistent header positioning on Android between different screens.

#### 🚨 CRITICAL: Expo Router Navigation Rules

- **NEVER use `useEffect` + `router.replace()` for redirects** - This causes "Attempted to navigate before mounting the Root Layout component" errors.
- **ALWAYS use `<Redirect>` component** for declarative redirects in screen components.
- **🚨 NEVER use `as any` type casts with navigation** - This breaks type safety and can cause "This screen doesn't exist" errors.
- **Always redirect to specific screens, not route groups** - Use `/(tabs)/screen-name` to specify which tab to load.
- **Example**:

```tsx
// ❌ WRONG - Will cause mounting errors
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/(tabs)/playdates');
  }, []);
  return null;
}

// ❌ WRONG - Using 'as any' breaks routing
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(tabs)/playdates" as any />; // DO NOT DO THIS!
}

// ❌ WRONG - Redirecting to group without specific screen
export default function Index() {
  return <Redirect href="/(tabs)" />; // "This screen doesn't exist" error!
}

// ✅ CORRECT - Use Redirect component with specific screen
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(tabs)/playdates" />;
}
```

- **When to use imperative navigation** (`router.push/replace`):
  - Inside event handlers (button clicks, form submissions)
  - After async operations complete (API calls, auth checks)
  - Never in component body or useEffect on mount
  - **NEVER use `as any` casts** - If TypeScript complains about a route, the route path is likely wrong, not the type system

#### 🚨 CRITICAL: Proper File Structure for Tab Navigation (important only if you are using tabs)

**Problem**: In Expo Router, **ALL files inside a `(tabs)` folder automatically become tabs** in the tab bar, AND they become children of the Tabs navigator, which means they lose native Stack navigation features.

**Common Symptoms**: 
1. You see many unwanted tabs at the bottom navigation (like `create-contact`, `edit-playdate/[id]`, etc.) when you only wanted 3-4 main tabs
2. Detail/edit/create screens don't have native iOS swipe-back gestures
3. Headers don't have the native iOS liquid glass blur effect
4. Navigation doesn't feel native

**Why This Happens**: Expo Router treats every route file in a tabs directory as a child of the Tabs navigator. Tabs navigators don't support native Stack navigation features like swipe-back gestures or proper iOS headers.

**✅ CORRECT Solution: Keep Detail/Edit/Create Screens at App Root Level**

Place ONLY your main tab screens inside `app/(tabs)/`, and keep all other screens at the app root level (`app/`) so they're part of the Stack navigator:

**Directory Structure:**
```
app/
├── _layout.tsx                    # Root Stack navigator
├── index.tsx                      # Redirect to /(tabs)/playdates
├── (tabs)/                        # 🟢 Tab navigator folder
│   ├── _layout.tsx                # Tabs configuration
│   ├── playdates.tsx              # Main tab: Playdates
│   ├── contacts.tsx               # Main tab: Contacts
│   └── settings.tsx               # Main tab: Settings
├── create-contact.tsx             # 🟢 Stack screen (not a tab!)
├── create-playdate.tsx            # 🟢 Stack screen (not a tab!)
├── contact/
│   └── [id].tsx                   # 🟢 Stack screen (not a tab!)
├── playdate/
│   └── [id].tsx                   # 🟢 Stack screen (not a tab!)
├── edit-contact/
│   └── [id].tsx                   # 🟢 Stack screen (not a tab!)
└── edit-playdate/
    └── [id].tsx                   # 🟢 Stack screen (not a tab!)
```

**Tabs Layout (Clean and Simple):**
```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Calendar, Users, Settings } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="playdates"
        options={{
          title: 'Playdates',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

**Navigation Paths:**
```tsx
// From a tab screen, navigate to Stack screens using root paths
router.push('/create-contact');           // Not /(tabs)/create-contact
router.push('/contact/123');              // Not /(tabs)/contact/123
router.push('/edit-playdate/456');        // Not /(tabs)/edit-playdate/456
```

**Why This Approach is Better:**
- ✅ Native iOS swipe-back gesture works on detail/edit/create screens
- ✅ Proper iOS header with liquid glass blur effect
- ✅ Native Android back button behavior
- ✅ Clean tabs layout with no `href: null` hacks
- ✅ Follows iOS and Android navigation patterns
- ✅ Better performance (screens only rendered when needed)

**File Organization Rules:**
- **Inside `app/(tabs)/`**: ONLY the 3-5 main screens that should appear as tabs
- **At `app/` root**: Detail screens, edit screens, create screens, authentication screens, onboarding, etc.
- **Never**: Put detail/edit/create screens inside the `(tabs)` folder

```tsx
// ❌ WRONG - Putting everything inside (tabs) folder
app/(tabs)/
  ├── playdates.tsx
  ├── contacts.tsx
  ├── settings.tsx
  ├── create-contact.tsx          // ❌ Should be at app root!
  ├── contact/[id].tsx            // ❌ Should be at app root!
  └── edit-contact/[id].tsx       // ❌ Should be at app root!

// ✅ CORRECT - Only main tabs inside, others at root
app/
  ├── (tabs)/
  │   ├── playdates.tsx           // ✅ Main tab
  │   ├── contacts.tsx            // ✅ Main tab
  │   └── settings.tsx            // ✅ Main tab
  ├── create-contact.tsx          // ✅ Stack screen
  ├── contact/[id].tsx            // ✅ Stack screen
  └── edit-contact/[id].tsx       // ✅ Stack screen
```

### assets

- **Purpose**: Static files used by the app.
- **Contains**: Images, icons, fonts, lotties, etc.
- **Put here**: Any file referenced via `require()` or static import.
- **Avoid**: Runtime code or TypeScript.

### components/ui

- **Purpose**: Reusable, cross-platform UI primitives and compound components.
- **Contains**: Presentational components (e.g., `button`, `card`, `input`, `tabs`, etc.).
- **Conventions**:
  - Accept `className` and forward props; no screen-specific logic.
  - Keep them stateless or minimally stateful; expose controlled props when applicable.
  - Style with NativeWind classes; keep APIs consistent across components.
- **Put here**: Building blocks used across multiple screens.
- **Avoid**: Business logic, navigation, or app-wide state.

### lib

- **Purpose**: Framework-agnostic utilities and configuration.
- **Contains**: `utils.ts`, theming/tokens in `theme.ts`, constants, pure helpers.
- **Put here**: Pure functions, config, formatters, type helpers.
- **Avoid**: React components, React state, platform APIs.

- **Utilities layout**:
  - Shared constants → `lib/utils/constants.ts`
  - Validation helpers (pure, no framework imports) → `lib/utils/validators.ts`
  - Formatters (dates, numbers, strings, etc.) → `lib/utils/formatters.ts`
  - Keep functions pure/deterministic; no side effects or I/O.

### context

- **Purpose**: App-wide React Context providers and associated types.
- **Contains**: Provider components, context values, minimal reducers/selectors.
- **Put here**: Global state like auth, settings, feature flags.
- **Conventions**: Export `Provider` and a typed `useXxxContext()` hook; keep side effects small and isolated.
- **Avoid**: UI components or screen-specific state.
- **🚨 CRITICAL: AsyncStorage import** - If persisting state with AsyncStorage, ALWAYS use default import: `import AsyncStorage from '@react-native-async-storage/async-storage'` (NOT `import * as AsyncStorage`). See "AsyncStorage Import" section for details.

### hooks

- **Purpose**: Reusable React hooks not tied to a specific screen.
- **Contains**: Data-fetching hooks, platform/feature hooks, memoized logic.
- **Put here**: `useXxx` hooks that can be shared (`useOnlineStatus`, `useDebounce`, etc.).
- **Avoid**: Rendering UI or depending on screen-specific context.

## Quick placement guide

- **New screen / route** → `app/`
- **New UI primitive / variant** → `components/ui/`
- **Cross-screen global state** → `context/`
- **Reusable hook** → `hooks/`
- **Utility / formatter / token** → `lib/`
- **Image / font / lottie** → `assets/`

## Styling and imports

- Prefer `className` with NativeWind utility classes.
- Keep `components/ui` APIs platform-agnostic.
- Use `@/…` path alias for imports.
- **CRITICAL: React imports** - Always use named imports from 'react' (e.g., `import { useState, useEffect } from 'react'`). Never use `React.useEffect()` unless you've imported `React` itself. If using a React API, import that specific API by name.

### 🚨 CRITICAL: AsyncStorage Import

- **ALWAYS use default import for AsyncStorage** - Using namespace import (`import * as`) will cause "AsyncStorage.getItem is not a function" errors.
- **Correct import**: `import AsyncStorage from '@react-native-async-storage/async-storage';`

```tsx
// ✅ CORRECT - Default import
import AsyncStorage from '@react-native-async-storage/async-storage';

// Usage works correctly
const value = await AsyncStorage.getItem('key');
await AsyncStorage.setItem('key', 'value');

// ❌ WRONG - Namespace import causes runtime errors
import * as AsyncStorage from '@react-native-async-storage/async-storage';

// This will fail with "AsyncStorage.getItem is not a function"
const value = await AsyncStorage.getItem('key'); // TypeError!
```

**Why this happens**: The `@react-native-async-storage/async-storage` package exports a default object with methods, not a namespace. Using `import * as` wraps the module in an extra layer, making the methods inaccessible.

### 🚨 CRITICAL: Text and Icon Styling Inside Context-Providing Components

Many UI components (Card, Badge, Button, Alert, etc.) wrap their children in `TextClassContext.Provider` to set default text colors. This context value can override Text `variant` prop styles because of className precedence order.

**For Text components:**
- Always add the explicit className (e.g., `text-foreground`, `text-muted-foreground`) in addition to the variant prop to ensure proper colors.
- Example: `<Text variant="h3" className="mb-1 text-foreground">Title</Text>` inside a Card component.

**For Lucide icons (used directly, not through Icon wrapper):**
- **Do NOT use `className` for colors** - Use the `color` prop with `theme.colors` instead.
- The `className` approach doesn't work reliably with Lucide icons in React Native.
- Example: `<Users size={24} color={theme.colors.primary} />` inside a Card component.
- ❌ Wrong: `<Users size={24} className="text-primary" />` - This won't work properly.

### Screen Header Consistency

All screen headers should follow a consistent structure: use `h1` variant for the page title (left-aligned by default), place action buttons on the right in a flex-row layout, and avoid mixing header styles (no subtitles on some pages but not others). This creates a predictable navigation experience and professional appearance across the app.

### Making List Items Fully Clickable

For list items with small interactive elements (radio buttons, checkboxes), wrap the row in `Pressable` and add `pointerEvents="none"` to the immediate child View so touches pass through to the Pressable, making the entire row clickable.

**This pattern is essential for:**
- `RadioGroup` items - only the small circle is tappable by default
- `Checkbox` items - only the checkbox itself is tappable by default
- Any list item with small touch targets

- Small touch targets are bad for accessibility and user experience.

See the RadioGroup and Checkbox sections in UI Components Reference for specific examples.

### 🚨 CRITICAL: Theme-Aware Colors in Navigation

- **NEVER hardcode colors in tab bars or navigation** - Always use theme colors that adapt to light/dark mode.
- **Active states MUST have high contrast** - Selected/active elements should be highly visible against their background.
- **Use the theme system** - Import colors from `@/lib/theme` and use `useColorScheme` to get the current theme.

**Example for Tab Bar Colors:**

```tsx
// ✅ CORRECT - Theme-aware colors with proper contrast
import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.foreground,    // Light in dark mode, dark in light mode
        tabBarInactiveTintColor: theme.mutedForeground,  // Muted but still visible
      }}>
      {/* ... */}
    </Tabs>
  );
}

// ❌ WRONG - Hardcoded colors that don't adapt
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'hsl(0 0% 9%)',  // Almost black - invisible on dark backgrounds!
        tabBarInactiveTintColor: 'hsl(0 0% 45.1%)',
      }}>
      {/* ... */}
    </Tabs>
  );
}
```

**Contrast Guidelines:**
- Dark backgrounds need light text/icons (high lightness values like 98%)
- Light backgrounds need dark text/icons (low lightness values like 9%)
- Active/selected states should have MORE contrast than inactive states, not less
- Never use colors that are too similar to their background (e.g., 9% lightness on 3.9% background)

## Safe area
- Always use safe areas in your app since we will be using the app on real iphone and android devices.
- **IMPORTANT**: React Native's built-in `SafeAreaView` is deprecated. Always use `react-native-safe-area-context` instead.
- Use `SafeAreaProvider` from `react-native-safe-area-context` to wrap your app root.
- Use `SafeAreaView` from `react-native-safe-area-context` for safe area views (NOT from `react-native`).
- Use `useSafeAreaInsets` hook from `react-native-safe-area-context` to access safe area insets programmatically.
- For advanced use cases, `SafeAreaFrameContext` and `SafeAreaInsetsContext` are available from the same package.

### Critical Setup
- **`SafeAreaProvider` is required at app root** - `SafeAreaView` will NOT work without it wrapped around your app in `_layout.tsx`
- **Without `SafeAreaProvider`**, safe area insets will be 0 and content will be hidden under notches, status bars, and transparent headers

### 🚨 CRITICAL: Don't Double-Count Safe Area Insets
- **NEVER use both `SafeAreaView` AND manual inset padding** - This creates excessive spacing at the top of screens.
- **Rule of thumb**: By default, `SafeAreaView` applies safe area to ALL edges (top, bottom, left, right). If another component already handles an edge's safe area, exclude that edge using the `edges` prop.
- **🚨 CRITICAL: Headers already handle top safe area** - When using `headerShown: true`, do NOT wrap content in `SafeAreaView` with `edges={['top']}`. The header already provides top safe area spacing.

**Common Scenarios:**

1. **Tab screens WITHOUT headers** - Use `SafeAreaView` with `edges={['top']}` because tab bar handles bottom safe area
2. **Tab screens WITH headers** (`headerShown: true`) - Do NOT use `SafeAreaView`. Use `ScrollView` directly with `contentInsetAdjustmentBehavior="automatic"` on iOS. The header already handles top safe area.
3. **Full-screen modals without headers** - Use `SafeAreaView` with no edges prop (all edges) or leave default behavior
4. **Screens with transparent headers** - See "Native iOS-Style Navigation Headers" section below

**Visual Clue:** If you see a **gap between the header and your content**, you're double-counting the top safe area. If you see a gap between your content and the tab bar, you're double-counting the bottom safe area.

**Examples:**

```tsx
// ✅ CORRECT - Tab screen WITHOUT header
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 16,
          }}>
          {/* Your content */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// ✅ CORRECT - Tab screen WITH header
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'My Screen' }} />
      <ScrollView
        className="flex-1 bg-background"
        contentInsetAdjustmentBehavior={Platform.OS === 'ios' ? 'automatic' : undefined}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: Math.max(insets.bottom, 32),
        }}>
        {/* Your content */}
      </ScrollView>
    </>
  );
}

// ✅ CORRECT - Full-screen modal without header
export default function ModalScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 16,
          }}>
          {/* Your content */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// ❌ WRONG - Tab screen WITH header using SafeAreaView edges={['top']}
export default function TabScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'My Screen' }} />
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        {/* This creates a big gap under the header! Header already handles top safe area. */}
        <ScrollView>
          {/* Your content */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// ❌ WRONG - Tab screen without edges={['top']} causes gap at bottom
export default function TabScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-background">
        {/* This adds bottom padding when tab bar already does */}
        <ScrollView>
          {/* Your content */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// ❌ WRONG - Double-counting with manual insets
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Screen() {
  const insets = useSafeAreaInsets();
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top + 16, // ❌ insets.top is already applied by SafeAreaView!
          }}>
          {/* Your content */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
```

### Transparent Headers
- **iOS Only**: When using `headerTransparent: true`, use `contentInsetAdjustmentBehavior="automatic"` for automatic spacing
- **Android**: Use solid headers (`headerTransparent: false`) to avoid button press bugs - React Navigation handles spacing automatically
- **If you must use transparent headers** (not recommended on Android), you must add padding to account for both the safe area AND the header height
- Use `useSafeAreaInsets` hook combined with a `HEADER_HEIGHT` constant (typically 60px) only when using transparent headers
- Example pattern (for transparent headers only):

```tsx
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 60;

export default function Screen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentInsetAdjustmentBehavior={Platform.OS === 'ios' ? 'automatic' : undefined}
        contentContainerStyle={{
          // Only add manual padding if using transparent headers on Android (not recommended)
          paddingTop: Platform.OS === 'android' ? insets.top + HEADER_HEIGHT : 0,
        }}
      >
        {/* Your content */}
      </ScrollView>
    </View>
  );
}
```

**Recommended approach:** Use the platform-specific setup from "Native iOS-Style Navigation Headers" section instead, which uses transparent headers on iOS and solid headers on Android.

### Keyboard Handling for Forms
- When building forms with text inputs, wrap your content with `KeyboardAvoidingView` to prevent the keyboard from covering inputs
- Use `behavior="padding"` for iOS and `behavior="height"` for Android (use `Platform.OS` to differentiate)
- Set `keyboardVerticalOffset` to account for header height:
  - **With headers enabled**: Use `keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}` (90px accounts for iOS header + safe area)
  - **Without headers** (fullscreen): Use `keyboardVerticalOffset={0}`
- Add `keyboardShouldPersistTaps="handled"` to ScrollView to allow tapping inputs without dismissing keyboard first
- Example pattern with headers:

```tsx
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FormScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Add Item',
          headerTitleAlign: 'center',
        }}
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <ScrollView
          className="flex-1 bg-background"
          contentInsetAdjustmentBehavior={Platform.OS === 'ios' ? 'automatic' : undefined}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: Math.max(insets.bottom, 32),
          }}>
          {/* Your form inputs */}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
```

## Native iOS-Style Navigation Headers

### Overview
This guide covers implementing native iOS-style transparent navigation headers with proper safe area handling for both iOS and Android, and styling header buttons to look native without custom components.

### 🚨 CRITICAL RULE: Never Use headerBlurEffect
- **DO NOT use `headerBlurEffect` property** - It interferes with transparency and can make headers appear solid
- iOS automatically applies the correct native blur when `headerTransparent: true` is set
- The automatic blur adapts to system appearance (light/dark mode) without any configuration
- This is a proven working pattern - trust the native iOS behavior

### Basic Header Setup

Enable native headers in your root `_layout.tsx`:

```tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useColorScheme } from 'nativewind';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <StatusBar 
        style={colorScheme === 'dark' ? 'light' : 'dark'} 
        translucent={false}
        backgroundColor={Platform.OS === 'android' ? (colorScheme === 'dark' ? '#0a0a0a' : '#ffffff') : undefined}
      />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerLargeTitle: false,
          headerLargeTitleStyle: {
            fontWeight: '700',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17,
          },
          headerTitleAlign: 'left', // Default for root screens
          headerBackTitle: '', // iOS default - sub-screens should use custom headerLeft for chevron-only (iOS only)
          // CRITICAL: Android has a bug with transparent headers where headerRight buttons don't fire onPress
          ...(Platform.OS === 'android' && {
            headerTransparent: false,
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#0a0a0a' : '#ffffff',
            },
          }),
        }}
      />
    </>
  );
}
```

**Key Properties:**
- `headerShown: true` - Enables native navigation headers
- `headerTransparent: true` - Makes header transparent on iOS with **automatic native blur** (no need to specify `headerBlurEffect`)
- `headerLargeTitle: false` - Explicitly disables large titles
- `headerBackTitle: ''` - iOS default setting, but sub-screens should use custom `headerLeft` for consistent chevron-only back buttons on iOS (Android uses default back button)

**🚨 CRITICAL: StatusBar Configuration for Android**
- **MUST set `translucent={false}` on Android** - This prevents the status bar from overlaying app content and creating overlap between the status bar and header
- **MUST set `backgroundColor` to match header color on Android** - Use the same background colors as your header for a seamless appearance
- Without `translucent={false}`, the status bar will overlap the header, causing visual issues
- The StatusBar component should be placed at the root level in `_layout.tsx`, before the Stack navigator
- Example: `<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} translucent={false} backgroundColor={Platform.OS === 'android' ? (colorScheme === 'dark' ? '#0a0a0a' : '#ffffff') : undefined} />`

**🚨 CRITICAL: Do NOT use `headerBlurEffect`**
- iOS automatically applies the correct blur effect based on system appearance when `headerTransparent: true`
- Explicitly setting `headerBlurEffect` can interfere with transparency and cause the header to appear solid
- Let iOS handle the blur natively - it will adapt automatically to light/dark mode

**🚨 CRITICAL Android Limitation:**
- **Transparent headers break button touch events on Android** - Header buttons (headerRight/headerLeft) show press states but `onPress` handlers don't fire
- **Solution**: Use solid headers on Android with platform-specific styling
- The example above uses transparent headers on iOS and solid headers on Android

### Platform-Specific Safe Area Handling

**Critical Difference:** iOS and Android handle safe areas differently based on header transparency.

#### iOS (Transparent Headers)
Use `contentInsetAdjustmentBehavior="automatic"` - iOS automatically adjusts content spacing under transparent headers with blur effect.

#### Android (Solid Headers)
**When using solid headers** (`headerTransparent: false`, recommended for Android due to button press bugs), **NO manual padding is needed**. React Navigation automatically positions content below the header.

**Why Android uses solid headers:** Transparent headers on Android have a known bug where `headerRight` and `headerLeft` button `onPress` handlers don't fire.

#### Complete Pattern

```tsx
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Screen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior={Platform.OS === 'ios' ? 'automatic' : undefined}
      contentContainerStyle={{
        // NO paddingTop needed for Android with solid headers!
        paddingHorizontal: 20,
        paddingBottom: Math.max(insets.bottom, 32),
      }}>
      {/* Your content */}
    </ScrollView>
  );
}
```

**Why this works:**
- iOS: Transparent header + `contentInsetAdjustmentBehavior="automatic"` handles safe area automatically
- Android: Solid header + React Navigation automatically positions content below the header
- Bottom padding: Uses larger of safe area or minimum padding

**Note:** If you ever need transparent headers on Android (not recommended), you would need manual padding like `paddingTop: insets.top + 60`, but this comes with the button press bug.

### Native Header Buttons (No Custom Components)

**Key Principle:** Use plain `TouchableOpacity` with React Native's `Text` component. No custom button components, no backgrounds, no borders. This creates the authentic iOS look.

#### Button Spacing Guidelines

| Button Type | Padding Horizontal | Icon Size | Stroke Width |
|-------------|-------------------|-----------|--------------|
| Text button | 8px | N/A | N/A |
| Icon button | 4px | 25 | 2.5 |

**Note for Tab Screens:** Header buttons inside tab navigator screens (non-root headers) should use `paddingHorizontal: 16` instead of `4px`. Tab screen headers don't have the native iOS liquid glass effect, so they need more spacing for proper visual balance.

#### Icon Button Example

```tsx
import { Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import { Stack, useRouter } from 'expo-router';

export default function Screen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Tasks',
          headerTitleAlign: 'left',
          headerRight: () => (
            <Pressable 
              onPress={() => router.push('/add-task')}
              style={{ paddingHorizontal: 4 }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              {({ pressed }) => (
                <Plus 
                  size={25} 
                  color={theme.colors.primary} 
                  strokeWidth={2.5}
                  style={{ opacity: pressed ? 0.5 : 1 }} 
                />
              )}
            </Pressable>
          ),
        }}
      />
      {/* Your content */}
    </>
  );
}
```

#### Text Button Example

```tsx
import { Platform, Pressable, Text as RNText } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function FormScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Add Task',
          headerTitleAlign: 'center',
          ...(Platform.OS === 'ios' && {
            headerBackVisible: false,
            headerLeft: () => (
              <Pressable 
                onPress={() => router.back()}
                style={{ paddingHorizontal: 4 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {({ pressed }) => (
                  <ChevronLeft 
                    size={25} 
                    color={theme.colors.primary} 
                    strokeWidth={2.5}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            ),
          }),
          headerRight: () => (
            <Pressable 
              onPress={handleSubmit}
              disabled={!formValid}
              style={{ paddingHorizontal: 8 }}>
              <RNText style={{ 
                fontSize: 17, 
                color: formValid ? theme.colors.primary : '#8E8E93',
                fontWeight: '600' 
              }}>
                Done
              </RNText>
            </Pressable>
          ),
        }}
      />
      {/* Your form */}
    </>
  );
}
```

**Important Details:**
- Always use `theme.colors.primary` for active button color (adapts to light/dark mode)
- Disabled text buttons use gray: `#8E8E93`
- Font size: 17px for consistency with iOS
- Font weight: 600 (semibold)
- **Use `Pressable` instead of `TouchableOpacity`** for better cross-platform compatibility
- **Add `hitSlop`** to expand touch area for better tap detection, especially on Android
- **Sub-screens must include custom back button on iOS only** - Wrap `headerBackVisible: false` and custom `headerLeft` with ChevronLeft icon in `Platform.OS === 'ios'` conditional. Android uses default back button.

### Back Button (Chevron Only on iOS)

**For sub-screens with back navigation on iOS**, use `headerBackVisible: false` and provide a custom `headerLeft` to ensure a chevron-only back button. Android uses the default back button behavior.

```tsx
import { Platform, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';

export default function Screen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Add Task',
          headerTitleAlign: 'center',
          ...(Platform.OS === 'ios' && {
            headerBackVisible: false, // Hide default back button on iOS only
            headerLeft: () => (
              <Pressable 
                onPress={() => router.back()}
                style={{ paddingHorizontal: 4 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {({ pressed }) => (
                  <ChevronLeft 
                    size={25} 
                    color={theme.colors.primary} 
                    strokeWidth={2.5}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            ),
          }),
        }}
      />
      {/* Your content */}
    </>
  );
}
```

### Title Alignment Rules

Follow iOS conventions for title alignment:

- **Root screens** (no back button): `headerTitleAlign: 'left'`
  - Example: Main "Tasks" screen, Settings screen
- **Sub-screens** (with back button): `headerTitleAlign: 'center'`
  - Example: "Add Task" screen, Detail screens

This creates the familiar iOS navigation pattern.

### Complete Example

Here's a complete example combining all concepts:

```tsx
import { Platform, Pressable, ScrollView, Text as RNText, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TaskListScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Tasks',
          headerLargeTitle: false,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17,
          },
          headerRight: () => (
            <Pressable 
              onPress={() => router.push('/add-task')}
              style={{ paddingHorizontal: 4 }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              {({ pressed }) => (
                <Plus 
                  size={25} 
                  color={theme.colors.primary} 
                  strokeWidth={2.5}
                  style={{ opacity: pressed ? 0.5 : 1 }} 
                />
              )}
            </Pressable>
          ),
        }}
      />
      <ScrollView
        className="flex-1 bg-background"
        contentInsetAdjustmentBehavior={Platform.OS === 'ios' ? 'automatic' : undefined}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: Math.max(insets.bottom, 32),
        }}>
        {/* Your content */}
      </ScrollView>
    </>
  );
}
```

### Common Pitfalls

**❌ DON'T:**
- Use `headerBlurEffect` property - it interferes with iOS transparency and makes headers appear solid (iOS applies blur automatically)
- Use custom button components (like `GlassButton`, `Button`) in headers - they add backgrounds, borders, and styling that looks non-native
- Use transparent headers on Android if you need header buttons - this causes `onPress` handlers to not fire (known React Navigation bug)
- Use `contentInsetAdjustmentBehavior` on Android - it's iOS-only and will be ignored
- Add manual padding (`paddingTop: insets.top + 60`) on Android when using solid headers - this creates huge spacing gaps
- Hardcode button colors like `#007AFF` - always use `theme.colors.primary` for theme adaptation
- Add both `SafeAreaView` and manual padding - this double-counts safe areas

**✅ DO:**
- Trust iOS native blur - just set `headerTransparent: true` without `headerBlurEffect` for automatic blur that adapts to light/dark mode
- Use plain `TouchableOpacity` or `Pressable` with native `Text` or Lucide icons
- Use platform-specific header transparency (transparent on iOS, solid on Android) for reliable button functionality
- Let React Navigation handle spacing automatically on Android with solid headers (no manual padding needed)
- Use `useTheme()` hook for theme-aware colors
- Follow iOS spacing conventions (4px for icons, 8px for text buttons)
- Keep icon sizes at 25px with 2.5 strokeWidth for consistency

## Animations and Gestures

### 🚨 CRITICAL: React Native Reanimated Setup

- **NEVER mix `Animated` from react-native with gesture-handler** - Always use `react-native-reanimated` APIs (`useSharedValue`, `useAnimatedStyle`, `withSpring`, `withTiming`).
- **Use `runOnJS()`** to call JavaScript functions from animation callbacks.
- **ALWAYS wrap app root with `GestureHandlerRootView`** in `_layout.tsx` - Required for bottom sheets, swipeable components, and any gesture-based UI. Without it, you'll get "GestureDetector must be used as a descendant of GestureHandlerRootView" errors. Must be outermost wrapper with `style={{ flex: 1 }}`.

**Setup Instructions:**
```tsx
// In app/_layout.tsx (REQUIRED)
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* All your other providers and components */}
    </GestureHandlerRootView>
  );
}
```

**See the BottomSheet section** for a complete _layout.tsx example with all providers configured correctly.

## Icons
- Never use icons other than Lucide icons unless specified by the user.
- Use `Icon` component from `components/ui/icon.tsx` for all icons.
- Import icon types from `lucide-react-native` (e.g., `import { PlusIcon } from 'lucide-react-native'`).

### Icon Colors in Buttons
- **CRITICAL**: Icons must have proper contrast with their immediate background.
- The `Icon` component defaults to `text-foreground`, which works for transparent/ghost backgrounds.
- **Primary/Destructive/Secondary buttons**: Use `className="text-primary-foreground"` for icons to ensure proper contrast against the button's colored background.
- **Outline/Ghost buttons**: The default `text-foreground` is usually correct since backgrounds are transparent or subtle.
- **Example**:

```tsx
// ✅ Correct - Primary button with contrasting icon
<Button>
  <Icon as={PlusIcon} className="text-primary-foreground" />
  <Text>Add Item</Text>
</Button>

// ✅ Correct - Ghost button with default color
<Button variant="ghost">
  <Icon as={SettingsIcon} />
</Button>

// ❌ Wrong - Primary button without proper icon color
<Button>
  <Icon as={PlusIcon} /> {/* Will be hard to see! */}
  <Text>Add Item</Text>
</Button>
```

### 🚨 CRITICAL: Using Lucide Icons Directly (Without Icon Wrapper)

When using Lucide icons directly from `lucide-react-native` (e.g., in navigation headers, Cards, or lists), **always use the `color` prop instead of `className`**:

- **Why**: Lucide icons in React Native don't support NativeWind className for colors reliably. You must use the native `color` prop.
- **For theme-aware colors**: Use `theme.colors.primary` or other theme colors from `useTheme()` hook.
- **Example contexts**: Navigation headers (`headerRight`, `headerLeft`), Card content, list items.

```tsx
import { useTheme } from '@react-navigation/native';
import { Users, Calendar } from 'lucide-react-native';

const theme = useTheme();

// ✅ CORRECT - Using color prop with theme colors
<Card>
  <CardContent>
    <Users size={24} color={theme.colors.primary} />
    <Text variant="h3" className="text-foreground">42</Text>
  </CardContent>
</Card>

// ✅ CORRECT - Navigation header icon
<Stack.Screen
  options={{
    headerRight: () => (
      <Plus size={25} color={theme.colors.primary} strokeWidth={2.5} />
    ),
  }}
/>

// ❌ WRONG - Using className for colors (doesn't work with Lucide)
<Card>
  <CardContent>
    <Users size={24} className="text-primary" /> {/* Won't display correct color! */}
  </CardContent>
</Card>
```

**Key differences:**
- `Icon` wrapper component (from `@/components/ui/icon.tsx`): Use `className` for colors
- Lucide icons directly (from `lucide-react-native`): Use `color` prop with theme colors

### General Icon Color Guidelines
- Icon colors should always contrast with their immediate background.
- Consider both light and dark mode when choosing colors.
- If the icon is inside a colored container (like a primary button), the icon needs to use the container's foreground color class.

## Building new components from primitives

- **Where to put them**: Reusable, cross-screen components go in `components/ui/`. If a component is only used by a single screen, keep it local to that screen in `app/`.

- **What they should do**:
  - Be presentational; no data fetching, navigation, or global state.
  - Accept `className`; forward native props to the underlying element.
  - Prefer controlled props for state (e.g., `value`, `onChange`); keep internal state minimal.
  - Keep APIs platform-agnostic; use `Platform.select` only when needed.

- **How to style**:
  - Use NativeWind classes and tokens from `lib/theme.ts`.
  - For variants, use `class-variance-authority (cva)` like in `Badge`.

- **Composition pattern**:
  - Prefer small composable parts over one huge component.
  - For compound components, export meaningful subcomponents (e.g., `EmptyState`, `EmptyStateIcon`, `EmptyStateTitle`).

- **Do not**:
  - Import from `app/`.
  - Contain business logic; put logic in `hooks/` or `context/` and pass via props.

- **Examples**:
  - `components/ui/empty-state.tsx`: icon + title + description + action slot.
  - `components/ui/banner.tsx`: dismissible banner with `variant` and optional `icon`.
  - `components/ui/form-field.tsx`: layout shell for label, hint, and error (no validation logic).

## UI Components Reference

All components in `components/ui/` are cross-platform, accept `className`, and use NativeWind styling. Import them using the `@/` alias (e.g., `@/components/ui/button`).

### Core Components

#### Button
Interactive pressable with variants. Wrap `Text` or `Icon` children.
- **Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **Sizes**: `default`, `sm`, `lg`, `icon`
- **Usage**: `<Button variant="default" size="lg"><Text>Click me</Text></Button>`
- **🚨 CRITICAL: Avoid excessive vertical padding** - Using large `py-*` values (e.g., `py-4` or higher) can cause text to disappear or be clipped. The Button component already has built-in padding from the size variants. If you need more height, use `py-1` or `py-2` at most, or rely on the `size` prop (`sm`, `default`, `lg`) instead.

#### Text
Styled text with semantic variants. Use for all text rendering.
- **Variants**: `default`, `h1`, `h2`, `h3`, `h4`, `p`, `lead`, `large`, `small`, `muted`, `blockquote`, `code`
- **Usage**: `<Text variant="h1">Title</Text>`
- **IMPORTANT**: The `h2` variant includes a built-in `border-b` separator. Avoid using `h2` in headers that already have their own border to prevent redundant separator lines. Instead, use custom text styling like `className="text-2xl font-semibold"` when the container already has a border.

#### Input
Single-line text input with consistent styling.
- **Usage**: `<Input placeholder="Enter text" value={value} onChangeText={setValue} />`

#### Textarea
Multi-line text input.
- **Usage**: `<Textarea placeholder="Description" value={text} onChangeText={setText} />`

#### Label
Accessible label for form inputs.
- **Usage**: `<Label nativeID="email">Email</Label><Input aria-labelledby="email" />`

#### Icon
Lucide icon wrapper. Pass icon component via `as` prop.
- **Usage**: `<Icon as={PlusIcon} className="text-primary-foreground" />`

### Layout & Containers

#### Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
Composable card layout with structured sections and multiple style variants.
- **Variants**: `default`, `outline`, `elevated`, `gradient`
- **Basic Usage**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{/* content */}</CardContent>
  <CardFooter>{/* actions */}</CardFooter>
</Card>
```
- **Variant Usage**:
```tsx
// Default card (standard with border)
<Card variant="default">
  <CardContent><Text>Standard card</Text></CardContent>
</Card>

// Outline card (transparent with border)
<Card variant="outline">
  <CardContent><Text>Outlined card</Text></CardContent>
</Card>

// Elevated card (no border, shadow only)
<Card variant="elevated">
  <CardContent><Text>Floating card</Text></CardContent>
</Card>

// Gradient card (colorful backgrounds)
<Card variant="gradient" gradientColors={['#8B5CF6', '#EC4899']}>
  <CardContent>
    <Text className="text-white">Purple to pink gradient!</Text>
  </CardContent>
</Card>
```
- **Gradient Props**:
  - `gradientColors`: `[string, string]` - Required array of two hex colors for gradient
  - `gradientStart`: `{ x: number; y: number }` - Gradient start point (default: `{x:0, y:0}`)
  - `gradientEnd`: `{ x: number; y: number }` - Gradient end point (default: `{x:1, y:1}`)
- **🚨 CRITICAL: Gradient card text color** - When using `variant="gradient"`, all text inside automatically becomes white for proper contrast. For custom text colors, add `className="text-white"` or other color classes to override.
- **🚨 CRITICAL: CardContent has built-in padding** - CardContent now has `px-4 py-4` (16px all around) built into the component. You should NOT add additional padding classes unless you need more spacing. The padding is already applied automatically.
- **🚨 CRITICAL: Maximum 2 cards horizontally** - Mobile screens are too narrow for 3+ cards side-by-side. Never place more than 2 cards in a horizontal row. For 3+ items, use a vertical stack or a 2-column grid layout.
- **Examples**:
```tsx
// ✅ CORRECT - CardContent has automatic padding
<Card>
  <CardContent>
    <Text>Content with built-in padding (16px all around)</Text>
  </CardContent>
</Card>

// ✅ CORRECT - Override padding if needed
<Card>
  <CardContent className="p-8">
    <Text>Custom larger padding</Text>
  </CardContent>
</Card>

// ✅ CORRECT - Gradient card with automatic white text
<Card variant="gradient" gradientColors={['#3B82F6', '#06B6D4']}>
  <CardContent>
    <Text className="text-white">Blue gradient card</Text>
  </CardContent>
</Card>

// ✅ CORRECT - Max 2 cards horizontally
<View className="flex-row gap-4">
  <Card className="flex-1">
    <CardContent><Text>Card 1</Text></CardContent>
  </Card>
  <Card className="flex-1">
    <CardContent><Text>Card 2</Text></CardContent>
  </Card>
</View>

// ❌ WRONG - 3 cards side-by-side is too cramped on mobile
<View className="flex-row gap-2">
  <Card className="flex-1">
    <CardContent><Text>Card 1</Text></CardContent>
  </Card>
  <Card className="flex-1">
    <CardContent><Text>Card 2</Text></CardContent>
  </Card>
  <Card className="flex-1">
    <CardContent><Text>Card 3</Text></CardContent>
  </Card>
</View>
```

#### Separator
Visual divider line.
- **Usage**: `<Separator />`

#### AspectRatio
Container that maintains aspect ratio.
- **Usage**: `<AspectRatio ratio={16 / 9}><Image source={...} /></AspectRatio>`

### Feedback Components

#### Alert, AlertTitle, AlertDescription
Inline notification with variants.
- **Variants**: `default`, `destructive`
- **Usage**:
```tsx
<Alert variant="default">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Message here</AlertDescription>
</Alert>
```

#### Toast (Toast Notifications vs Alert Dialogs)
Non-blocking animated notification that auto-dismisses. Use `ToastProvider` at app root and `useToast()` hook in screens.
- **When to use Toast**: Success confirmations, info messages, non-critical feedback that shouldn't interrupt user flow.
- **When to use Alert.alert()**: Errors requiring acknowledgment, confirmation prompts, validation failures needing user action.
- **Usage**:
```tsx
// In _layout.tsx
<ToastProvider>
  {/* Your app */}
</ToastProvider>

// In any screen
const { showToast } = useToast();
showToast('Food added to your log! 🎉'); // Auto-dismisses after 2.5s
```

#### Badge
Small label or status indicator.
- **Variants**: `default`, `secondary`, `destructive`, `outline`
- **Usage**: `<Badge variant="secondary"><Text>New</Text></Badge>`

#### Progress
Visual progress indicator.
- **Usage**: `<Progress value={60} max={100} />`

#### Skeleton
Loading placeholder that mimics content shape.
- **Usage**: `<Skeleton className="h-12 w-full" />`

### Form Controls

#### Checkbox
Toggle checkbox with label support.
- **IMPORTANT**: By default, only the small checkbox is tappable. For better UX, wrap in `Pressable` with `pointerEvents="none"` on the inner View to make the entire row clickable.
- **Usage**:
```tsx
// ✅ Basic usage
<Checkbox checked={checked} onCheckedChange={setChecked} />

// ✅ RECOMMENDED - Entire row tappable with label
<Pressable onPress={() => setChecked(!checked)}>
  <View pointerEvents="none" className="flex-row items-center gap-2">
    <Checkbox checked={checked} onCheckedChange={setChecked} />
    <Label>Agree to terms</Label>
  </View>
</Pressable>
```

#### Switch
Toggle switch control.
- **Usage**: `<Switch checked={enabled} onCheckedChange={setEnabled} />`

#### Slider
Continuous value slider control using `@react-native-community/slider`.
- **Import**: `import { Slider } from '@/components/nativewindui/Slider';`
- **Usage**:
```tsx
const [value, setValue] = React.useState(0.5);

return (
  <Slider
    value={value}
    onValueChange={setValue}
    minimumValue={0}
    maximumValue={1}
    step={0.1}
  />
);
```
- **Props**:
  - `value`: Current slider value
  - `onValueChange`: Callback when value changes
  - `minimumValue`: Minimum value (default: 0)
  - `maximumValue`: Maximum value (default: 1)
  - `step`: Step increment for discrete values
  - `disabled`: Disable interaction
  - `thumbTintColor`: Color of the thumb (draggable part)
  - `minimumTrackTintColor`: Color of track left of thumb
  - `maximumTrackTintColor`: Color of track right of thumb
- **Common uses**: Volume controls, brightness settings, range filters, numeric value adjustments

#### RadioGroup, RadioGroupItem
Mutually exclusive option selector.
- **IMPORTANT**: By default, only the small radio circle is tappable. For better UX, wrap each row in `Pressable` with `pointerEvents="none"` on the inner View to make the entire row clickable.
- **Usage**:
```tsx
// ❌ WRONG - Only the tiny circle is tappable
<RadioGroup value={value} onValueChange={setValue}>
  <View className="flex-row items-center gap-2">
    <RadioGroupItem value="option1" />
    <Label>Option 1</Label>
  </View>
</RadioGroup>

// ✅ CORRECT - Entire row is tappable
<RadioGroup value={value} onValueChange={setValue}>
  <Pressable onPress={() => setValue('option1')}>
    <View pointerEvents="none" className="flex-row items-center gap-2">
      <RadioGroupItem value="option1" />
      <Label>Option 1</Label>
    </View>
  </Pressable>
</RadioGroup>
```

#### Select, SelectTrigger, SelectValue, SelectContent, SelectItem
Native select dropdown with custom styling.
- **Usage**:
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1" label="Option 1" />
  </SelectContent>
</Select>
```

#### DatePicker
Native date and time picker component.
- **Modes**: `date`, `time`, `datetime`
- **Import**: `import { DatePicker } from '@/components/nativewindui/DatePicker';`
- **IMPORTANT**: Show the DatePicker directly in forms. Do NOT wrap it in a button/pressable that then shows the picker - this adds unnecessary steps.
- **🚨 CRITICAL: NEVER add "Clear Date" buttons** - Do not add buttons to clear the date picker value. If a date is optional, use conditional rendering to show/hide the picker or let the user change the date naturally.
- **Styling**: Supports `className` prop. Use `className="mt-2"` for consistent spacing with other form inputs when placed below a Label.
- **Usage**:
```tsx
const [date, setDate] = React.useState(new Date());

return (
  <View>
    <Label>Due Date (Optional)</Label>
    <DatePicker
      value={date}
      mode="date"
      onChange={(ev) => {
        setDate(new Date(ev.nativeEvent.timestamp));
      }}
      className="mt-2"
    />
  </View>
);

// ❌ WRONG - Adds unnecessary tap
<Pressable onPress={() => setShowPicker(true)}>
  <Text>Select Date</Text>
</Pressable>
{showPicker && <DatePicker ... />}

// ❌ WRONG - Never add clear date buttons
{date && (
  <Button variant="ghost" size="sm" onPress={() => setDate(undefined)}>
    <Text>Clear date</Text>
  </Button>
)}
```
- **Props**: Accepts all standard `@react-native-community/datetimepicker` props plus `className` for styling
- **Platform differences**: Renders natively on iOS and Android with platform-specific UI

#### CalendarView
Generic, reusable monthly calendar component for **visualizing date-specific events** in a calendar format rather than a list view.
- **Purpose**: Display tasks, events, appointments, or any dated items in a month grid with visual indicators. Shows what's happening on each day at a glance.
- **NOT for date selection**: This is a visualization/overview component, not a date picker. Use `DatePicker` component for selecting dates in forms.
- **Import**: `import { CalendarView } from '@/components/ui/calendar-view';`
- **🚨 CRITICAL: Do NOT wrap in Card** - CalendarView is already styled as a card component with borders, padding, and rounded corners. Never place it inside a `<Card>` wrapper as this creates double borders and excessive padding.
- **Key Features**:
  - Generic type support - works with any dated items (tasks, events, appointments, etc.)
  - Configurable indicators - show multiple visual indicators per day based on custom predicates
  - Customizable legend - control which legend items to display
  - Interactive date tapping to view details (via `onDateSelect` callback)
  - Month navigation with arrows
  - Haptic feedback on interactions
- **Usage with Tasks** (overview screen showing what's due when):
```tsx
// ✅ CORRECT - CalendarView standalone (already a card)
<CalendarView
  items={tasks}
  getItemDate={(task) => task.dueDate}
  indicators={[
    { predicate: (task) => !task.completed, color: 'bg-red-500' },
    { predicate: (task) => task.completed, color: 'bg-green-500' }
  ]}
  legendItems={[
    { color: 'bg-red-500', label: 'Active' },
    { color: 'bg-green-500', label: 'Completed' }
  ]}
  onDateSelect={(date) => {
    // Show tasks for this date in a bottom sheet or navigate to detail view
    const tasksOnDate = tasks.filter(t => isSameDay(t.dueDate, date));
    showTasksBottomSheet(tasksOnDate);
  }}
  className="mb-6"
/>

// ❌ WRONG - Never wrap CalendarView in Card
<Card>
  <CardContent>
    <CalendarView items={tasks} {...props} />
  </CardContent>
</Card>
```
- **Usage with Events** (monthly overview of meetings and deadlines):
```tsx
interface Event {
  id: string;
  startDate: Date;
  type: 'meeting' | 'deadline' | 'reminder';
  priority: 'high' | 'medium' | 'low';
}

<CalendarView<Event>
  items={events}
  getItemDate={(event) => event.startDate}
  indicators={[
    { predicate: (e) => e.type === 'meeting', color: 'bg-blue-500' },
    { predicate: (e) => e.type === 'deadline', color: 'bg-red-500' },
    { predicate: (e) => e.priority === 'high', color: 'bg-yellow-500' }
  ]}
  legendItems={[
    { color: 'bg-blue-500', label: 'Meetings' },
    { color: 'bg-red-500', label: 'Deadlines' },
    { color: 'bg-yellow-500', label: 'High Priority' }
  ]}
  onDateSelect={(date) => {
    // Navigate to day view or show events in a modal
    router.push(`/events/day/${date.toISOString()}`);
  }}
/>
```
- **Props**:
  - `items: T[]` - Array of items with dates (generic type)
  - `getItemDate: (item: T) => Date | undefined` - Callback to extract date from each item
  - `indicators: CalendarIndicator<T>[]` - Array of indicator configs with predicate functions and colors
  - `legendItems: CalendarLegendItem[]` - Array of legend items to display below the calendar
  - `onDateSelect: (date: Date) => void` - Callback when a date is tapped (typically used to show details for that day, filter a list, or navigate to a day view)
- **Indicator System**: Each indicator has a `predicate` function that tests if an item should display that indicator. Multiple indicators can show on the same day as small colored dots (wraps after 5 dots).
- **Legend Control**: The caller controls which legend items to display, allowing flexibility in showing all possible indicators or only relevant ones for the current context.
- **Visual States**:
  - Today's date: Filled primary background with contrasting text
  - Tapped date: Primary colored border (for viewing that day's details)
  - Days with items: Small colored dots below the day number based on active indicators
- **Use Cases**: Task overviews, event calendars, appointment scheduling views, habit trackers, booking availability displays
- **When to use CalendarView vs DatePicker**:
  - Use `CalendarView` when: Displaying overview of events/tasks across days, showing what's scheduled when, visualizing date-based data
  - Use `DatePicker` when: User needs to select a date for a form field (due date, birth date, appointment time, etc.)

### Overlay Components

#### Bottom Sheet Drag Handles
- **IMPORTANT**: Custom bottom sheets using Modal should include a drag handle indicator at the top (small horizontal bar) to signal they're dismissible by swiping down.
- **Exception**: Native bottom sheet libraries (e.g., `@gorhom/bottom-sheet`) handle this automatically.

#### BottomSheet (@gorhom/bottom-sheet)
Draggable bottom sheet with swipe-to-dismiss. Install: `npm install @gorhom/bottom-sheet`

- **🚨 CRITICAL: Required Setup - GestureHandlerRootView**
  - **MUST wrap your entire app** with `GestureHandlerRootView` in `_layout.tsx` as the outermost wrapper
  - **Without this, you'll get the error**: `"GestureDetector must be used as a descendant of GestureHandlerRootView"`
  - **This wrapper is required** for ALL bottom sheets, swipeable components, and gesture-based UI to work
  - **Must be outermost wrapper** with `style={{ flex: 1 }}`
  
**Required _layout.tsx Setup:**
```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// ... other imports

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Rest of your providers and Stack */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

- **🚨 CRITICAL: Use theme background colors** - NEVER hardcode background colors. Always use the exact background color from `@/lib/theme` to match the app's background seamlessly.
- **Basic Usage**:
```tsx
import { useRef, useCallback, useMemo } from 'react';
import { useColorScheme } from 'nativewind';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const { colorScheme } = useColorScheme();
// Use app's actual background colors - light: #ffffff (100%), dark: #0a0a0a (3.9%)
const backgroundColor = colorScheme === 'dark' ? '#0a0a0a' : '#ffffff';
const bottomSheetRef = useRef<BottomSheet>(null);
const snapPoints = useMemo(() => ['70%'], []);

const renderBackdrop = useCallback((props) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />
), []);

// Open: bottomSheetRef.current?.snapToIndex(0)
// Close: bottomSheetRef.current?.close()

<BottomSheet
  ref={bottomSheetRef}
  index={-1}
  snapPoints={snapPoints}
  enablePanDownToClose={true}
  backdropComponent={renderBackdrop}
  handleIndicatorStyle={{ backgroundColor: '#9ca3af', width: 48, height: 4 }}
  backgroundStyle={{ 
    backgroundColor, // Use theme background, NOT hardcoded colors
    borderRadius: 24 
  }}>
  <BottomSheetView className="flex-1 px-6 pb-8">
    {/* Content */}
  </BottomSheetView>
</BottomSheet>
```

- **🚨 CRITICAL: Bottom Sheets with Keyboard Input (Forms)**
When the bottom sheet contains input fields that trigger the keyboard, you MUST:
  1. Use `BottomSheetScrollView` instead of `BottomSheetView`
  2. Add keyboard behavior props to the BottomSheet
  3. Track keyboard height with listeners
  4. Dynamically adjust bottom padding to allow scrolling past the keyboard

**Quick Reference - Copy This Pattern**:
```tsx
// 1. Add imports
import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

// 2. Add state and keyboard listener
const [keyboardHeight, setKeyboardHeight] = useState(0);

useEffect(() => {
  const showListener = Keyboard.addListener('keyboardDidShow', (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  });
  const hideListener = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardHeight(0);
  });
  return () => {
    showListener.remove();
    hideListener.remove();
  };
}, []);

// 3. Add these props to BottomSheet
keyboardBehavior="extend"
keyboardBlurBehavior="restore"
android_keyboardInputMode="adjustResize"

// 4. Use BottomSheetScrollView with dynamic padding
<BottomSheetScrollView
  contentContainerStyle={{ paddingBottom: 32 + keyboardHeight }}
  keyboardShouldPersistTaps="handled">
```

**Complete Example with Keyboard Handling**:
```tsx
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useColorScheme } from 'nativewind';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const { colorScheme } = useColorScheme();
const backgroundColor = colorScheme === 'dark' ? '#0a0a0a' : '#ffffff';
const [keyboardHeight, setKeyboardHeight] = useState(0);

// Track keyboard height
React.useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  });
  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardHeight(0);
  });

  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
}, []);

<BottomSheet
  ref={bottomSheetRef}
  index={-1}
  snapPoints={snapPoints}
  enablePanDownToClose={true}
  backdropComponent={renderBackdrop}
  handleIndicatorStyle={{ backgroundColor: '#9ca3af', width: 48, height: 4 }}
  backgroundStyle={{ backgroundColor, borderRadius: 24 }}
  keyboardBehavior="extend"
  keyboardBlurBehavior="restore"
  android_keyboardInputMode="adjustResize">
  <BottomSheetScrollView 
    className="flex-1 px-6"
    contentContainerStyle={{ paddingTop: 8, paddingBottom: 32 + keyboardHeight }}
    keyboardShouldPersistTaps="handled">
    {/* Your form inputs */}
    <Input placeholder="Enter text" />
    <Button onPress={handleSubmit}>
      <Text>Submit</Text>
    </Button>
  </BottomSheetScrollView>
</BottomSheet>
```

**Why this is necessary**:
- Without `BottomSheetScrollView`, content cannot scroll when keyboard appears
- `keyboardBehavior="extend"` makes the sheet extend above the keyboard
- Keyboard height tracking adds dynamic padding so you can scroll to see buttons at the bottom
- `keyboardShouldPersistTaps="handled"` lets you tap buttons without dismissing keyboard first

- **Key Points**: Use `BottomSheetView` for static content, `BottomSheetScrollView` for forms with inputs. MUST use app's background colors from theme (not random grays). Memoize `snapPoints` and `renderBackdrop`.

#### 🚨 CRITICAL: Input AutoFocus in Bottom Sheets
- **NEVER use `autoFocus` prop on inputs inside bottom sheets** - This causes the keyboard to open immediately when the app loads, even when the sheet is closed (`index={-1}`).
- **Problem**: Even though the bottom sheet starts closed, the Input component is already mounted in the component tree. Setting `autoFocus={true}` triggers keyboard opening on app load.
- **Solution**: Use a ref and the bottom sheet's `onChange` callback to focus the input only when the sheet actually opens.

**Example**:
```tsx
// ❌ WRONG - Keyboard opens on app load
<Input
  placeholder="Task title"
  value={title}
  onChangeText={setTitle}
  autoFocus  // This is the problem!
/>

// ✅ CORRECT - Focus only when sheet opens
import { useRef, useCallback } from 'react';
import { TextInput } from 'react-native';

const inputRef = useRef<TextInput>(null);

const handleSheetChanges = useCallback((index: number) => {
  if (index === 0) {
    // Sheet is open, focus after a small delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }
}, []);

<BottomSheet
  ref={bottomSheetRef}
  index={-1}
  snapPoints={snapPoints}
  onChange={handleSheetChanges}  // Add this handler
  // ... other props
>
  <BottomSheetScrollView>
    <Input
      ref={inputRef}  // Add ref
      placeholder="Task title"
      value={title}
      onChangeText={setTitle}
      // NO autoFocus prop!
    />
  </BottomSheetScrollView>
</BottomSheet>
```

**Why this matters**: Unexpected keyboard popups on app launch create a poor first impression and confuse users. This pattern ensures inputs only focus when the user explicitly opens the form.

#### Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
Modal dialog with composable sections.
- **Usage**:
```tsx
<Dialog>
  <DialogTrigger><Button><Text>Open</Text></Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

#### AlertDialog
Confirmation dialog for destructive actions. Similar API to Dialog.

#### Popover, PopoverTrigger, PopoverContent
Floating content anchored to trigger element.
- **Usage**:
```tsx
<Popover>
  <PopoverTrigger><Button><Text>Open</Text></Button></PopoverTrigger>
  <PopoverContent><Text>Content</Text></PopoverContent>
</Popover>
```

#### Tooltip, TooltipTrigger, TooltipContent
Hover/press hint for UI elements.
- **Usage**:
```tsx
<Tooltip>
  <TooltipTrigger><Icon as={InfoIcon} /></TooltipTrigger>
  <TooltipContent><Text>Help text</Text></TooltipContent>
</Tooltip>
```

### Menu Components

#### ActionSheet
Native iOS-style action sheet using `@expo/react-native-action-sheet`.
- **Setup Required**: Must wrap app root with `ActionSheetProvider` in `_layout.tsx`
- **Import**: `import { useActionSheet } from '@expo/react-native-action-sheet';`
- **Usage**:
```tsx
const { showActionSheetWithOptions } = useActionSheet();

const handlePress = () => {
  const options = ['Edit', 'Delete', 'Cancel'];
  const destructiveButtonIndex = 1;
  const cancelButtonIndex = 2;

  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      title: 'Choose an action',
      message: 'What would you like to do?',
    },
    (selectedIndex?: number) => {
      // Handle selection
      switch (selectedIndex) {
        case 0:
          // Edit
          break;
        case 1:
          // Delete
          break;
      }
    }
  );
};
```
- **Props**:
  - `options`: Array of action button labels
  - `cancelButtonIndex`: Index of cancel button
  - `destructiveButtonIndex`: Index or array of destructive button indices
  - `disabledButtonIndices`: Array of disabled button indices
  - `title`: Optional title text
  - `message`: Optional description text
- **Platform differences**: Native bottom sheet on iOS, dialog on Android
- **Note**: Requires development build; does not work in Expo Go

#### Share (Native API)
Native share dialog for sharing content using React Native's built-in Share API.
- **Import**: `import { Share } from 'react-native';`
- **No setup required** - Works out of the box on both iOS and Android
- **Usage**:
```tsx
const handleShare = async () => {
  try {
    const result = await Share.share({
      message: 'Check out this awesome app!',
      url: 'https://example.com', // iOS only
      title: 'Share Title', // Android only
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type (iOS)
        console.log(`Shared via ${result.activityType}`);
      } else {
        // Shared successfully
        console.log('Shared successfully');
      }
    } else if (result.action === Share.dismissedAction) {
      // User dismissed the share dialog
      console.log('Share dismissed');
    }
  } catch (error) {
    console.error('Error sharing:', error.message);
  }
};
```
- **Props**:
  - `message`: Message to share (required on Android, optional on iOS if url is provided)
  - `url`: URL to share (iOS only)
  - `title`: Dialog title (Android only)
- **Platform differences**: iOS shows native share sheet with app icons, Android shows share dialog with installed apps

#### DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
Action menu triggered by button.
- **Usage**:
```tsx
<DropdownMenu>
  <DropdownMenuTrigger><Button><Text>Menu</Text></Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem><Text>Action 1</Text></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem><Text>Action 2</Text></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### ContextMenu
Right-click/long-press context menu. Similar API to DropdownMenu.

#### Menubar
Horizontal menu bar with nested menus. Similar structure to DropdownMenu.

### Navigation Components

#### Tabs, TabsList, TabsTrigger, TabsContent
Tab-based content switcher.
- **Usage**:
```tsx
<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="tab1"><Text>Tab 1</Text></TabsTrigger>
    <TabsTrigger value="tab2"><Text>Tab 2</Text></TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">{/* content */}</TabsContent>
</Tabs>
```

#### CustomHeader
Animated, customizable header component with integrated scrollable content for screens that need per-page header customization.
- **Import**: `import { CustomHeader } from '@/components/ui/custom-header';`
- **🚨 CRITICAL: REQUIRED for tab screens**: You MUST use `CustomHeader` for screens inside tab navigators (like `(tabs)/_layout.tsx`). The root Stack header cannot be configured per-tab - it applies globally to all tabs. Even if tabs only differ in title and action buttons, you need `CustomHeader` to have different configurations per tab.
- **When to use**: 
  - **Tab layouts** - Each tab needs its own title, buttons, or collapse behavior (most common use case)
  - **Grouped routes** - Any route group where different screens need different header configurations
  - **Custom animations** - When you need scroll-based header animations not available in native headers
- **When NOT to use**: For simple single-Stack apps WITHOUT tabs, prefer using the native Stack header configuration (`Stack.Screen options={{ headerShown: true }}`) as documented in the "Native iOS-Style Navigation Headers" section. The native header is more performant and provides platform-specific behavior out of the box.
- **💡 Recommended: Use gradient backgrounds** - The `background="gradient"` option creates a modern, polished look with a smooth fade effect. This is the recommended default for most screens unless you have a specific design reason to use solid or transparent.
- **Key Features**:
  - Multiple size variants (small, medium, large)
  - Alignment options (left, center)
  - Background styles (solid, transparent, gradient with customizable colors)
  - Collapse modes on scroll (none, shrink, hide, compact)
  - Configurable buttons (back button, left button, right buttons with icon or iconCircle styles)
  - Integrated animated scroll view with safe area handling
  - Haptic feedback support
- **🚨 CRITICAL: No Extra Wrapper Views**: CustomHeader has an integrated scroll view. Your content should go directly inside without extra wrapper Views. Adding unnecessary wrappers can cause JSX syntax errors with mismatched closing tags.
- **Usage**:
```tsx
import { CustomHeader } from '@/components/ui/custom-header';
import { Settings, Share2 } from 'lucide-react-native';

export default function Screen() {
  return (
    <CustomHeader
      title="My Screen"
      size="large"
      align="left"
      background="gradient"
      collapseMode="shrink"
      showBackButton
      rightButtons={[
        {
          icon: Settings,
          onPress: () => router.push('/settings'),
          style: 'icon',
          accessibilityLabel: 'Settings',
        },
        {
          icon: Share2,
          onPress: handleShare,
          style: 'iconCircle',
          accessibilityLabel: 'Share',
        },
      ]}>
      {/* Your scrollable content - goes directly inside */}
      <View className="gap-6 py-6">
        <Text>Content here</Text>
      </View>
    </CustomHeader>
  );
}

// ❌ WRONG - Don't add extra wrapper Views
export default function WrongScreen() {
  return (
    <CustomHeader title="My Screen">
      <View>  {/* ❌ Unnecessary wrapper */}
        <View className="gap-6 py-6">
          <Text>Content</Text>
        </View>
      </View>  {/* ❌ Extra closing tag causes JSX errors */}
    </CustomHeader>
  );
}

// ✅ CORRECT - Content goes directly inside
export default function CorrectScreen() {
  return (
    <CustomHeader title="My Screen">
      <View className="gap-6 py-6">
        <Text>Content</Text>
      </View>
    </CustomHeader>
  );
}
```
- **Props**:
  - `title`: Header title text
  - `size`: `'small' | 'medium' | 'large'` (default: `'large'`)
  - `align`: `'left' | 'center'` (default: `'left'`)
  - `background`: `'transparent' | 'solid' | 'gradient'` (default: `'solid'`)
  - `collapseMode`: `'none' | 'shrink' | 'hide' | 'compact'` (default: `'none'`)
  - `showBackButton`: Show chevron back button (default: `false`)
  - `onBackPress`: Custom back button handler (defaults to `router.back()`)
  - `leftButton`: Single left button configuration (HeaderButton object)
  - `rightButtons`: Array of right button configurations (up to 4 buttons)
  - `gradientColors`: Custom gradient colors as `[startColor, endColor]` (defaults to theme background to transparent)
  - `className`: Additional header styles
  - `contentClassName`: Additional content container styles
- **HeaderButton Interface**:
  - `icon`: Lucide icon component
  - `onPress`: Button press handler
  - `style`: `'icon' | 'iconCircle'` (plain icon or icon with circular background)
  - `accessibilityLabel`: Accessibility label for screen readers
- **Collapse Behaviors**:
  - `none`: Header stays static
  - `shrink`: Title font size shrinks on scroll (large size only)
  - `hide`: Header slides up and fades out on scroll down, reappears on scroll up
  - `compact`: Header padding reduces on scroll
- **Platform Considerations**: Automatically handles safe area insets and uses `contentInsetAdjustmentBehavior` on iOS for proper content positioning.

#### 🚨 CRITICAL: Centering Empty States in CustomHeader

**Problem**: Empty state screens (like "No Items Yet") inside `CustomHeader` don't center vertically when using `flex-1` because the content is inside an integrated ScrollView.

**Solution**: Calculate the proper height for the empty state container using screen dimensions and safe area insets. This ensures the empty state is perfectly centered on the screen.

**Pattern to Use in ALL Apps**:

```tsx
import { View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomHeader } from '@/components/ui/custom-header';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const { items, isLoading } = useContext();

  // Calculate height for centering empty state (screen height minus header and tab bar)
  const screenHeight = Dimensions.get('window').height;
  const emptyStateHeight = screenHeight - insets.top - insets.bottom - 200; // 200 accounts for header + tab bar

  return (
    <CustomHeader
      title="My Items"
      size="large"
      background="gradient"
      rightButtons={[/* ... */]}>
      {isLoading ? (
        <View style={{ height: emptyStateHeight }} className="justify-center items-center">
          <Text className="text-muted-foreground">Loading...</Text>
        </View>
      ) : items.length === 0 ? (
        <View style={{ height: emptyStateHeight }} className="justify-center items-center px-6">
          <Icon size={48} color={theme.colors.primary} />
          <Text className="text-lg font-semibold text-foreground text-center mb-2">
            No Items Yet
          </Text>
          <Text className="text-sm text-muted-foreground text-center mb-6">
            Create your first item to get started
          </Text>
          <Button onPress={() => router.push('/create')}>
            <Text>Create Item</Text>
          </Button>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          scrollEnabled={false}
        />
      )}
    </CustomHeader>
  );
}
```

**Key Points**:
- **ALWAYS use this pattern** for empty states in CustomHeader screens across all apps
- Use `style={{ height: emptyStateHeight }}` instead of `className="flex-1"`
- The magic number `200` accounts for typical header height (~100-120px) + tab bar height (~80-100px). Adjust if your app has different dimensions.
- Apply the same height to both loading and empty states for consistency
- This creates a polished, professional look with perfectly centered content

**Why This Works**:
- `Dimensions.get('window').height` gets the full viewport height
- Subtracting safe area insets accounts for notches/status bars
- Subtracting 200px accounts for header and tab bar space
- The result is the exact height needed to center content in the visible area

```tsx
// ❌ WRONG - Using flex-1 doesn't work in CustomHeader's ScrollView
<View className="flex-1 justify-center items-center">
  <Text>Not centered!</Text>
</View>

// ✅ CORRECT - Using calculated height centers perfectly
<View style={{ height: emptyStateHeight }} className="justify-center items-center">
  <Text>Perfectly centered!</Text>
</View>
```

### Display Components

#### Avatar, AvatarImage, AvatarFallback
User avatar with fallback support.
- **Usage**:
```tsx
<Avatar>
  <AvatarImage source={{ uri: url }} />
  <AvatarFallback><Text>JD</Text></AvatarFallback>
</Avatar>
```

#### HoverCard
Rich preview card on hover/press. Similar API to Popover.

### Collapsible Components

#### Accordion, AccordionItem, AccordionTrigger, AccordionContent
Expandable content sections.
- **Usage**:
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger><Text>Section 1</Text></AccordionTrigger>
    <AccordionContent>{/* content */}</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Collapsible, CollapsibleTrigger, CollapsibleContent
Simple show/hide content wrapper.
- **Usage**:
```tsx
<Collapsible>
  <CollapsibleTrigger><Button><Text>Toggle</Text></Button></CollapsibleTrigger>
  <CollapsibleContent>{/* hidden content */}</CollapsibleContent>
</Collapsible>
```

#### Toggle, ToggleGroup
On/off button or grouped toggle buttons.
- **Usage**: `<Toggle pressed={pressed} onPressedChange={setPressed}><Text>Bold</Text></Toggle>`

### General Usage Notes
- All components support the `className` prop for custom styling
- Use composition: nest `Text` and `Icon` inside interactive components
- Check component-specific props by reading the source files in `components/ui/`

## Common Import Patterns

| Package | Import Type | Correct Pattern |
|---------|-------------|-----------------|
| `@react-native-async-storage/async-storage` | Default | `import AsyncStorage from '...'` (NOT `import * as`) |
| `@gorhom/bottom-sheet` | Default + Named | `import BottomSheet, { BottomSheetView } from '...'` |
| `react-native-gesture-handler` | Named | `import { GestureHandlerRootView } from '...'` (wrap app root in _layout.tsx) |
| `react-native-safe-area-context` | Named | `import { SafeAreaView } from '...'` (NOT from `react-native`) |
| `expo-router` | Named | `import { Stack, useRouter } from '...'` (NO `as any` casts) |
| `lucide-react-native` | Named | Use `color` prop, not `className` for colors |

**Key rule**: If you get runtime "not a function" errors, check your import syntax (default vs named vs namespace).

**Critical Setup Requirements:**
- **GestureHandlerRootView**: MUST wrap entire app in `_layout.tsx` for bottom sheets and gestures to work. Without it: `"GestureDetector must be used as a descendant of GestureHandlerRootView"` error.
- **SafeAreaProvider**: Required at app root for safe area support. Without it: insets will be 0 and content hidden under notches.
