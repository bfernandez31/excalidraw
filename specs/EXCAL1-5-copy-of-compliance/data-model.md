# Data Model: Remove Dead Code — Unused Ellipse Utility Functions

**Feature Branch**: `EXCAL1-5-copy-of-compliance`
**Created**: 2026-04-10

---

## Entities

This feature does not introduce, modify, or remove any data entities. It is a pure code removal task.

## Affected Types

No type definitions are affected. The `Ellipse<Point>` type (line 72–77 of `shape.ts`) is retained — it is used by `pointOnEllipse`, `pointInEllipse`, `distanceToEllipse`, and external test files.

## State Transitions

Not applicable — no state changes involved.

## Validation Rules

Not applicable — no new validation introduced.

## Summary

| Aspect | Impact |
|--------|--------|
| New entities | None |
| Modified entities | None |
| Removed entities | None |
| Type changes | None |
| Exported function removals | `ellipseFocusToCenter`, `ellipseExtremes` from `packages/utils/src/shape.ts` |
| Retained (no-change) | `ellipseAxes` (becomes internally dead but out of scope per spec) |
