# Implementation Plan: Remove Dead Code — Unused Ellipse Utility Functions

**Feature Branch**: `EXCAL1-5-copy-of-compliance` **Created**: 2026-04-10 **Status**: Ready for implementation

---

## Technical Context

| Aspect | Detail |
| --- | --- |
| Target file | `packages/utils/src/shape.ts` |
| Functions to remove | `ellipseFocusToCenter` (lines 507–513), `ellipseExtremes` (lines 515–544) |
| Dependencies | Both depend on `ellipseAxes` (line 489) — retained per spec scope |
| Re-exports | None — `packages/utils/src/index.ts` does not export from `shape.ts` |
| Test impact | None — no tests reference these functions |
| Import cleanup | None needed — all imported symbols are used by other retained functions |
| Build impact | None expected — removing unused exports cannot break consumers |

---

## Constitution Check

| Principle | Status | Notes |
| --- | --- | --- |
| Type Safety First | PASS | Removal of unused exports cannot introduce type errors |
| Functional Paradigm | PASS | No paradigm changes |
| Naming Conventions | PASS | No new code introduced |
| Import Discipline | PASS | No import changes needed |
| Error Handling | PASS | No error handling changes |
| Testing Standards | PASS | Existing tests unaffected; no new tests required (removing dead code) |
| Security Practices | PASS | No security surface changes |
| Code Quality | PASS | Dead code removal improves code quality |
| Pre-commit Hooks | PASS | Must run `yarn fix` and `yarn test:update` before committing |

---

## Implementation Phases

### Phase 1: Remove Dead Functions (Single Change)

**File**: `packages/utils/src/shape.ts`

1. **Remove `ellipseFocusToCenter`** — Delete the entire function block (lines 507–513), including the `export const` declaration and closing brace
2. **Remove `ellipseExtremes`** — Delete the entire function block (lines 515–544), including the `export const` declaration and closing brace
3. **Clean up whitespace** — Ensure no extra blank lines remain at the end of the file after deletion

**What stays unchanged**:

- `ellipseAxes` (lines 489–505) — retained per spec decision
- All imports at top of file — all symbols still used by other functions
- All other functions in the file
- `packages/utils/src/index.ts` — no re-exports to clean up

### Phase 2: Verification

1. Run `yarn test:typecheck` — must pass with zero errors
2. Run `yarn test:update` — all existing tests must pass without modification
3. Run `yarn fix` — auto-fix formatting/linting before commit
4. Verify `ellipseFocusToCenter` and `ellipseExtremes` no longer appear in codebase (grep)

---

## Testing Strategy

**No new tests are required.** This is a pure removal of dead code — no behavior changes.

**Verification plan**:

- `yarn test:typecheck` confirms no type errors introduced
- `yarn test:update` confirms all existing tests pass (especially `packages/utils/tests/geometry.test.ts` which tests other ellipse functions from the same file)
- Codebase grep confirms the functions are fully removed

**Existing test files verified unaffected**:

- `packages/utils/tests/geometry.test.ts` — imports only `pointInEllipse`, `pointOnEllipse`, `Ellipse` from `shape.ts`

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| External consumer depends on these functions | Very Low | Functions are not in the public API surface (`index.ts` does not export from `shape.ts`) |
| Removing functions breaks build | None | Functions have zero import sites in the codebase |
| `ellipseAxes` removal cascade | N/A | Explicitly out of scope per spec — retained as-is |

---

## Artifacts Generated

| Artifact         | Path                                              |
| ---------------- | ------------------------------------------------- |
| Research         | `specs/EXCAL1-5-copy-of-compliance/research.md`   |
| Data Model       | `specs/EXCAL1-5-copy-of-compliance/data-model.md` |
| Plan (this file) | `specs/EXCAL1-5-copy-of-compliance/plan.md`       |
| Contracts        | N/A — no public API affected                      |
| Workflows        | N/A — no internal processes                       |
