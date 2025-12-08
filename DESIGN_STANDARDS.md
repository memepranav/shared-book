# SharedBook - Design Standards

This document defines the design system and visual standards for the SharedBook application based on the approved UI reference.

## Color Palette

### Primary Colors
```
Primary Pink:       #ed5f57
Primary Blue:       #5B9EFF
Primary Teal:       #4ECDC4
```

### Background Colors
```
App Background:     #E8EAF0
Card Background:    #FFFFFF
Dark Background:    #1F1F39
```

### Chart Colors
```
Pink Gradient:      #ed5f57 → #f49992
Blue Gradient:      #6BB6FF → #A3CFFF
Purple:             #A259FF
```

### Text Colors
```
Primary Text:       #2D3142
Secondary Text:     #8F92A1
Tertiary Text:      #B4B4C4
White Text:         #FFFFFF
```

### Status Colors
```
Success Green:      #4CD964
Warning Yellow:     #FFB800
Error Red:          #FF3B30
Info Blue:          #5B9EFF
```

### Accent Colors
```
Light Pink:         #fde8e7
Light Blue:         #E5F3FF
Light Teal:         #E5FAF8
Light Purple:       #F0E5FF
```

## Typography

### Font Family
- **iOS:** San Francisco (System Default)
- **Android:** Roboto (System Default)

### Font Sizes & Weights

#### Headings
```
H1 (Balance/Large Numbers):
  - Size: 48px
  - Weight: 700 (Bold)
  - Line Height: 56px

H2 (User Name/Main Headers):
  - Size: 24px
  - Weight: 600 (Semibold)
  - Line Height: 32px

H3 (Section Titles):
  - Size: 18px
  - Weight: 600 (Semibold)
  - Line Height: 24px

H4 (Card Titles):
  - Size: 16px
  - Weight: 600 (Semibold)
  - Line Height: 22px
```

#### Body Text
```
Body Large:
  - Size: 16px
  - Weight: 400 (Regular)
  - Line Height: 24px

Body Medium:
  - Size: 14px
  - Weight: 400 (Regular)
  - Line Height: 20px

Body Small (Captions):
  - Size: 12px
  - Weight: 400 (Regular)
  - Line Height: 16px
```

#### Button Text
```
Button Large:
  - Size: 16px
  - Weight: 600 (Semibold)

Button Medium:
  - Size: 14px
  - Weight: 500 (Medium)
```

## Spacing System

### Padding & Margins
```
XXS: 4px
XS:  8px
S:   12px
M:   16px
L:   20px
XL:  24px
XXL: 32px
XXXL: 40px
```

### Component Spacing
```
Card Padding:           16px - 20px
Section Spacing:        24px
Screen Horizontal:      20px
List Item Spacing:      12px
Icon-Text Gap:          8px
```

## Border Radius

```
Small (Buttons):        8px
Medium (Cards):         16px
Large (Modal):          20px
XLarge (Bottom Sheet):  24px
Full (Circular):        9999px
```

## Shadows

### Card Shadow
```
Shadow Color: #000000
Opacity: 0.08
Offset: 0px, 2px
Blur Radius: 8px
Elevation (Android): 3
```

### Button Shadow
```
Shadow Color: #000000
Opacity: 0.12
Offset: 0px, 4px
Blur Radius: 12px
Elevation (Android): 4
```

### Modal Shadow
```
Shadow Color: #000000
Opacity: 0.15
Offset: 0px, 8px
Blur Radius: 24px
Elevation (Android): 8
```

## Components

### Bottom Navigation
```
Height: 64px
Background: #FFFFFF
Active Icon Color: #5B9EFF
Inactive Icon Color: #B4B4C4
Icon Size: 24px
Label Size: 12px
Items: 5 (Home, Analytics, Scan, Notifications, Profile)
```

### Cards
```
Background: #FFFFFF
Border Radius: 16px
Padding: 16px - 20px
Shadow: Card Shadow (see above)
```

### Buttons

#### Primary Button
```
Background: #ed5f57
Text Color: #FFFFFF
Border Radius: 24px
Height: 48px
Padding Horizontal: 24px
Font Weight: 600
```

#### Secondary Button
```
Background: Transparent
Border: 1px solid #E8EAF0
Text Color: #2D3142
Border Radius: 24px
Height: 48px
Padding Horizontal: 24px
```

#### Icon Button
```
Size: 40px × 40px
Border Radius: 20px (circular)
Background: #F5F6FA
Icon Size: 20px
```

### Avatar
```
Small: 32px
Medium: 48px
Large: 64px
Border Radius: Full (circular)
Border: 2px solid #FFFFFF (optional)
```

### Input Fields
```
Height: 48px
Border Radius: 12px
Border: 1px solid #E8EAF0
Background: #FFFFFF
Padding Horizontal: 16px
Font Size: 16px
Focus Border Color: #5B9EFF
```

### Status Badges
```
Height: 24px
Border Radius: 12px
Padding Horizontal: 12px
Font Size: 12px
Font Weight: 500

Success:
  - Background: #E5F9EC
  - Text Color: #4CD964

Pending:
  - Background: #FFF4E5
  - Text Color: #FFB800

Error:
  - Background: #FFE5E5
  - Text Color: #FF3B30
```

## Icons

### Icon Sizes
```
Small: 16px
Medium: 20px
Large: 24px
XLarge: 32px
```

### Icon Style
- Outline style for inactive states
- Filled style for active states
- Consistent stroke width: 2px

## Charts & Graphs

### Bar Chart
```
Bar Width: 24px
Bar Spacing: 8px
Border Radius: 4px (top)
Colors: Use Chart Colors (see above)
Background Grid: #F5F6FA
Axis Labels: 12px, #8F92A1
```

### Line Chart
```
Line Width: 2px
Point Size: 6px
Grid Lines: #F5F6FA
Colors: Primary Pink, Primary Blue
```

### Pie/Donut Chart
```
Thickness: 24px
Gap: 2px
Colors: Chart Colors in sequence
```

## Animation & Transitions

### Duration
```
Fast: 200ms
Normal: 300ms
Slow: 500ms
```

### Easing
```
Standard: cubic-bezier(0.4, 0.0, 0.2, 1)
Decelerate: cubic-bezier(0.0, 0.0, 0.2, 1)
Accelerate: cubic-bezier(0.4, 0.0, 1, 1)
```

### Common Animations
```
Page Transition: 300ms, Standard
Modal Slide Up: 300ms, Decelerate
Fade In/Out: 200ms, Standard
Button Press: 100ms, Accelerate
```

## Accessibility

### Minimum Touch Targets
```
Minimum Size: 44px × 44px (iOS)
Minimum Size: 48px × 48px (Android)
```

### Text Contrast Ratios
```
Large Text (18px+): 3:1 minimum
Normal Text: 4.5:1 minimum
```

### Focus States
```
Outline Color: #5B9EFF
Outline Width: 2px
Outline Offset: 2px
```

## Grid System

### Screen Breakpoints
```
Small Phone: 320px - 374px
Medium Phone: 375px - 413px
Large Phone: 414px+
Tablet: 768px+
```

### Layout Grid
```
Columns: 12
Gutter: 16px
Margin: 20px
```

## Usage Guidelines

### DO
- Use consistent spacing from the spacing system
- Follow the color palette for all UI elements
- Maintain minimum touch target sizes
- Use appropriate shadows for depth hierarchy
- Keep text contrast ratios accessible

### DON'T
- Don't create custom colors outside the palette
- Don't use inconsistent border radius values
- Don't mix font weights arbitrarily
- Don't ignore safe area insets
- Don't use shadows excessively
