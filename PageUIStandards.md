# Page UI Standards

This document outlines the UI standards and best practices to follow when creating new screens in the SharedBook app.

## Typography

### Font Family
- **Primary Font**: Poppins (all weights)
- Use the theme typography object: `typography.fonts.*`
  - `typography.fonts.regular` - Poppins-Regular
  - `typography.fonts.medium` - Poppins-Medium
  - `typography.fonts.semibold` - Poppins-SemiBold
  - `typography.fonts.bold` - Poppins-Bold

### Font Weight Best Practice
**IMPORTANT**: Do NOT use `fontWeight` property when using custom fonts.

❌ **Incorrect:**
```typescript
textStyle: {
  fontFamily: typography.fonts.bold,
  fontWeight: typography.weights.bold, // DON'T DO THIS
}
```

✅ **Correct:**
```typescript
textStyle: {
  fontFamily: typography.fonts.bold, // Font family already includes the weight
}
```

**Reason**: On Android, combining `fontFamily` (which already includes the weight in the name like "Poppins-Bold") with `fontWeight` can cause React Native to fall back to system fonts, breaking the custom font.

### Font Sizes
Use predefined typography sizes from the theme:
```typescript
typography.sizes.xs    // 12px
typography.sizes.sm    // 14px
typography.sizes.base  // 16px
typography.sizes.lg    // 18px
typography.sizes.xl    // 24px
typography.sizes['2xl'] // 32px
typography.sizes['3xl'] // 40px
typography.sizes['4xl'] // 48px
```

## Currency Formatting

### Using Currency Utility Functions
**IMPORTANT**: Always use the currency utility functions from `utils/currency.ts` for consistent formatting.

```typescript
import {formatINR, formatCurrency, formatIndianNumber} from '../../utils/currency';

// Most common - Format with ₹ symbol
<Text>{formatINR(12500)}</Text>  // Output: ₹12,500

// Format without symbol
<Text>{formatIndianNumber(12500)}</Text>  // Output: 12,500

// Format with other currencies
<Text>{formatCurrency(12500, { currency: 'USD', showSymbol: true })}</Text>  // Output: $12,500
```

### INR Symbol
- **Symbol**: ₹ (Indian Rupee)
- **No space** between symbol and amount
- **Always use `formatINR()` utility function** instead of manually adding ₹ symbol

❌ **Incorrect:**
```typescript
<Text>₹ {amount}</Text>  // Has space
<Text>₹{amount}</Text>  // Manual formatting, no Indian number formatting
<Text>₹{amount.toLocaleString()}</Text>  // Wrong locale
```

✅ **Correct:**
```typescript
<Text>{formatINR(amount)}</Text>  // Uses utility function
```

### Number Formatting
- The utility functions automatically use `toLocaleString('en-IN')` for Indian number formatting (lakhs/crores system)
- Example: `12500` → `12,500`, `1234567` → `12,34,567`

## Colors

### Using Theme Colors
Always use colors from the theme object:

```typescript
import {colors} from '../theme';

// Primary colors
colors.primary.pink

// Secondary colors
colors.secondary.darkBlueGray

// Text colors
colors.text.primary
colors.text.secondary
colors.text.tertiary

// Background colors
colors.background.app
colors.background.card
```

### Color with Opacity
Use hex color with opacity suffix for transparent colors:
```typescript
backgroundColor: `${colors.secondary.darkBlueGray}15` // 15% opacity
backgroundColor: `${colors.primary.pink}30` // 30% opacity
```

## Spacing

### Using Theme Spacing
Use predefined spacing values from the theme:

```typescript
import {spacing} from '../theme';

spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 12px
spacing.lg   // 16px
spacing.xl   // 24px
spacing.xxl  // 32px
spacing['3xl'] // 48px
```

## Components

### Reusable Components

#### AvatarGroup
Use the `AvatarGroup` component for displaying user avatars:

