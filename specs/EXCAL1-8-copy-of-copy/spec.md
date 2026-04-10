# Feature Specification: Fix Dead Code Compliance Violations

**Feature Branch**: `EXCAL1-8-copy-of-copy`  
**Created**: 2025-05-29  
**Status**: Draft  
**Input**: User description: Health scan found 2 compliance violations for principle "Dead Code":

packages/utils/src/shape.ts:507: Exported function 'ellipseFocusToCenter' is not imported anywhere in the codebase and file was last modified over 30 days ago (2025-05-09)
packages/utils/src/shape.ts:515: Exported function 'ellipseExtremes' is not imported anywhere in the codebase and file was last modified over 30 days ago (2025-05-09)

## Auto-Resolved Decisions *(mandatory when clarification policies apply)*

- **Decision**: Remove unused exported functions from codebase
- **Policy Applied**: CONSERVATIVE (AUTO fallback due to compliance context)
- **Confidence**: High (score: 12, signals: compliance, violation, dead code)
- **Fallback Triggered?**: Yes - AUTO promoted to CONSERVATIVE due to sensitive compliance context
- **Trade-offs**:
  1. Removing dead code improves maintainability but requires verification no hidden dependencies exist
  2. Conservative approach ensures no accidental breaking changes
- **Reviewer Notes**: Verify functions are truly unused before deletion; check for dynamic imports or reflection usage

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Remove Unused Functions (Priority: P1)

As a developer maintaining code quality, I want to remove unused exported functions so that the codebase remains clean and maintainable.

**Why this priority**: This is the core compliance requirement - removing dead code improves maintainability and reduces technical debt.

**Independent Test**: Can be fully tested by verifying the functions are not imported anywhere and deleting them doesn't break any tests.

**Acceptance Scenarios**:

1. **Given** the codebase has unused exported functions, **When** I remove them, **Then** all existing tests should still pass
2. **Given** functions are marked as unused, **When** I search the entire codebase, **Then** I should find no imports of these functions
3. **Given** functions are removed, **When** I run the compliance scan, **Then** the dead code violations should be resolved

### Edge Cases

- What happens if functions are used via dynamic imports or reflection?
- How does system handle partial usage (functions used in tests but not production)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST remove the exported function 'ellipseFocusToCenter' from packages/utils/src/shape.ts
- **FR-002**: System MUST remove the exported function 'ellipseExtremes' from packages/utils/src/shape.ts
- **FR-003**: System MUST verify no other code imports these functions before removal
- **FR-004**: System MUST ensure all existing tests pass after removal
- **FR-005**: System MUST update any documentation referencing these functions

### Key Entities

- **Unused Functions**: ellipseFocusToCenter, ellipseExtremes (functions to be removed)
- **Source File**: packages/utils/src/shape.ts (file containing dead code)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Compliance scan shows zero dead code violations for the specified functions
- **SC-002**: All existing unit and integration tests pass after function removal
- **SC-003**: Codebase search confirms no references to removed functions exist
- **SC-004**: Build process completes successfully without errors
- **SC-005**: Code coverage metrics remain at or above current levels
