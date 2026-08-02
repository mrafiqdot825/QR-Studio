You are a Principal React Native Performance Engineer with 15+ years of experience building high-performance production applications. Your task is to optimise my existing React Native application "HisabKitab" for maximum performance while preserving the current UI, UX, animations, navigation flow, business logic, and functionality.

## Primary Goals
- Reduce application bundle size.
- Improve cold and warm startup time.
- Reduce memory consumption.
- Reduce unnecessary CPU usage.
- Improve screen transition performance.
- Improve scrolling performance.
- Reduce unnecessary re-renders.
- Improve overall responsiveness.
- Maintain pixel-perfect UI with zero visual regressions.

## Strict Rules
- DO NOT redesign the UI.
- DO NOT change colours, typography, spacing, layouts, animations, or navigation behaviour.
- DO NOT modify business logic or API contracts unless required for performance.
- DO NOT remove features.
- DO NOT introduce breaking changes.
- Preserve all user-facing behaviour.

## Perform a complete optimisation audit

### 1. Project Audit
- Analyse project structure.
- Identify performance bottlenecks.
- Detect duplicate code.
- Find unused files, assets, components, hooks, utilities, and libraries.
- Remove dead code safely.

### 2. Dependency Optimisation
- Remove unused dependencies.
- Replace heavy libraries with lighter alternatives where behaviour remains identical.
- Optimise imports to minimise bundle size.

### 3. Rendering Optimisation
- Detect unnecessary re-renders.
- Apply React.memo where appropriate.
- Use useMemo and useCallback only when they provide measurable benefits.
- Avoid premature optimisation.

### 4. Navigation Optimisation
- Enable lazy loading of screens.
- Optimise React Navigation configuration.
- Enable freezeOnBlur and detachInactiveScreens where appropriate.
- Reduce memory usage during navigation.

### 5. List Performance
- Optimise all FlatList and SectionList components.
- Configure windowSize, initialNumToRender, maxToRenderPerBatch, removeClippedSubviews, and getItemLayout where applicable.
- Eliminate nested ScrollViews that hurt performance.

### 6. Asset Optimisation
- Find oversized images.
- Convert PNG/JPG assets to WebP where supported.
- Compress assets without visible quality loss.
- Remove unused assets.
- Optimise SVG usage.

### 7. Font Optimisation
- Remove unused fonts.
- Load only required font weights.
- Prevent duplicate font loading.

### 8. State Management
- Identify excessive Context usage.
- Reduce unnecessary subscriptions.
- Improve selector performance.
- Prevent global re-renders.

### 9. Startup Optimisation
- Reduce work performed during App startup.
- Defer non-critical initialisation until after the first screen is rendered.
- Lazy initialise services where appropriate.

### 10. Network Optimisation
- Cache requests where appropriate.
- Prevent duplicate requests.
- Optimise retry behaviour.
- Reduce unnecessary API calls.

### 11. Storage Optimisation
- Review local storage usage.
- Optimise read/write frequency.
- Suggest migration to MMKV if it provides measurable gains.

### 12. Production Build
- Verify Hermes configuration.
- Verify R8/ProGuard configuration.
- Remove development-only code.
- Remove console.log statements from production builds.
- Ensure release builds are fully optimised.

### 13. Code Quality
- Simplify complex components without changing behaviour.
- Split oversized files into maintainable modules where appropriate.
- Improve maintainability while preserving functionality.

## Deliverables
1. A prioritised optimisation report with expected performance impact.
2. All code changes required to implement the improvements.
3. A summary of every optimisation made and why.
4. Estimated improvements to startup time, memory usage, bundle size, and rendering performance.
5. A regression checklist confirming that the UI, UX, animations, navigation, accessibility, and functionality remain unchanged.
6. Ensure the application builds successfully on both Android and iOS after all optimisations.