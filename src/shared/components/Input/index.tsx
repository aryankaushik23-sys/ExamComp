// Input Component - Reusable text input with variants
import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
    Text,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius, layout } from '../../../theme';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    helperText?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    multiline?: boolean;
    numberOfLines?: number;
    maxLength?: number;
    disabled?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    style?: ViewStyle;
    inputStyle?: TextStyle;
    accessibilityLabel?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const Input: React.FC<InputProps> = ({
    value,
    onChangeText,
    placeholder,
    label,
    error,
    helperText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    multiline = false,
    numberOfLines = 1,
    maxLength,
    disabled = false,
    leftIcon,
    rightIcon,
    onRightIconPress,
    style,
    inputStyle,
    accessibilityLabel,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const focusProgress = useSharedValue(0);

    const animatedBorderStyle = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            focusProgress.value,
            [0, 1],
            [error ? colors.error : colors.border.medium, error ? colors.error : colors.primary[500]]
        ),
    }));

    const handleFocus = () => {
        setIsFocused(true);
        focusProgress.value = withTiming(1, { duration: 200 });
    };

    const handleBlur = () => {
        setIsFocused(false);
        focusProgress.value = withTiming(0, { duration: 200 });
    };

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Text
                    style={[
                        styles.label,
                        error && styles.labelError,
                        isFocused && styles.labelFocused,
                    ]}
                >
                    {label}
                </Text>
            )}

            <AnimatedView
                style={[
                    styles.inputContainer,
                    disabled && styles.inputDisabled,
                    error && styles.inputError,
                    animatedBorderStyle,
                ]}
            >
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.text.tertiary}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    maxLength={maxLength}
                    editable={!disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={[
                        styles.input,
                        multiline && styles.inputMultiline,
                        disabled && styles.inputTextDisabled,
                        inputStyle,
                    ]}
                    accessibilityLabel={accessibilityLabel || label}
                />

                {rightIcon && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        disabled={!onRightIconPress}
                        style={styles.rightIcon}
                    >
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </AnimatedView>

            {(error || helperText) && (
                <Text style={[styles.helperText, error && styles.errorText]}>
                    {error || helperText}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        ...typography.labelMedium,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
    },
    labelFocused: {
        color: colors.primary[500],
    },
    labelError: {
        color: colors.error,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: colors.border.medium,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface.primary,
        minHeight: layout.inputHeight,
        paddingHorizontal: spacing.md,
    },
    inputDisabled: {
        backgroundColor: colors.neutral[100],
        borderColor: colors.border.light,
    },
    inputError: {
        borderColor: colors.error,
        backgroundColor: colors.errorLight,
    },
    input: {
        flex: 1,
        ...typography.bodyMedium,
        color: colors.text.primary,
        paddingVertical: spacing.sm,
    },
    inputMultiline: {
        textAlignVertical: 'top',
        minHeight: 100,
    },
    inputTextDisabled: {
        color: colors.text.disabled,
    },
    leftIcon: {
        marginRight: spacing.sm,
    },
    rightIcon: {
        marginLeft: spacing.sm,
        padding: spacing.xs,
    },
    helperText: {
        ...typography.caption,
        color: colors.text.secondary,
        marginTop: spacing.xs,
    },
    errorText: {
        color: colors.error,
    },
});

export default Input;
