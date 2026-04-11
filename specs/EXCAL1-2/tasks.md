# Tasks: Fix 5 Error Handling Compliance Violations

**Input**: Design documents from `/specs/EXCAL1-2/` **Prerequisites**: plan.md (required), spec.md (required)

**Tests**: No new test files required — verification relies on existing tests passing unchanged and manual verification of error logging.

**Organization**: Tasks are grouped by file to enable focused implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No project setup needed — this is a modification to an existing codebase with no new dependencies or configuration.

_(No tasks — the project is already initialized and all target files exist)_

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational work needed — no new infrastructure, schemas, or frameworks required for error handling improvements.

_(No tasks — all prerequisites are already in place)_

---

## Phase 3: User Story 1 — Error Visibility for Developers (Priority: P1) MVP

**Goal**: Add error logging to all 5 empty catch blocks to resolve compliance violations.

**Independent Test**: Verify that `console.error` is called in each catch block and errors are visible in browser console.

### Implementation for User Story 1

- [x] T001 [US1] Add `console.error(e)` to empty catch block in `packages/excalidraw/components/App.tsx:877` ✅ DONE
- [x] T002 [P] [US1] Add `console.error(e)` to empty catch block in `packages/excalidraw/clipboard.ts:551` ✅ DONE
- [x] T003 [P] [US1] Add `console.error(e)` to empty catch block in `excalidraw-app/CustomStats.tsx:69` ✅ DONE
- [x] T004 [P] [US1] Add `console.error(e)` to empty catch block in `packages/element/src/elementLink.ts:101` ✅ DONE
- [x] T005 [P] [US1] Add `console.error(e)` to empty catch block in `packages/common/src/utils.ts:1302` ✅ DONE

**Checkpoint**: All catch blocks now contain error logging. Ready for verification.

---

## Phase 4: User Story 2 — No Regression in Existing Functionality (Priority: P1)

**Goal**: Verify that adding error logging causes zero regressions in build, types, tests, or runtime behavior.

**Independent Test**: Run `yarn test:typecheck` and `yarn test:update` — all must pass without modification.

### Verification for User Story 2

- [x] T006 [US2] Run `yarn test:typecheck` and confirm zero type errors ✅ DONE
- [x] T007 [P] [US2] Run `yarn test:update` and confirm all existing tests pass ✅ DONE
- [x] T008 [P] [US2] Manually verify error logging works by triggering each catch block in development ✅ DONE
- [x] T009 [US2] Run `yarn fix` to auto-fix any formatting/linting issues ✅ DONE

**Checkpoint**: All verification passes. The error logging is confirmed safe and functional.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup before commit.

- [x] T010 Commit changes with descriptive message referencing ticket EXCAL1-2 ✅ DONE

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Skipped — no setup needed
- **Phase 2 (Foundational)**: Skipped — no foundational work needed
- **Phase 3 (US1 — Add Error Logging)**: No dependencies — can start immediately
  - T001 operates on different file than T002-T005, so T002-T005 can run in parallel
  - All tasks are independent (different files)
- **Phase 4 (US2 — Verify No Regression)**: Depends on Phase 3 completion
  - T006 must pass before T009 (type-check before auto-fix)
  - T007 and T008 can run in parallel with T006
- **Phase 5 (Polish)**: Depends on Phase 4 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start immediately — no dependencies
- **User Story 2 (P1)**: Depends on User Story 1 completion (must verify after adding logging)

### Within Each User Story

- US1: T001 is independent, T002-T005 can run in parallel (different files)
- US2: T007 and T008 can run in parallel; T006 before T009

### Parallel Opportunities

- T002, T003, T004, T005 can run in parallel (different files, no conflicts)
- T007 and T008 can run in parallel (different verification methods)

---

## Parallel Example: User Story 1

```bash
# Launch error logging tasks in parallel:
Task: "Add console.error to App.tsx catch block"
Task: "Add console.error to clipboard.ts catch block"
Task: "Add console.error to CustomStats.tsx catch block"
Task: "Add console.error to elementLink.ts catch block"
Task: "Add console.error to utils.ts catch block"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: Add error logging to all 5 catch blocks
2. **STOP and VALIDATE**: Run type-check and tests
3. If passing, proceed to commit

### Incremental Delivery

1. Add error logging (Phase 3) → Verify (Phase 4) → Commit (Phase 5)
2. Single atomic change — no incremental delivery needed for this scope

---

## Notes

- T002, T003, T004, T005 operate on different files — can run in parallel
- No new tests needed — spec confirms existing tests don't depend on empty catch blocks
- No import changes needed — `console` is globally available
- Changes are minimal and isolated — low risk of conflicts or regressions
