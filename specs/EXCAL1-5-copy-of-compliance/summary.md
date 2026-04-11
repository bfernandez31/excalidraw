# Implementation Summary: Remove Dead Code — Unused Ellipse Utility Functions

**Branch**: `EXCAL1-5-copy-of-compliance` | **Date**: 2026-04-10 **Spec**: [spec.md](spec.md)

## Changes Summary

Removed two unused exported functions (`ellipseFocusToCenter` and `ellipseExtremes`) from `packages/utils/src/shape.ts` to resolve dead code compliance violations flagged by the health scan. Both functions had zero import sites across the entire codebase and were not part of the public API surface. The `ellipseAxes` helper was retained per spec scope.

## Key Decisions

- Full removal chosen over deprecation since neither function is imported anywhere or re-exported via barrel files.
- `ellipseAxes` retained despite becoming dead code — explicitly out of scope per spec decision to keep the change minimal.
- No import cleanup needed — all imported symbols are still used by other retained functions in the file.

## Files Modified

- `packages/utils/src/shape.ts` — removed `ellipseFocusToCenter` (lines 507–513) and `ellipseExtremes` (lines 515–544), cleaned trailing whitespace
- `specs/EXCAL1-5-copy-of-compliance/tasks.md` — all 8 tasks marked complete

## ⚠️ Manual Requirements

None
