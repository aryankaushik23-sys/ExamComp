// JEE Math Prep App - Spacing System
// Consistent spacing scale for layouts and components

// Base spacing unit (4px)
const BASE_UNIT = 4;

// Spacing scale
export const spacing = {
    // Extra small
    xs: BASE_UNIT, // 4

    // Small
    sm: BASE_UNIT * 2, // 8

    // Medium (default)
    md: BASE_UNIT * 4, // 16

    // Large
    lg: BASE_UNIT * 6, // 24

    // Extra large
    xl: BASE_UNIT * 8, // 32

    // 2x Extra large
    '2xl': BASE_UNIT * 10, // 40

    // 3x Extra large
    '3xl': BASE_UNIT * 12, // 48

    // 4x Extra large
    '4xl': BASE_UNIT * 16, // 64
} as const;

// Border radius scale
export const borderRadius = {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
} as const;

// Shadow presets for elevation
export const shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },

    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },

    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },

    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },

    '2xl': {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
        elevation: 12,
    },
} as const;

// Layout constants
export const layout = {
    // Screen padding
    screenPaddingHorizontal: spacing.md,
    screenPaddingVertical: spacing.lg,

    // Card dimensions
    cardPadding: spacing.md,
    cardBorderRadius: borderRadius.lg,

    // Button dimensions
    buttonHeight: {
        sm: 36,
        md: 44,
        lg: 52,
    },

    // Input dimensions
    inputHeight: 48,
    inputBorderRadius: borderRadius.md,

    // Icon sizes
    iconSize: {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 48,
    },

    // Header heights
    headerHeight: 56,
    tabBarHeight: 64,

    // Max content width (for tablets)
    maxContentWidth: 600,
} as const;

// Animation durations
export const animation = {
    fast: 150,
    normal: 250,
    slow: 350,
    spring: {
        damping: 15,
        stiffness: 150,
    },
} as const;

export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
