# Project Constitution — Excalidraw

Governance principles derived from the Excalidraw codebase. These guide all AI-assisted development within this repository.

---

## Code Patterns

### Type Safety First

- **Strict TypeScript** is mandatory (`"strict": true` in tsconfig.json). All code must pass `yarn test:typecheck` with zero errors.
- Use **branded types** for domain identifiers (e.g., `type SocketId = string & { _brand: "SocketId" }`, `type FileId = string & { _brand: "FileId" }`).
- Use **discriminated unions** and type guards for runtime type narrowing — never use `any` without explicit validation.
- Enforce **separate type imports** (`import type { Foo }` on its own line, not mixed with value imports). This is an ESLint error-level rule (`@typescript-eslint/consistent-type-imports`).

### Functional Paradigm

- Prefer **functional components with hooks** over class components. The main `App` class component is a legacy exception, not a pattern to follow.
- Use **pure functions** for data transformations. Avoid side effects outside of hooks and event handlers.
- Favor **immutability**: deep-copy elements before mutation, use spread operators for state updates, prefer `readonly` types where applicable.

### Naming Conventions

- **camelCase** for variables, functions, and file names (utility modules).
- **PascalCase** for React components, types, interfaces, and component file names.
- **UPPER_SNAKE_CASE** for constants (e.g., `CURSOR_TYPE`, `POINTER_BUTTON`).
- Commit messages: **lowercase imperative mood** with conventional commit prefixes (`feat`, `fix`, `chore`, `docs`) and optional scope (e.g., `feat(editor): implement feature`).

### Import Discipline

- Use **path alias imports** for cross-package references: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`, `@excalidraw/excalidraw`.
- **Never import from barrel files** (`index.ts`) in the excalidraw package — import from specific modules.
- Import order is enforced by ESLint: builtin > external > internal > parent > sibling > index > object > type.
- Jotai atoms must be imported from app-specific wrapper modules (`editor-jotai`, `app-jotai`), not directly from `jotai`.

### Error Handling

- Use **custom error classes** with typed names and codes (`CanvasError`, `ExcalidrawError`, `RequestError`, `AbortError`).
- Prefer **try-finally** for cleanup in async operations.
- Do not swallow errors silently — propagate or handle explicitly.

---

## Testing Standards

### Framework & Environment

- **Vitest 3.0.6** with **jsdom** environment is the test runner.
- **@testing-library/react** and **@testing-library/jest-dom** for component testing.
- **vitest-canvas-mock** for Canvas API simulation.
- Global test setup lives in `setupTests.ts` at the repo root.

### Coverage Requirements

- Enforced minimum thresholds: **60% lines, 70% branches, 63% functions, 60% statements**.
- Run `yarn test:coverage` to verify. CI enforces these gates on PRs.

### Test Conventions

- Tests are **co-located** with source files (e.g., `clipboard.test.ts` alongside `clipboard.ts`).
- Shared test helpers live in `/tests/helpers/` (`api.ts`, `ui.ts`, `mocks.ts`, `polyfills.ts`).
- Use `describe("FeatureName", () => { it("should ...", () => {}) })` structure.
- Test names must be **descriptive and behavioral** (e.g., `"should parse JSON as plaintext if not excalidraw-api/clipboard data"`).
- Use `API.createElement()` and `Pointer` helpers for element and interaction testing.
- Always run `yarn test:update` before committing to update snapshots.

### Mocking Patterns

- Use `vi.mock()` with `importOriginal` for partial module mocks.
- Global mocks (DOM APIs, fonts, canvas) are centralized in `setupTests.ts` — do not duplicate.
- Use `fake-indexeddb` for IndexedDB tests, not custom stubs.

---

## Security Practices

### Environment Variables

- All client-facing env vars use the `VITE_APP_` prefix (Vite convention).
- Backend URLs, API keys, and feature flags are configured via environment variables — never hardcoded.
- Firebase configuration is separated between dev and prod environments.

### Input Validation

- Validate all external input at system boundaries using type guards and discriminated unions.
- Use dedicated validators: `validatePrompt()`, `embeddableURLValidator()`, MIME type checks via `isMemberOf()`.
- File type detection must use `isSupportedImageFileType()` — never trust file extensions alone.

### Data Integrity

- Use **capability detection** before accessing browser APIs (e.g., clipboard, fonts).
- Deep-copy elements before mutation to prevent unintended state corruption.
- URL validation is required for all user-provided or embedded URLs.

---

## Code Quality

### Linting & Formatting

- **ESLint** with `--max-warnings=0`: all warnings are treated as errors in CI.
- **Prettier** handles CSS, SCSS, JSON, Markdown, HTML, and YAML via shared config `@excalidraw/prettier-config`.
- Run `yarn fix` to auto-fix both formatting and linting issues before committing.

### TypeScript Strictness

- `strict: true` — includes strictNullChecks, noImplicitAny, strictFunctionTypes, etc.
- `forceConsistentCasingInFileNames: true` — cross-platform file name safety.
- `noFallthroughCasesInSwitch: true` — every switch case must break or return.
- `isolatedModules: true` — ensures compatibility with single-file transpilation (esbuild/Vite).

### Pre-commit Hooks

- **Husky** runs `lint-staged` on every commit:
  - JS/TS/TSX files: ESLint with `--max-warnings=0 --fix`
  - Other files: Prettier auto-format
- Do not bypass hooks (`--no-verify` is not acceptable).

### Bundle Size

- Bundle size is monitored via `size-limit` in CI — avoid unnecessary dependency additions.

---

## Governance

### Version Control

- **Yarn workspaces** manage the monorepo. Shared devDependencies live at root.
- Critical tool versions are pinned: TypeScript 5.9.3, Vitest 3.0.6.
- Node.js >= 18.0.0 is required. Package manager: Yarn 1.22.22.

### Commit Conventions

- Format: `type(scope): description (#PR)` — e.g., `feat(editor): implement overlap box selection (#11053)`.
- Types: `feat`, `fix`, `chore`, `docs`.
- Scope is optional but recommended for package-specific changes (e.g., `editor`, `math`, `packages/excalidraw`).
- Messages use **lowercase imperative mood** — describe what the commit does, not what was done.
- PR title validation is enforced via `semantic-pr-title` GitHub Action.

### CI Pipeline

- **lint.yml**: Prettier + ESLint + TypeScript type checking (runs on all PRs).
- **test.yml**: Full Vitest suite (runs on master pushes).
- **test-coverage-pr.yml**: Coverage analysis on PRs.
- **size-limit.yml**: Bundle size regression detection.
- **autorelease-excalidraw.yml**: Automated npm releases.
- **Sentry**: Production error tracking deployed via CI.

### Review Expectations

- All PRs must pass lint, typecheck, and test gates before merge.
- Coverage must not drop below enforced thresholds.
- Bundle size regressions are flagged automatically.
- Semantic PR titles are required for changelog generation.

### Monorepo Boundaries

- `packages/excalidraw` is the public API surface — changes here affect npm consumers.
- `excalidraw-app` is the application layer — app-specific logic stays here.
- `packages/common`, `packages/math`, `packages/element` are internal libraries — keep them focused and minimal.
- Cross-package imports use path aliases only — no relative paths across package boundaries.
