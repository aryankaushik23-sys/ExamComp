// Quiz Result Screen - Display quiz results with score and explanations
import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Typography, Card, Button } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows, gradients } from '../../../theme';
import { QuizResultScreenProps } from '../../../app/navigation/types';
import { useAppSelector } from '../../../store';

export const QuizResultScreen: React.FC = () => {
    const route = useRoute<QuizResultScreenProps['route']>();
    const navigation = useNavigation<QuizResultScreenProps['navigation']>();
    const language = useAppSelector((state) => state.settings.language);

    const { score, total } = route.params;
    const percentage = Math.round((score / total) * 100);

    const getResultMessage = () => {
        if (percentage >= 80) {
            return {
                emoji: '🎉',
                message: language === 'hi' ? 'शानदार!' : 'Excellent!',
                color: colors.success
            };
        } else if (percentage >= 60) {
            return {
                emoji: '👍',
                message: language === 'hi' ? 'अच्छा काम!' : 'Good Job!',
                color: colors.primary[500]
            };
        } else if (percentage >= 40) {
            return {
                emoji: '💪',
                message: language === 'hi' ? 'और अभ्यास करें' : 'Keep Practicing!',
                color: colors.warning
            };
        } else {
            return {
                emoji: '📚',
                message: language === 'hi' ? 'और पढ़ाई करें' : 'Study More!',
                color: colors.error
            };
        }
    };

    const result = getResultMessage();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {/* Result Header */}
                <Animated.View entering={FadeInDown.delay(100)}>
                    <LinearGradient
                        colors={percentage >= 60 ? gradients.success : gradients.primary}
                        style={styles.header}
                    >
                        <Typography variant="displayLarge">{result.emoji}</Typography>
                        <Typography variant="h1" color={colors.neutral[0]} style={styles.resultMessage}>
                            {result.message}
                        </Typography>
                    </LinearGradient>
                </Animated.View>

                {/* Score Card */}
                <Animated.View entering={FadeInUp.delay(200)}>
                    <Card variant="elevated" style={styles.scoreCard}>
                        <View style={styles.scoreCircle}>
                            <Typography variant="displayLarge" color={result.color}>
                                {percentage}%
                            </Typography>
                            <Typography variant="caption" color={colors.text.secondary}>
                                {language === 'hi' ? 'स्कोर' : 'Score'}
                            </Typography>
                        </View>

                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Typography variant="h2" color={colors.success}>{score}</Typography>
                                <Typography variant="caption" color={colors.text.secondary}>
                                    {language === 'hi' ? 'सही' : 'Correct'}
                                </Typography>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Typography variant="h2" color={colors.error}>{total - score}</Typography>
                                <Typography variant="caption" color={colors.text.secondary}>
                                    {language === 'hi' ? 'गलत' : 'Wrong'}
                                </Typography>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Typography variant="h2" color={colors.primary[500]}>{total}</Typography>
                                <Typography variant="caption" color={colors.text.secondary}>
                                    {language === 'hi' ? 'कुल' : 'Total'}
                                </Typography>
                            </View>
                        </View>
                    </Card>
                </Animated.View>

                {/* Actions */}
                <Animated.View entering={FadeInUp.delay(300)} style={styles.actions}>
                    <Button
                        title={language === 'hi' ? 'समाधान देखें' : 'View Solutions'}
                        variant="outline"
                        size="lg"
                        fullWidth
                        onPress={() => { }}
                        style={styles.actionButton}
                    />
                    <Button
                        title={language === 'hi' ? 'फिर से प्रयास करें' : 'Try Again'}
                        variant="primary"
                        size="lg"
                        fullWidth
                        onPress={() => navigation.goBack()}
                        style={styles.actionButton}
                    />
                    <Button
                        title={language === 'hi' ? 'होम पर जाएं' : 'Go to Home'}
                        variant="ghost"
                        size="lg"
                        fullWidth
                        onPress={() => navigation.navigate('MainTabs')}
                    />
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: spacing.md,
    },
    header: {
        alignItems: 'center',
        paddingVertical: spacing['3xl'],
        borderRadius: borderRadius['2xl'],
        marginBottom: spacing.lg,
    },
    resultMessage: {
        marginTop: spacing.md,
    },
    scoreCard: {
        alignItems: 'center',
        padding: spacing.xl,
        marginBottom: spacing.lg,
    },
    scoreCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colors.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border.light,
    },
    actions: {
        gap: spacing.md,
    },
    actionButton: {
        marginBottom: spacing.sm,
    },
});

export default QuizResultScreen;
