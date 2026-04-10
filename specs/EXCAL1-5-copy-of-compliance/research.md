# Research: Remove Dead Code — Unused Ellipse Utility Functions

**Feature Branch**: `EXCAL1-5-copy-of-compliance` **Created**: 2026-04-10

---

## Existing Files

### Files to Modify

| File | What it covers | Action |
| --- | --- | --- |
| `packages/utils/src/shape.ts` | Pure geometric shape definitions and utility functions for ellipses, polygons, curves, polylines | **Modify** — remove `ellipseFocusToCenter` (lines 507–513) and `ellipseExtremes` (lines 515–544) |

### Files NOT Affected (Verified)

| File | What it covers | Why unaffected |
| --- | --- | --- |
| `packages/utils/src/index.ts` | Barrel exports for `@excalidraw/utils` | Does NOT re-export from `shape.ts` — no changes needed |
| `packages/utils/tests/geometry.test.ts` | Geometry tests importing `pointInEllipse`, `pointOnEllipse`, `Ellipse` from `shape.ts` | Does not reference `ellipseFocusToCenter`, `ellipseExtremes`, or `ellipseAxes` — no changes needed |

### Search Results Summary

- **Codebase-wide grep for `ellipseFocusToCenter`**: Only found in `packages/utils/src/shape.ts` (definition) and spec files
- **Codebase-wide grep for `ellipseExtremes`**: Only found in `packages/utils/src/shape.ts` (definition) and spec files
- **Codebase-wide grep for `ellipseAxes`**: Only found in `packages/utils/src/shape.ts` — called exclusively by the two dead functions (lines 510, 519)
- **Barrel/index file search**: No re-exports of any of these three functions
- **Test file search**: No tests reference any of these three functions

---

## Patterns to Follow

### Deletion Pattern in `shape.ts`

The file is structured as a series of exported function declarations with no interdependencies outside the ellipse helper cluster. Each function is self-contained with its own generic type parameter `<Point extends GlobalPoint | LocalPoint>`.

**Pattern**: Functions are defined sequentially. Remove entire function blocks (including JSDoc if present) cleanly without leaving blank line artifacts. No cleanup of imports is needed since the removed functions only use symbols that are also used by retained functions (`vectorFromPoint`, `vectorAdd`, `vectorScale`, `vector`, `Math.*`).

### Error Handling Patterns

Not applicable — the target functions are pure mathematical computations with no error handling, I/O, or side effects.

### Security Patterns

Not applicable — no secrets, tokens, or credentials involved.

### State Management Patterns

Not applicable — pure functions with no state.

---

## Decisions

### Decision 1: Remove both functions entirely (not deprecate)

- **Decision**: Full removal of `ellipseFocusToCenter` and `ellipseExtremes`
- **Rationale**: Functions are not imported anywhere in the codebase, not re-exported through any barrel file, and not part of the public API surface (`packages/utils/src/index.ts` does not export from `shape.ts`). Deprecation would leave the compliance violation unresolved.
- **Alternatives considered**: Deprecation with `@deprecated` JSDoc tag — rejected because it doesn't resolve the dead code violation and adds maintenance burden.

### Decision 2: Retain `ellipseAxes` for now

- **Decision**: Keep `ellipseAxes` even though it will have no callers after removal
- **Rationale**: The spec explicitly scopes removal to the two flagged functions only. `ellipseAxes` was not flagged by the health scan (it was indirectly used). Per spec reviewer notes: "Verify whether `ellipseAxes` has other callers before considering it for future dead code cleanup."
- **Alternatives considered**: Remove `ellipseAxes` as well since it becomes dead code — rejected to keep the change minimal and scoped to the compliance finding.

### Decision 3: No import cleanup needed

- **Decision**: Do not modify the import block at the top of `shape.ts`
- **Rationale**: All symbols imported at the top of the file (`vector`, `vectorAdd`, `vectorFromPoint`, `vectorScale`, `pointFrom`, etc.) are also used by other retained functions in the file. Removing the two target functions does not orphan any imports.
- **Alternatives considered**: N/A — verified by code inspection.