```typescript
import {AvatarGroup} from '../../components/AvatarGroup';

<AvatarGroup
  members={[
    {initials: 'AR', color: '#FF6B9D'},
    {initials: 'SK', color: '#4ECDC4'},
    {initials: 'MK', color: '#FFE66D'},
  ]}
  maxVisible={3}
  size={36}
  borderColor="white"
  overlap={10}
/>
```

#### BookTypeIcon
Use the `BookTypeIcon` component for book type icons:

```typescript
import {BookTypeIcon} from '../../components/BookTypeIcons';

<BookTypeIcon type="trip" size={30} color={colors.primary.pink} />
```

Available types: `'trip' | 'group' | 'personal' | 'event' | 'business' | 'savings'`

## Layout Patterns

### Background Gradient
Use the standard app gradient for consistent background:

```typescript
import LinearGradient from 'react-native-linear-gradient';

<LinearGradient
  colors={['#fdd4d2', '#fef9f9', '#e8e8e8']}
  start={{x: 1, y: 0}}
  end={{x: 0, y: 1}}
  style={styles.gradient}>
  {/* Content */}
</LinearGradient>
```

### Card Style
Standard card styling:

```typescript
card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  padding: spacing.lg,
  marginBottom: spacing.md,
}
```

### Button Style
Standard button with border:

```typescript
button: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  borderWidth: 2,
  borderColor: `${colors.secondary.darkBlueGray}30`,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.lg,
}
```

## Icons

### Icon Sizing
- Small icons: 20x20
- Medium icons: 24x24
- Large icons: 30x30

### Icon Colors
- Use theme colors for consistency
- White for icons on colored backgrounds
- `colors.primary.pink` for accent icons
- `colors.text.secondary` for inactive/secondary icons

## Text Styles Examples

### Headings
```typescript
heading: {
  fontSize: typography.sizes['2xl'],
  fontFamily: typography.fonts.bold,
  color: colors.text.primary,
}
```

### Body Text
```typescript
bodyText: {
  fontSize: typography.sizes.base,
  fontFamily: typography.fonts.regular,
  color: colors.text.primary,
}
```

### Labels
```typescript
label: {
  fontSize: typography.sizes.sm,
  fontFamily: typography.fonts.medium,
  color: colors.text.secondary,
}
```

### Amounts/Numbers
```typescript
amount: {
  fontSize: typography.sizes.xl,
  fontFamily: typography.fonts.bold,
  color: colors.text.primary,
}
```

## Common Mistakes to Avoid

1. ❌ Using `fontWeight` with custom fonts
2. ❌ Manually formatting currency instead of using `formatINR()` utility
3. ❌ Adding space between ₹ symbol and amount
4. ❌ Hardcoding colors instead of using theme
5. ❌ Hardcoding spacing values instead of using theme
6. ❌ Creating duplicate icon/component code instead of reusing
7. ❌ Not using `formatINR()` or `formatIndianNumber()` for Indian number formatting

## Checklist for New Screens

- [ ] All text uses `fontFamily` from `typography.fonts.*`
- [ ] No `fontWeight` properties used with custom fonts
- [ ] Currency formatted using `formatINR()` utility function
- [ ] Currency utility imported from `utils/currency`
- [ ] Colors from `colors` theme object
- [ ] Spacing from `spacing` theme object
- [ ] Reusable components used (AvatarGroup, BookTypeIcon, etc.)
- [ ] Standard gradient background applied
- [ ] Consistent card/button styling

## Example Screen Structure

```typescript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, typography, spacing} from '../../theme';
import {AvatarGroup} from '../../components/AvatarGroup';
import {formatINR} from '../../utils/currency';

export const NewScreen: React.FC = () => {
  const amount = 12500;

  return (
    <LinearGradient
      colors={['#fdd4d2', '#fef9f9', '#e8e8e8']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Screen Title</Text>
        <Text style={styles.amount}>{formatINR(amount)}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  amount: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.primary.pink,
  },
});
```
