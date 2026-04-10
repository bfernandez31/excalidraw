# Tasks: Remove Dead Code — Unused Ellipse Utility Functions

**Input**: Design documents from `/specs/EXCAL1-5-copy-of-compliance/` **Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md

**Tests**: No new test files required — this is a pure dead code removal. Verification relies on existing tests passing unchanged.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No project setup needed — this is a modification to an existing codebase with no new dependencies or configuration.

_(No tasks — the project is already initialized and the target file exists)_

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational work needed — no new infrastructure, schemas, or frameworks required for dead code removal.

_(No tasks — all prerequisites are already in place)_

---

## Phase 3: User Story 1 — Codebase Compliance with Dead Code Policy (Priority: P1) MVP

**Goal**: Remove the two unused exported functions `ellipseFocusToCenter` and `ellipseExtremes` from `packages/utils/src/shape.ts` to resolve compliance violations.

**Independent Test**: Grep the codebase for both function names — neither should appear outside of git history. Build and type-check must pass.

### Implementation for User Story 1

- [x] T001 [US1] Remove the `ellipseFocusToCenter` function (lines 507-513) from `packages/utils/src/shape.ts` ✅ DONE
- [x] T002 [US1] Remove the `ellipseExtremes` function (lines 515-544) from `packages/utils/src/shape.ts` ✅ DONE
- [x] T003 [US1] Clean up any trailing blank lines or whitespace artifacts left after deletion in `packages/utils/src/shape.ts` ✅ DONE

**Checkpoint**: Both functions removed from source. Ready for verification.

---

## Phase 4: User Story 2 — No Regression in Existing Functionality (Priority: P1)

**Goal**: Verify that removing the dead functions causes zero regressions in build, types, tests, or runtime behavior.

**Independent Test**: Run `yarn test:typecheck`, `yarn test:update`, and `yarn fix` — all must pass without modification.

### Verification for User Story 2

- [x] T004 [US2] Run `yarn test:typecheck` and confirm zero type errors in `packages/utils/src/shape.ts` ✅ DONE
- [x] T005 [P] [US2] Run `yarn test:update` and confirm all existing tests pass (especially `packages/utils/tests/geometry.test.ts`) ✅ DONE
- [x] T006 [P] [US2] Grep the entire codebase for `ellipseFocusToCenter` and `ellipseExtremes` — confirm no remaining references outside spec files and git history ✅ DONE
- [x] T007 [US2] Run `yarn fix` to auto-fix any formatting/linting issues in `packages/utils/src/shape.ts` ✅ DONE

**Checkpoint**: All verification passes. The removal is confirmed safe.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup before commit.

- [ ] T008 Commit changes with descriptive message referencing ticket EXCAL1-5

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Skipped — no setup needed
- **Phase 2 (Foundational)**: Skipped — no foundational work needed
- **Phase 3 (US1 — Remove Functions)**: No dependencies — can start immediately
  - T001 and T002 operate on the same file, so execute sequentially
  - T003 depends on T001 + T002
- **Phase 4 (US2 — Verify No Regression)**: Depends on Phase 3 completion
  - T004 must pass before T007 (type-check before auto-fix)
  - T005 and T006 can run in parallel with T004
- **Phase 5 (Polish)**: Depends on Phase 4 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start immediately — no dependencies
- **User Story 2 (P1)**: Depends on User Story 1 completion (must verify after removal)

### Within Each User Story

- US1: Sequential execution (same file modifications)
- US2: T005 and T006 can run in parallel; T004 before T007

### Parallel Opportunities

- T005 and T006 can run in parallel (different tools, no file conflicts)
- T001 and T002 could be combined into a single edit operation on the same file

---

## Parallel Example: User Story 2

```bash
# After T004 (typecheck) passes, launch verification tasks in parallel:
Task: "Run yarn test:update and confirm all tests pass"
Task: "Grep codebase for removed function names"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: Remove both dead functions from `packages/utils/src/shape.ts`
2. **STOP and VALIDATE**: Run type-check and tests
3. If passing, proceed to commit

### Incremental Delivery

1. Remove functions (Phase 3) → Verify (Phase 4) → Commit (Phase 5)
2. Single atomic change — no incremental delivery needed for this scope

---

## Notes

- T001 and T002 operate on the same file — execute sequentially to avoid conflicts
- No new tests needed — plan.md and research.md confirm existing tests don't reference the removed functions
- `ellipseAxes` is explicitly retained per spec scope even though it becomes dead code
- No import cleanup needed — all imports are used by other retained functions
- No barrel/index file cleanup needed — `packages/utils/src/index.ts` does not export from `shape.ts`
