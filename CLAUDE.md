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