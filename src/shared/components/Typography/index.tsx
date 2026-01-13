// Typography Component - Reusable text with variants
import React from 'react';
import { Text, TextStyle, StyleSheet, TextProps } from 'react-native';
import { typography, colors, TypographyVariant } from '../../../theme';

interface TypographyProps extends TextProps {
    variant?: TypographyVariant;
    color?: string;
    align?: 'left' | 'center' | 'right';
    children: React.ReactNode;
    style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
    variant = 'bodyMedium',
    color = colors.text.primary,
    align = 'left',
    children,
    style,
    ...props
}) => {
    return (
        <Text
            style={[
                typography[variant],
                { color, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

// Convenience components
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h1" accessibilityRole="header" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h2" accessibilityRole="header" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h3" accessibilityRole="header" {...props} />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="bodyMedium" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="caption" color={colors.text.secondary} {...props} />
);

export const Label: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="labelMedium" {...props} />
);

export default Typography;
