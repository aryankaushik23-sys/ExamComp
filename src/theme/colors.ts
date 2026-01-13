// JEE Math Prep App - Design System Colors
// Modern, vibrant palette with accessibility considerations

export const colors = {
    // Primary - Deep Blue (Trust, Intelligence, Education)
    primary: {
        50: '#E3F2FD',
        100: '#BBDEFB',
        200: '#90CAF9',
        300: '#64B5F6',
        400: '#42A5F5',
        500: '#2196F3',
        600: '#1E88E5',
        700: '#1976D2',
        800: '#1565C0',
        900: '#0D47A1',
    },

    // Secondary - Vibrant Teal (Growth, Focus, Success)
    secondary: {
        50: '#E0F2F1',
        100: '#B2DFDB',
        200: '#80CBC4',
        300: '#4DB6AC',
        400: '#26A69A',
        500: '#009688',
        600: '#00897B',
        700: '#00796B',
        800: '#00695C',
        900: '#004D40',
    },

    // Accent - Warm Orange (Energy, Action, Motivation)
    accent: {
        50: '#FFF3E0',
        100: '#FFE0B2',
        200: '#FFCC80',
        300: '#FFB74D',
        400: '#FFA726',
        500: '#FF9800',
        600: '#FB8C00',
        700: '#F57C00',
        800: '#EF6C00',
        900: '#E65100',
    },

    // Purple - For AI/Chat features
    purple: {
        50: '#F3E5F5',
        100: '#E1BEE7',
        200: '#CE93D8',
        300: '#BA68C8',
        400: '#AB47BC',
        500: '#9C27B0',
        600: '#8E24AA',
        700: '#7B1FA2',
        800: '#6A1B9A',
        900: '#4A148C',
    },

    // Semantic Colors
    success: '#4CAF50',
    successLight: '#E8F5E9',
    warning: '#FFC107',
    warningLight: '#FFF8E1',
    error: '#F44336',
    errorLight: '#FFEBEE',
    info: '#2196F3',
    infoLight: '#E3F2FD',

    // Difficulty Levels
    difficulty: {
        easy: '#4CAF50',
        medium: '#FF9800',
        hard: '#F44336',
    },

    // Neutrals - Carefully crafted for readability
    neutral: {
        0: '#FFFFFF',
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        1000: '#000000',
    },

    // App-specific
    background: {
        primary: '#FAFAFA',
        secondary: '#FFFFFF',
        tertiary: '#F5F5F5',
    },

    surface: {
        primary: '#FFFFFF',
        elevated: '#FFFFFF',
    },

    text: {
        primary: '#212121',
        secondary: '#616161',
        tertiary: '#9E9E9E',
        disabled: '#BDBDBD',
        inverse: '#FFFFFF',
    },

    border: {
        light: '#E0E0E0',
        medium: '#BDBDBD',
        dark: '#9E9E9E',
    },

    // Overlay colors
    overlay: {
        light: 'rgba(0, 0, 0, 0.1)',
        medium: 'rgba(0, 0, 0, 0.3)',
        dark: 'rgba(0, 0, 0, 0.5)',
    },
} as const;

// Gradient presets for premium UI elements
export const gradients = {
    primary: ['#1976D2', '#2196F3', '#42A5F5'],
    secondary: ['#00796B', '#009688', '#26A69A'],
    accent: ['#F57C00', '#FF9800', '#FFA726'],
    purple: ['#7B1FA2', '#9C27B0', '#AB47BC'],
    success: ['#388E3C', '#4CAF50', '#66BB6A'],
    premium: ['#1976D2', '#7B1FA2', '#F57C00'],
    dark: ['#212121', '#424242', '#616161'],
} as const;

export type ColorScheme = typeof colors;
export type GradientScheme = typeof gradients;
