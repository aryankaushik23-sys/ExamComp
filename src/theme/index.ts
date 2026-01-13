// JEE Math Prep App - Theme Export
// Unified theme object for consistent styling

export * from './colors';
export * from './typography';
export * from './spacing';

import { colors, gradients } from './colors';
import { typography, fontFamily, fontWeight } from './typography';
import { spacing, borderRadius, shadows, layout, animation } from './spacing';

export const theme = {
    colors,
    gradients,
    typography,
    fontFamily,
    fontWeight,
    spacing,
    borderRadius,
    shadows,
    layout,
    animation,
} as const;

export type Theme = typeof theme;

export default theme;
