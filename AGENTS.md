# Fix Hermes Out-of-Memory Crash in Expo SDK 57 (React Native)

## Objective

Act as a Senior React Native, Expo SDK 57, Hermes, and Performance Engineer.

Your task is to locate and permanently fix the application crash that occurs in the iOS Simulator.

The crash report indicates that Hermes runs out of memory while React Native is performing UI updates and layout calculations.

Do not apply temporary workarounds.

Instead, identify the actual root cause and refactor the code where necessary.

---

# Crash Summary

The application crashes with:

- EXC_BAD_ACCESS (SIGSEGV)
- Hermes Fatal Error
- Hermes GC Out Of Memory (OOM)
- HadesGC::allocSlow()
- GCBase::oom()
- hermesFatalErrorHandler()

The crash stack also contains:

- JSON.stringify()
- Object.keys()
- ReanimatedModuleProxy::commitUpdates()
- YogaLayoutableShadowNode
- roundLayoutResultsToPixelGrid()

This indicates memory exhaustion caused by JavaScript objects, rendering, animations, or layout recursion.

---

# Your Responsibilities

Perform a complete project audit.

Do NOT stop after fixing one issue.

Continue until every possible root cause has been verified.

---

## Phase 1 — Memory Audit

Search the entire project for:

- JSON.stringify()
- Object.keys()
- Object.values()
- Object.entries()
- console.log()
- console.table()
- console.dir()

Look for code that serializes:

- API responses
- Images
- PDFs
- SVGs
- Base64 strings
- File objects
- React state
- AsyncStorage values
- Supabase responses
- Large arrays
- Nested objects

If found:

Determine whether the operation is necessary.

Replace it with safer alternatives.

Never stringify huge objects.

---

## Phase 2 — Infinite Render Detection

Inspect every component.

Find:

- setState() inside render
- state updates during rendering
- recursive rendering
- useEffect dependency mistakes
- useMemo misuse
- useCallback misuse
- missing dependency arrays

Detect loops such as:

useEffect(() => {
setState(...)
}, [state])

Fix every render loop.

---

## Phase 3 — React Reanimated Audit

Inspect every file using:

- react-native-reanimated
- sharedValue
- useAnimatedStyle
- useAnimatedReaction
- useDerivedValue
- withTiming
- withSpring
- withRepeat
- withSequence

Check for:

- animation updates every frame
- recursive shared value updates
- shared values modified inside animated styles
- layout animation loops

Refactor animations to avoid unnecessary UI commits.

---

## Phase 4 — Layout Audit

Inspect every screen for:

- flex recursion
- nested ScrollViews
- nested FlatLists
- nested FlashLists
- dynamic height calculations
- percentage layouts
- layout animation recursion

Look for components that continuously change size.

Fix layout recalculation loops.

---

## Phase 5 — Large Data Audit

Search for:

- FlatList
- FlashList
- map()
- filter()
- reduce()

Check if extremely large arrays are rendered.

Implement:

- pagination
- virtualization
- memoization

Avoid rendering thousands of components.

---

## Phase 6 — State Management Audit

Inspect:

- Context API
- Zustand
- Redux
- Jotai
- React Query
- TanStack Query

Check for:

- gigantic state objects
- duplicated data
- unnecessary re-renders
- deep object cloning
- repeated object creation

Split large states into smaller slices.

---

## Phase 7 — AsyncStorage Audit

Search for:

- AsyncStorage.setItem()
- AsyncStorage.getItem()

Check whether entire application state is being serialized.

Avoid storing:

- images
- PDFs
- Base64
- huge objects

Store IDs instead of complete objects whenever possible.

---

## Phase 8 — Supabase Audit

Inspect every query.

Look for:

select("\*")

Replace with explicit column selection.

Limit records.

Avoid downloading unnecessary nested relationships.

Paginate large queries.

---

## Phase 9 — Expo Modules

Inspect usage of:

- expo-file-system
- expo-sharing
- expo-image
- expo-image-picker
- expo-document-picker
- expo-print
- expo-camera

Check for:

- loading entire files into memory
- reading Base64 unnecessarily
- duplicate file loading
- memory leaks

Use streaming APIs whenever possible.

---

## Phase 10 — Image Optimization

Locate every image.

Check:

- PNG size
- JPG size
- SVG complexity
- Image dimensions

Replace oversized assets.

Enable lazy loading.

Avoid rendering full-resolution images.

---

## Phase 11 — PDF Handling

If PDFs exist:

Avoid:

JSON.stringify(pdf)

Avoid Base64 conversion unless absolutely required.

Generate PDFs incrementally.

Dispose of temporary files after sharing.

---

## Phase 12 — Logging Audit

Remove development logs such as:

console.log(hugeObject)

Replace with:

console.log(object.id)

or

console.log(object.length)

Never log massive API responses.

---

## Phase 13 — Memory Leak Detection

Inspect for:

- event listeners
- intervals
- timeouts
- subscriptions
- animation listeners
- navigation listeners

Ensure every listener is removed.

---

## Phase 14 — Component Optimization

Wrap expensive components using:

- React.memo
- useMemo
- useCallback

Memoize expensive calculations.

Prevent unnecessary rerenders.

---

## Phase 15 — Navigation Audit

Inspect React Navigation.

Look for:

- screens recreated repeatedly
- unnecessary params
- huge objects passed through navigation

Pass IDs instead of objects.

---

## Phase 16 — Hermes Optimization

Enable Hermes best practices.

Avoid creating unnecessary objects inside render.

Avoid repeated object spreads.

Avoid deep cloning.

Avoid repeated JSON serialization.

---

## Phase 17 — Performance Profiling

Identify:

- slow renders
- memory spikes
- excessive commits
- unnecessary layout passes
- repeated React reconciliation

Provide recommendations.

---

# Refactoring Rules

Do NOT change:

- UI design
- Theme
- Colors
- Typography
- Navigation flow
- Business logic
- Features
- User experience

Only improve:

- performance
- stability
- memory usage
- rendering efficiency

---

# Deliverables

Produce a complete report containing:

## 1. Root Cause

Explain the exact reason for the Hermes Out-of-Memory crash.

---

## 2. Every Problem Found

For each issue include:

- File path
- Line number
- Why it causes memory problems
- Severity (Critical / High / Medium / Low)

---

## 3. Fix Applied

Show:

Before

```tsx
// original code
```

After

```tsx
// optimized code
```

Explain why the fix works.

---

## 4. Performance Improvements

Estimate improvements for:

- Memory usage
- Render count
- JS thread performance
- UI thread performance
- Startup time
- Bundle size (if affected)

---

## 5. Validation Checklist

Confirm:

- No render loops
- No layout recursion
- No animation loops
- No oversized serialization
- No memory leaks
- No unnecessary re-renders
- No Hermes OOM risk
- No Yoga layout recursion
- Expo SDK 57 compatibility
- React Native New Architecture compatibility

---

# Success Criteria

The application should:

- Run without Hermes Out-of-Memory crashes.
- Maintain stable memory usage.
- Eliminate unnecessary renders and layout recalculations.
- Preserve all existing functionality and UI.
- Be production-ready, performant, and compatible with Expo SDK 57 and the latest React Native architecture.
