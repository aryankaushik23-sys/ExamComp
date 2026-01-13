// JEE Math Prep App - Typography System
// Using system fonts with fallbacks for optimal performance

import { Platform, TextStyle } from 'react-native';

// Font family configuration
export const fontFamily = {
    regular: Platform.select({
        ios: 'System',
        android: 'Roboto',
        default: 'System',
    }),
    medium: Platform.select({
        ios: 'System',
        android: 'Roboto-Medium',
        default: 'System',
    }),
    semibold: Platform.select({
        ios: 'System',
        android: 'Roboto-Medium',
        default: 'System',
    }),
    bold: Platform.select({
        ios: 'System',
        android: 'Roboto-Bold',
        default: 'System',
    }),
};

// Font weights
export const fontWeight = {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
};

// Typography scale
export const typography = {
    // Display - Large impactful text
    displayLarge: {
        fontFamily: fontFamily.bold,
        fontSize: 40,
        fontWeight: fontWeight.bold,
        lineHeight: 48,
        letterSpacing: -0.5,
    } as TextStyle,

    displayMedium: {
        fontFamily: fontFamily.bold,
        fontSize: 32,
        fontWeight: fontWeight.bold,
        lineHeight: 40,
        letterSpacing: -0.25,
    } as TextStyle,

    displaySmall: {
        fontFamily: fontFamily.bold,
        fontSize: 28,
        fontWeight: fontWeight.bold,
        lineHeight: 36,
        letterSpacing: 0,
    } as TextStyle,

    // Headings
    h1: {
        fontFamily: fontFamily.bold,
        fontSize: 24,
        fontWeight: fontWeight.bold,
        lineHeight: 32,
        letterSpacing: 0,
    } as TextStyle,

    h2: {
        fontFamily: fontFamily.semibold,
        fontSize: 20,
        fontWeight: fontWeight.semibold,
        lineHeight: 28,
        letterSpacing: 0,
    } as TextStyle,

    h3: {
        fontFamily: fontFamily.semibold,
        fontSize: 18,
        fontWeight: fontWeight.semibold,
        lineHeight: 24,
        letterSpacing: 0,
    } as TextStyle,

    h4: {
        fontFamily: fontFamily.medium,
        fontSize: 16,
        fontWeight: fontWeight.medium,
        lineHeight: 22,
        letterSpacing: 0.15,
    } as TextStyle,

    // Body text
    bodyLarge: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        fontWeight: fontWeight.regular,
        lineHeight: 24,
        letterSpacing: 0.15,
    } as TextStyle,

    bodyMedium: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
        fontWeight: fontWeight.regular,
        lineHeight: 20,
        letterSpacing: 0.25,
    } as TextStyle,

    bodySmall: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        fontWeight: fontWeight.regular,
        lineHeight: 16,
        letterSpacing: 0.4,
    } as TextStyle,

    // Labels
    labelLarge: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        fontWeight: fontWeight.medium,
        lineHeight: 20,
        letterSpacing: 0.1,
    } as TextStyle,

    labelMedium: {
        fontFamily: fontFamily.medium,
        fontSize: 12,
        fontWeight: fontWeight.medium,
        lineHeight: 16,
        letterSpacing: 0.5,
    } as TextStyle,

    labelSmall: {
        fontFamily: fontFamily.medium,
        fontSize: 11,
        fontWeight: fontWeight.medium,
        lineHeight: 14,
        letterSpacing: 0.5,
    } as TextStyle,

    // Special text styles
    button: {
        fontFamily: fontFamily.semibold,
        fontSize: 14,
        fontWeight: fontWeight.semibold,
        lineHeight: 20,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    } as TextStyle,

    caption: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        fontWeight: fontWeight.regular,
        lineHeight: 16,
        letterSpacing: 0.4,
    } as TextStyle,

    overline: {
        fontFamily: fontFamily.medium,
        fontSize: 10,
        fontWeight: fontWeight.medium,
        lineHeight: 14,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    } as TextStyle,

    // Math-specific
    mathExpression: {
        fontFamily: fontFamily.regular,
        fontSize: 18,
        fontWeight: fontWeight.regular,
        lineHeight: 28,
        letterSpacing: 0,
    } as TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
