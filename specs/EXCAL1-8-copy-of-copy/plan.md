# Implementation Plan: Fix Dead Code Compliance Violations

**Branch**: `EXCAL1-8-copy-of-copy` | **Date**: 2025-05-29 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/EXCAL1-8-copy-of-copy/spec.md`

## Summary

Remove unused exported functions `ellipseFocusToCenter` and `ellipseExtremes` from `packages/utils/src/shape.ts` to resolve compliance violations for dead code. The functions are not imported anywhere in the codebase and can be safely removed.

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: None (code removal only)
**Storage**: N/A
**Testing**: Vitest 3.0.6
**Target Platform**: Web application
**Project Type**: Monorepo (web application)
**Performance Goals**: N/A (code removal)
**Constraints**: Must maintain existing test coverage levels, no breaking changes
**Scale/Scope**: 2 functions to be removed from 1 file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Type Safety**: Functions are pure TypeScript with proper typing, removal maintains type safety
✅ **Functional Paradigm**: Functions are pure utilities, removal doesn't affect functional patterns
✅ **Naming Conventions**: N/A (removal only)
✅ **Import Discipline**: Functions are not imported anywhere, safe to remove
✅ **Error Handling**: N/A (removal only)
✅ **Testing Standards**: All existing tests must pass after removal
✅ **Security Practices**: N/A (removal only)
✅ **Code Quality**: Removal improves code quality by eliminating dead code
✅ **Governance**: Follows commit conventions and CI pipeline requirements

## Project Structure

### Documentation (this feature)

```
specs/EXCAL1-8-copy-of-copy/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── contracts/           # Phase 1 output (empty for this feature)
```

### Source Code (repository root)

```
target/
└── packages/
    └── utils/
        └── src/
            └── shape.ts  # File to be modified
```

**Structure Decision**: This is a simple code removal task affecting only one file in the utils package. No new files or complex structures needed.

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

No violations detected. This is a straightforward dead code removal task.

## Phase 0: Research

### Existing Files

- **packages/utils/src/shape.ts**: Contains the unused functions `ellipseFocusToCenter` (line 507) and `ellipseExtremes` (line 515)
- **specs/EXCAL1-8-copy-of-copy/spec.md**: Feature specification
- **target/.ai-board/memory/constitution.md**: Project constitution

### Patterns to Follow

- **Error Handling**: N/A (removal only)
- **Security Patterns**: N/A (removal only)
- **State Management Patterns**: N/A (removal only)

### Research Findings

**Decision**: Remove `ellipseFocusToCenter` and `ellipseExtremes` functions from `packages/utils/src/shape.ts`
**Rationale**: 
- Functions are not imported anywhere in the codebase (confirmed by grep search)
- Functions are exported but unused, violating dead code compliance
- Removal improves code maintainability and reduces technical debt
- No tests reference these functions

**Alternatives considered**: 
- Keep functions with deprecation warnings (rejected - adds unnecessary maintenance burden)
- Move to separate file (rejected - still dead code)

## Phase 1: Design & Contracts

### Data Model

No new data model required. This is a code removal task.

### Contracts

No external contracts affected. This is an internal code cleanup.

### Workflow/Agent Artifacts

No workflows or agent artifacts required for this simple removal task.

## Implementation Phases

### Phase 2: Implementation Tasks

1. **Remove unused functions**: Delete `ellipseFocusToCenter` and `ellipseExtremes` from `packages/utils/src/shape.ts`
2. **Verify removal**: Confirm functions are completely removed from file
3. **Run tests**: Execute full test suite to ensure no breaking changes
4. **Check build**: Verify build process completes successfully
5. **Update documentation**: Remove any references to these functions

## Testing Strategy

Follow the testing strategy defined in the project's constitution:

1. **Existing Tests**: Run full test suite (`yarn test`) to ensure no tests break after removal
2. **Coverage**: Verify coverage metrics remain at or above current levels
3. **Type Checking**: Run TypeScript type checking (`yarn test:typecheck`)
4. **Linting**: Run ESLint with zero warnings (`yarn lint`)

## Success Criteria

- ✅ Compliance scan shows zero dead code violations for the specified functions
- ✅ All existing unit and integration tests pass after function removal
- ✅ Codebase search confirms no references to removed functions exist
- ✅ Build process completes successfully without errors
- ✅ Code coverage metrics remain at or above current levels