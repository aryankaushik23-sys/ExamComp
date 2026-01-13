// Card Component - Reusable card container with variants
import React from 'react';
import {
    View,
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows } from '../../../theme';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

interface CardProps {
    children: React.ReactNode;
    variant?: CardVariant;
    onPress?: () => void;
    style?: ViewStyle;
    padding?: keyof typeof spacing;
    disabled?: boolean;
    accessibilityLabel?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'elevated',
    onPress,
    style,
    padding = 'md',
    disabled = false,
    accessibilityLabel,
}) => {
    const pressed = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: interpolate(pressed.value, [0, 1], [1, 0.98]) },
        ],
        opacity: interpolate(pressed.value, [0, 1], [1, 0.9]),
    }));

    const variantStyles = getVariantStyles(variant);

    if (onPress) {
        return (
            <AnimatedPressable
                onPressIn={() => {
                    pressed.value = withSpring(1, { damping: 15, stiffness: 200 });
                }}
                onPressOut={() => {
                    pressed.value = withSpring(0, { damping: 15, stiffness: 200 });
                }}
                onPress={onPress}
                disabled={disabled}
                style={[
                    styles.base,
                    variantStyles,
                    { padding: spacing[padding] },
                    disabled && styles.disabled,
                    style,
                    animatedStyle,
                ]}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
            >
                {children}
            </AnimatedPressable>
        );
    }

    return (
        <View
            style={[
                styles.base,
                variantStyles,
                { padding: spacing[padding] },
                style,
            ]}
            accessibilityLabel={accessibilityLabel}
        >
            {children}
        </View>
    );
};

const getVariantStyles = (variant: CardVariant): ViewStyle => {
    switch (variant) {
        case 'elevated':
            return {
                backgroundColor: colors.surface.primary,
                ...shadows.md,
            };
        case 'outlined':
            return {
                backgroundColor: colors.surface.primary,
                borderWidth: 1,
                borderColor: colors.border.light,
            };
        case 'filled':
            return {
                backgroundColor: colors.neutral[100],
            };
        default:
            return {};
    }
};

const styles = StyleSheet.create({
    base: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    disabled: {
        opacity: 0.6,
    },
});

export default Card;
