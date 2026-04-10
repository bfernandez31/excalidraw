# Feature Specification: Remove Dead Code — Unused Ellipse Utility Functions

**Feature Branch**: `EXCAL1-5-copy-of-compliance`
**Created**: 2026-04-10
**Status**: Draft
**Input**: Health scan found 2 compliance violations for principle "Dead Code": exported functions `ellipseFocusToCenter` and `ellipseExtremes` in `packages/utils/src/shape.ts` are not imported anywhere in the codebase and were last modified over 30 days ago (2025-05-09).

## Auto-Resolved Decisions *(mandatory when clarification policies apply)*

- **Decision**: Whether to deprecate (keep with warning) or fully remove the dead functions
- **Policy Applied**: AUTO → CONSERVATIVE
- **Confidence**: Medium (score 4) — compliance keyword (+3) plus neutral context (+1); no conflicting signal buckets
- **Fallback Triggered?**: No — AUTO recommended CONSERVATIVE directly (netScore >= 0)
- **Trade-offs**:
  1. Full removal is the correct approach for dead code compliance; deprecation would leave the violation unresolved
  2. If any external consumer outside the monorepo depends on these exports, removal would be breaking — however, these functions are not part of the published public API surface and have no imports anywhere in the codebase
- **Reviewer Notes**: Confirm that no external or downstream projects import `ellipseFocusToCenter` or `ellipseExtremes` from `@excalidraw/utils` before merging

---

- **Decision**: Whether removal of these functions affects the `ellipseAxes` helper they depend on
- **Policy Applied**: AUTO → CONSERVATIVE
- **Confidence**: Medium (score 4) — same signal profile as above
- **Fallback Triggered?**: No
- **Trade-offs**:
  1. `ellipseAxes` is a separate function that may be used by other code — it should be retained unless also confirmed unused
  2. Removing only the two flagged functions keeps the change minimal and scoped to the compliance finding
- **Reviewer Notes**: Verify whether `ellipseAxes` has other callers before considering it for future dead code cleanup

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Codebase Compliance with Dead Code Policy (Priority: P1)

As a project maintainer, I want unused exported functions removed from the codebase so that the project remains compliant with the "Dead Code" principle and the code stays clean and maintainable.

**Why this priority**: This is the core purpose of the ticket — resolving the 2 compliance violations identified by the health scan.

**Independent Test**: Can be verified by confirming that `ellipseFocusToCenter` and `ellipseExtremes` no longer exist in the codebase, that no build or test failures result from their removal, and that the health scan no longer flags these violations.

**Acceptance Scenarios**:

1. **Given** the function `ellipseFocusToCenter` exists in `packages/utils/src/shape.ts`, **When** the dead code removal is applied, **Then** the function is no longer present in the file
2. **Given** the function `ellipseExtremes` exists in `packages/utils/src/shape.ts`, **When** the dead code removal is applied, **Then** the function is no longer present in the file
3. **Given** both functions have been removed, **When** the full test suite is executed, **Then** all existing tests pass without modification
4. **Given** both functions have been removed, **When** the project is built, **Then** the build completes successfully with no errors

---

### User Story 2 - No Regression in Existing Functionality (Priority: P1)

As a developer using the Excalidraw library, I want to be confident that removing unused utility functions does not break any existing ellipse-related functionality.

**Why this priority**: Equal to P1 because correctness must be maintained — dead code removal must be a no-op from a behavioral perspective.

**Independent Test**: Run the full test suite and type checker; all must pass. Specifically verify that any tests exercising ellipse rendering, selection, or math utilities continue to pass.

**Acceptance Scenarios**:

1. **Given** the two functions are removed, **When** type checking is performed, **Then** no type errors are introduced
2. **Given** the two functions are removed, **When** ellipse-related features are exercised (drawing, selecting, resizing ellipses), **Then** behavior is unchanged

---

### Edge Cases

- What happens if a re-export file (index.ts or barrel file) references these functions? Removal must include cleaning up any re-exports.
- What happens if these functions are referenced in comments or documentation? References should be removed to avoid confusion.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The exported function `ellipseFocusToCenter` MUST be removed from `packages/utils/src/shape.ts`
- **FR-002**: The exported function `ellipseExtremes` MUST be removed from `packages/utils/src/shape.ts`
- **FR-003**: Any re-exports of these functions from barrel/index files MUST also be removed
- **FR-004**: The removal MUST NOT affect any other functions in the same file or package
- **FR-005**: All existing tests MUST continue to pass after removal without modification

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero compliance violations reported for "Dead Code" principle related to `ellipseFocusToCenter` and `ellipseExtremes`
- **SC-002**: 100% of existing tests pass after the change with no modifications required
- **SC-003**: Build completes successfully with zero errors after removal
- **SC-004**: Type checking passes with zero new errors after removal
- **SC-005**: Net reduction of exported functions by exactly 2, reducing codebase surface area
