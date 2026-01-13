// Button Component - Reusable button with variants and animations
import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
    View,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius, shadows } from '../../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    accessibilityLabel?: string;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    style,
    textStyle,
    accessibilityLabel,
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 150 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    };

    const buttonStyles = getButtonStyles(variant, size, disabled);
    const textStyles = getTextStyles(variant, size, disabled);

    return (
        <AnimatedTouchable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[
                styles.base,
                buttonStyles,
                fullWidth && styles.fullWidth,
                style,
                animatedStyle,
            ]}
            accessibilityLabel={accessibilityLabel || title}
            accessibilityRole="button"
            accessibilityState={{ disabled: disabled || loading }}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? colors.neutral[0] : colors.primary[500]}
                    size="small"
                />
            ) : (
                <View style={styles.content}>
                    {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                    <Text style={[textStyles, textStyle]}>{title}</Text>
                    {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
                </View>
            )}
        </AnimatedTouchable>
    );
};

const getButtonStyles = (variant: ButtonVariant, size: ButtonSize, disabled: boolean): ViewStyle => {
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
        sm: { height: 36, paddingHorizontal: spacing.md },
        md: { height: 44, paddingHorizontal: spacing.lg },
        lg: { height: 52, paddingHorizontal: spacing.xl },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
        primary: {
            backgroundColor: disabled ? colors.neutral[300] : colors.primary[500],
            ...shadows.md,
        },
        secondary: {
            backgroundColor: disabled ? colors.neutral[200] : colors.secondary[500],
            ...shadows.sm,
        },
        outline: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: disabled ? colors.neutral[300] : colors.primary[500],
        },
        ghost: {
            backgroundColor: 'transparent',
        },
        danger: {
            backgroundColor: disabled ? colors.neutral[300] : colors.error,
            ...shadows.md,
        },
    };

    return { ...sizeStyles[size], ...variantStyles[variant] };
};

const getTextStyles = (variant: ButtonVariant, size: ButtonSize, disabled: boolean): TextStyle => {
    const sizeStyles: Record<ButtonSize, TextStyle> = {
        sm: { ...typography.labelMedium },
        md: { ...typography.labelLarge },
        lg: { ...typography.bodyLarge, fontWeight: '600' },
    };

    const variantStyles: Record<ButtonVariant, TextStyle> = {
        primary: { color: disabled ? colors.neutral[500] : colors.neutral[0] },
        secondary: { color: disabled ? colors.neutral[500] : colors.neutral[0] },
        outline: { color: disabled ? colors.neutral[400] : colors.primary[500] },
        ghost: { color: disabled ? colors.neutral[400] : colors.primary[500] },
        danger: { color: disabled ? colors.neutral[500] : colors.neutral[0] },
    };

    return { ...sizeStyles[size], ...variantStyles[variant] };
};

const styles = StyleSheet.create({
    base: {
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullWidth: {
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftIcon: {
        marginRight: spacing.sm,
    },
    rightIcon: {
        marginLeft: spacing.sm,
    },
});

export default Button;
