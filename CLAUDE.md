## Folder structure and responsibilities

Use this structure when adding or modifying code. Keep modules small, composable, and placed by responsibility. Import with the `@` alias from the repo root (e.g., `@/components/ui/button`).

### app

- **Purpose**: Route-driven screens and layouts (Expo Router). Page-level composition only.
- **Contains**: Screens, `_layout.tsx`, `+html.tsx`, `+not-found.tsx`, screen-specific loaders/actions.
- **Put here**: Navigation, screen composition, local screen state, wiring UI primitives and hooks.
- **Avoid**: Reusable primitives, global state, generic hooks, low-level utilities.

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

## Theme isolation for micro apps

Micro apps are rendered inside a super app. The super app controls its own theme (NativeWind global color scheme and navigation theme). Micro apps MUST NOT read or mutate the host’s global theme. Theme changes inside a micro app must be isolated to the micro app subtree.

Note: NativeWind does not export a `Theme` provider. Use the provided `MicroThemeProvider` and runtime variable overrides instead.

### Rules (must follow)

- Do NOT call `toggleColorScheme()` or `setColorScheme()` from `nativewind` inside the micro app. These mutate the global scheme and will flip the host theme.
- Do NOT rely on `dark:` utility variants for dynamic theming in the micro app. `dark:` uses the global scheme; it will not follow the micro app’s local toggle.
- DO use token-based classes (`bg-background`, `text-foreground`, `border-border`, etc.) everywhere. These resolve to CSS variables that we override locally per micro app.
- DO wrap the micro app root with `MicroThemeProvider` and keep it in place.
  - File: `providers/micro-theme.tsx`
  - It sets subtree-scoped CSS variables via `vars()` from `nativewind`, without touching the global scheme.
  - It exposes `useMicroTheme()` with `scheme`, `setScheme`, `toggle`, and `variableStyle` for local toggles and variable application.
- Keep `:root` and `.dark:root` tokens in `global.css`. They act as defaults; the provider overrides variables inside the micro subtree at runtime.
- Do NOT modify `host-root.tsx` other than to keep the existing wrapper usage. It’s managed and required for routing.

### How to implement theming in micro apps

- Wrap the app subtree (already done) with `MicroThemeProvider` to scope tokens.
- Apply `variableStyle` from `useMicroTheme()` to the top-level screen container together with `bg-background` so tokens resolve with the current local scheme:

```tsx
import { useMicroTheme } from '@/providers/micro-theme';

export default function Screen() {
  const { variableStyle } = useMicroTheme();
  return (
    <View className="bg-background flex-1" style={variableStyle}>
      {/* ... */}
    </View>
  );
}
```

- For containers that should reflect the background, add `bg-background` (and `text-foreground` if appropriate). Views default to transparent, so explicitly set background where needed (screen roots, cards, etc.).
- Avoid hard-coded colors. Always use design tokens mapped in:
  - `global.css` (CSS variables),
  - `tailwind.config.js` (color maps like `background: 'hsl(var(--background))'`),
  - `lib/theme.ts` (JS theme object if needed for non-NativeWind consumers).

### Local toggle usage

- Use `useMicroTheme()` to drive the toggle button inside the micro app:
  - Call `toggle()` to flip between `light` and `dark`.
  - Use `scheme` to conditionally render icons or assets.
- Do NOT call `useColorScheme()` from `nativewind` to mutate global state. You may read it once for initial default only (the provider already handles this).

### When components don’t update on toggle

- If a component doesn’t react to the micro toggle, it likely:
  - Uses `dark:` utilities (global scheme) instead of token classes. Replace with token classes (e.g., `bg-background`, `text-muted-foreground`).
  - Lacks an explicit background; add `bg-background` on the container or screen root, and ensure `style={variableStyle}` is applied at the screen root.
  - Uses inline styles or hard-coded colors; replace with token classes or map to tokens.

### Changing colors (where to edit)

- Global defaults
  - Edit CSS variables in `global.css` under `:root` (light) and `.dark:root` (dark).
  - These are the fallback values when no micro override is present.

- Micro app-scoped overrides (local)
  - Edit `LIGHT_VARS` and `DARK_VARS` in `providers/micro-theme.tsx`.
  - These override the same variables at runtime for the micro subtree via `vars()`.
  - Keep these values in sync with `global.css` 

- Tailwind color mapping (already wired)
  - `tailwind.config.js` maps Tailwind tokens to CSS variables, e.g. `background: 'hsl(var(--background))'`.
  - No change is required when you only tweak colors; add mappings only if you introduce new tokens.

- JS consumers (non-NativeWind)
  - Update `lib/theme.ts` in `THEME.light` and `THEME.dark` so non-NativeWind consumers (e.g., navigation, charts) get the same colors.
  - Keep these in sync with `global.css` and the micro provider vars.

- Precedence and usage
  - Micro vars from `MicroThemeProvider` take precedence within the micro app subtree.
  - `:root` / `.dark:root` are global defaults outside the micro subtree (host).
  - Components should always use token classes (`bg-background`, `text-foreground`, etc.), not hard-coded colors unless necessary.
