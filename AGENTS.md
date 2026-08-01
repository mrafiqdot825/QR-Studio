# QRify Design System

## Apple Liquid Glass + Midnight Blue Theme

> **Primary Brand Color:** `#062045`
>
> This document defines the complete visual language for QRify. The goal is to create a premium, elegant, modern experience inspired by Apple's Liquid Glass while maintaining excellent accessibility and readability.
>
> **IMPORTANT**
>
> - Preserve the existing layout and component structure.
> - Do not redesign screens.
> - Only update colors, materials, shadows, borders, and typography according to this specification.
> - Maintain smooth animations and premium interactions.

---

# Design Philosophy

The application should feel like:

- Premium
- Minimal
- Sophisticated
- Calm
- High-end
- Modern Apple ecosystem
- Soft depth instead of hard contrast

Avoid:

- Neon colors
- Saturated gradients
- Pure black backgrounds
- Heavy shadows
- Material Design appearance
- Glassmorphism with excessive blur

Instead use:

- Soft translucent glass
- Layered depth
- Elegant spacing
- Rounded geometry
- Refined lighting

---

# Brand Colors

## Primary

```css
Primary 900 : #04172F
Primary 800 : #062045
Primary 700 : #083060
Primary 600 : #0A417B
Primary 500 : #145CA8
```

Primary actions should always use:

```
#062045
```

---

# Accent Colors

These colors work naturally with Midnight Blue.

## Cyan

```css
#55D6FF
```

Usage

- Selected state
- Active icons
- Focus rings
- QR scanner highlight

---

## Soft Blue

```css
#73B8FF
```

Usage

- Secondary buttons
- Links
- Information cards

---

## Ice Blue

```css
#CFEAFF
```

Usage

- Small highlights
- Glass reflections
- Light gradients

---

## Emerald

```css
#39D98A
```

Usage

- Success
- Completed scans
- Positive balance

---

## Amber

```css
#F6C453
```

Usage

- Warnings
- Premium badges

---

## Coral

```css
#FF7A7A
```

Usage

- Delete
- Errors

---

# Background System

Never use pure black.

Instead:

```css
Background Primary
#031528
```

```css
Background Secondary
#062045
```

```css
Surface
rgba(255,255,255,0.05)
```

```css
Elevated Surface
rgba(255,255,255,0.08)
```

```css
Glass Layer
rgba(255,255,255,0.12)
```

---

# Glass Material

Cards should use:

```css
background: rgba(255, 255, 255, 0.08);

backdrop-filter: blur(24px);

border: 1px solid rgba(255, 255, 255, 0.14);

border-radius: 28px;
```

Hover:

```css
background: rgba(255, 255, 255, 0.12);
```

Pressed:

```css
background: rgba(255, 255, 255, 0.16);
```

---

# Border Colors

Primary Border

```css
rgba(255,255,255,0.10)
```

Secondary Border

```css
rgba(255,255,255,0.06)
```

Focus

```css
#55D6FF
```

---

# Typography Colors

## Primary Text

```css
#FFFFFF
```

Opacity

```
100%
```

---

## Secondary Text

```css
#D4E3F5
```

---

## Tertiary Text

```css
#9CB2C9
```

---

## Disabled Text

```css
#64748B
```

---

## Inverse Text

```css
#062045
```

Used on:

- White buttons
- Light chips

---

# Icon Colors

Primary

```css
#FFFFFF
```

Secondary

```css
#BFD2E8
```

Inactive

```css
#7C93AD
```

Selected

```css
#55D6FF
```

---

# Button Styles

## Primary Button

Background

```
#062045
```

Text

```
#FFFFFF
```

Hover

```
#083060
```

Pressed

```
#04172F
```

Shadow

```css
0 10px 30px rgba(6,32,69,.35)
```

---

## Secondary Button

Background

```css
rgba(255,255,255,.08)
```

Border

```css
rgba(255,255,255,.10)
```

Text

```
#FFFFFF
```

---

## Glass Button

Background

```css
rgba(255,255,255,.10)
```

Blur

```
20px
```

Border

```css
rgba(255,255,255,.16)
```

---

# QR Scanner Colors

Scanner Border

```
#55D6FF
```

Scanner Glow

```css
rgba(85,214,255,.35)
```

Success

```
#39D98A
```

Error

```
#FF7A7A
```

---

# Status Colors

Success

```
#39D98A
```

Info

```
#55D6FF
```

Warning

```
#F6C453
```

Danger

```
#FF7A7A
```

---

# Navigation Bar

Background

```css
rgba(255,255,255,.08)
```

Blur

```
30px
```

Selected Icon

```
#55D6FF
```

Unselected Icon

```
#AABFD7
```

Indicator

```
#55D6FF
```

---

# Shadows

Small

```css
0 8px 18px rgba(0,0,0,.18)
```

Medium

```css
0 12px 30px rgba(0,0,0,.22)
```

Large

```css
0 20px 45px rgba(0,0,0,.30)
```

---

# Gradients

## Primary

```css
linear-gradient(
135deg,
#04172F 0%,
#062045 45%,
#0A417B 100%
)
```

---

## Glass Highlight

```css
linear-gradient(
180deg,
rgba(255,255,255,.18),
rgba(255,255,255,.02)
)
```

---

## Accent

```css
linear-gradient(
135deg,
#55D6FF,
#73B8FF
)
```

---

# Corner Radius

Small

```
16px
```

Medium

```
22px
```

Large

```
28px
```

Extra Large

```
36px
```

Floating Button

```
999px
```

---

# Animation

Use only:

- Spring animations
- Smooth fade
- Scale 0.98 when pressed
- Soft elevation changes
- Glass reflection movement
- Duration between 180ms and 300ms

Avoid:

- Bounce
- Elastic effects
- Flashing
- Oversized transitions

---

# Accessibility

Minimum contrast ratio:

```
4.5:1
```

Never place:

- Gray text on blue glass
- Cyan text on white glass
- Low-opacity text below 60%

Interactive elements must always have:

- Visible focus ring
- Clear pressed state
- Distinct disabled state

---

# AI Agent Rules

The AI agent must follow these rules throughout the application:

1. Never change the existing screen layouts.
2. Preserve all navigation flows.
3. Preserve all business logic.
4. Use `#062045` as the primary brand color everywhere.
5. Apply Apple-inspired Liquid Glass materials consistently.
6. Use soft translucent surfaces instead of solid cards.
7. Keep spacing clean and minimalist.
8. Maintain consistent corner radii and shadows.
9. Ensure all text meets accessibility contrast requirements.
10. Use accent colors only for meaningful interactions (focus, success, warnings, errors).
11. Do not introduce new colors outside this design system unless explicitly requested.
12. Prioritize readability, simplicity, and a premium user experience over decorative effects.
