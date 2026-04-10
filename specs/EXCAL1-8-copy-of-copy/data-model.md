# Data Model: Fix Dead Code Compliance Violations

## Overview

This is a code removal task with no new data model requirements. The existing data model remains unchanged.

## Entities Affected

### Removed Functions

**ellipseFocusToCenter**
- **Type**: `const ellipseFocusToCenter = <Point extends LocalPoint | GlobalPoint>(ellipse: Ellipse<Point>) => number`
- **Purpose**: Calculate the distance from focus to center for an ellipse
- **Status**: To be removed (unused)

**ellipseExtremes**
- **Type**: `const ellipseExtremes = <Point extends LocalPoint | GlobalPoint>(ellipse: Ellipse<Point>) => {xMin: number, xMax: number, yMin: number, yMax: number}`
- **Purpose**: Calculate the extreme points (bounding box) of an ellipse
- **Status**: To be removed (unused)

## Validation Rules

No validation rules affected by this change.

## State Transitions

No state transitions affected by this change.

## Impact Analysis

### Before Removal
- **Codebase**: Contains 2 unused exported functions
- **Compliance**: Violates dead code principle
- **Maintainability**: Extra code that could confuse developers

### After Removal
- **Codebase**: Cleaner, no dead code
- **Compliance**: Meets dead code requirements
- **Maintainability**: Reduced technical debt

## Dependencies

No dependencies on these functions found in the codebase.

## Migration Path

No migration required as functions are not used anywhere.