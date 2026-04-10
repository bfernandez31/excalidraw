# Research: Fix Dead Code Compliance Violations

## Existing Files

### packages/utils/src/shape.ts
- **Location**: `/home/runner/work/ai-board/ai-board/target/packages/utils/src/shape.ts`
- **Lines**: 507-530 (ellipseFocusToCenter), 515-545 (ellipseExtremes)
- **Content**: Contains two unused exported functions
- **Action**: Remove these functions completely

### specs/EXCAL1-8-copy-of-copy/spec.md
- **Location**: `/home/runner/work/ai-board/ai-board/target/specs/EXCAL1-8-copy-of-copy/spec.md`
- **Content**: Feature specification for dead code removal
- **Action**: Reference for implementation requirements

### target/.ai-board/memory/constitution.md
- **Location**: `/home/runner/work/ai-board/ai-board/target/.ai-board/memory/constitution.md`
- **Content**: Project constitution with governance principles
- **Action**: Guide for implementation approach

## Patterns to Follow

### Error Handling Patterns
- **Reference**: Not applicable for this removal task
- **Pattern**: N/A

### Security Patterns
- **Reference**: Not applicable for this removal task
- **Pattern**: N/A

### State Management Patterns
- **Reference**: Not applicable for this removal task
- **Pattern**: N/A

## Research Findings

### Decision: Remove unused functions

**Rationale**:
1. **Codebase Search**: Grep search confirmed functions are only defined in shape.ts and mentioned in spec.md
2. **No Imports**: No other files import or reference these functions
3. **Compliance**: Removal resolves dead code violations
4. **Maintainability**: Eliminates unnecessary code that could confuse developers

**Alternatives Considered**:
1. **Keep with deprecation**: Rejected - adds maintenance burden without benefit
2. **Move to separate file**: Rejected - still dead code, just in different location
3. **Comment out**: Rejected - doesn't resolve compliance violation

### Verification Steps

1. **Search entire codebase**: `grep -r "ellipseFocusToCenter\|ellipseExtremes" target/`
2. **Check test files**: Verify no tests import these functions
3. **Run test suite**: Ensure all tests pass after removal
4. **Type checking**: Verify TypeScript compilation succeeds
5. **Build process**: Confirm build completes without errors

## Implementation Recommendations

1. **Direct removal**: Delete the function definitions completely
2. **No replacements**: Functions are not used, so no migration needed
3. **Test verification**: Run full test suite to ensure no hidden dependencies
4. **Documentation update**: Remove any references from docs if found