# EXCAL1-11 Copy of [Compliance] Fix 5 violations - Error Handling

## Description

Health scan found 5 compliance violations for principle "Error Handling":

- `packages/excalidraw/components/App.tsx:875`: empty catch block swallows `postMessage` JSON parse errors.
- `packages/excalidraw/clipboard.ts:551`: empty catch block swallows clipboard JSON parse errors.
- `excalidraw-app/CustomStats.tsx:69`: empty catch block swallows clipboard copy errors with no user feedback.
- `packages/element/src/elementLink.ts:101`: empty catch block swallows URL parse errors.
- `packages/common/src/utils.ts:1302`: empty catch block swallows localStorage feature flag parse errors.

## Notes

Implement the smallest behavior-preserving fixes that make failures explicit:

- keep normal non-JSON/plaintext flows quiet,
- log exceptional malformed persisted or embedded payloads,
- surface clipboard copy failure to the user,
- validate with impacted tests only.
