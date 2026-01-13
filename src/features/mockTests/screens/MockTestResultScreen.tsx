// Mock Test Result Screen - Display mock test results with analytics
import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Typography, Card, Button } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows, gradients } from '../../../theme';
import { MockTestResultScreenProps } from '../../../app/navigation/types';
import { useAppSelector } from '../../../store';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const MockTestResultScreen: React.FC = () => {
    const route = useRoute<MockTestResultScreenProps['route']>();
    const navigation = useNavigation<MockTestResultScreenProps['navigation']>();
    const language = useAppSelector((state) => state.settings.language);

    // Mock result data
    const result = {
        totalMarks: 100,
        obtainedMarks: 72,
        correctAnswers: 18,
        wrongAnswers: 5,
        unanswered: 2,
        timeTaken: 52, // minutes
        percentile: 85,
    };

    const percentage = Math.round((result.obtainedMarks / result.totalMarks) * 100);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <LinearGradient
                    colors={gradients.primary}
                    style={styles.header}
                >
                    <Typography variant="h3" color={colors.neutral[0]}>
                        {language === 'hi' ? 'परीक्षा परिणाम' : 'Test Result'}
                    </Typography>
                    <View style={styles.scoreDisplay}>
                        <Typography variant="displayLarge" color={colors.neutral[0]}>
                            {result.obtainedMarks}
                        </Typography>
                        <Typography variant="h2" color={colors.neutral[200]}>
                            /{result.totalMarks}
                        </Typography>
                    </View>
                    <Typography variant="bodyMedium" color={colors.neutral[100]}>
                        {language === 'hi' ? 'कुल प्राप्तांक' : 'Total Score'}
                    </Typography>
                </LinearGradient>

                {/* Percentile Card */}
                <Animated.View entering={FadeInUp.delay(100)}>
                    <Card variant="elevated" style={styles.percentileCard}>
                        <View style={styles.percentileContent}>
                            <Typography variant="displayMedium" color={colors.primary[500]}>
                                {result.percentile}%
                            </Typography>
                            <Typography variant="bodyMedium" color={colors.text.secondary}>
                                {language === 'hi' ? 'पर्सेंटाइल' : 'Percentile'}
                            </Typography>
                        </View>
                        <Typography variant="caption" color={colors.text.tertiary} align="center">
                            {language === 'hi'
                                ? `आप ${result.percentile}% छात्रों से बेहतर हैं`
                                : `You scored better than ${result.percentile}% of students`
                            }
                        </Typography>
                    </Card>
                </Animated.View>

                {/* Stats Grid */}
                <Animated.View entering={FadeInDown.delay(200)} style={styles.statsGrid}>
                    <Card variant="outlined" style={styles.statCard}>
                        <Typography variant="h2" color={colors.success}>{result.correctAnswers}</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'सही' : 'Correct'}
                        </Typography>
                    </Card>
                    <Card variant="outlined" style={styles.statCard}>
                        <Typography variant="h2" color={colors.error}>{result.wrongAnswers}</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'गलत' : 'Wrong'}
                        </Typography>
                    </Card>
                    <Card variant="outlined" style={styles.statCard}>
                        <Typography variant="h2" color={colors.neutral[500]}>{result.unanswered}</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'छोड़े गए' : 'Skipped'}
                        </Typography>
                    </Card>
                    <Card variant="outlined" style={styles.statCard}>
                        <Typography variant="h2" color={colors.primary[500]}>{result.timeTaken}m</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'समय' : 'Time Taken'}
                        </Typography>
                    </Card>
                </Animated.View>

                {/* Marks Breakdown */}
                <Animated.View entering={FadeInDown.delay(300)}>
                    <Card variant="elevated" style={styles.breakdownCard}>
                        <Typography variant="h4" style={styles.breakdownTitle}>
                            {language === 'hi' ? 'अंक विवरण' : 'Marks Breakdown'}
                        </Typography>

                        <View style={styles.breakdownRow}>
                            <Typography variant="bodyMedium">
                                {language === 'hi' ? 'सही उत्तर' : 'Correct Answers'}
                            </Typography>
                            <Typography variant="labelLarge" color={colors.success}>
                                +{result.correctAnswers * 4}
                            </Typography>
                        </View>

                        <View style={styles.breakdownRow}>
                            <Typography variant="bodyMedium">
                                {language === 'hi' ? 'गलत उत्तर' : 'Wrong Answers'}
                            </Typography>
                            <Typography variant="labelLarge" color={colors.error}>
                                -{result.wrongAnswers * 1}
                            </Typography>
                        </View>

                        <View style={[styles.breakdownRow, styles.totalRow]}>
                            <Typography variant="h4">
                                {language === 'hi' ? 'कुल' : 'Total'}
                            </Typography>
                            <Typography variant="h3" color={colors.primary[500]}>
                                {result.obtainedMarks}
                            </Typography>
                        </View>
                    </Card>
                </Animated.View>

                {/* Actions */}
                <Animated.View entering={FadeInUp.delay(400)} style={styles.actions}>
                    <Button
                        title={language === 'hi' ? 'समाधान देखें' : 'View Solutions'}
                        variant="primary"
                        size="lg"
                        fullWidth
                        onPress={() => { }}
                    />
                    <Button
                        title={language === 'hi' ? 'होम पर जाएं' : 'Back to Home'}
                        variant="outline"
                        size="lg"
                        fullWidth
                        onPress={() => navigation.navigate('MainTabs')}
                    />
                </Animated.View>

                <View style={styles.bottomPadding} />
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
    header: {
        alignItems: 'center',
        paddingVertical: spacing['2xl'],
        paddingHorizontal: spacing.md,
        borderBottomLeftRadius: borderRadius['2xl'],
        borderBottomRightRadius: borderRadius['2xl'],
    },
    scoreDisplay: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: spacing.md,
    },
    percentileCard: {
        marginHorizontal: spacing.md,
        marginTop: -spacing.xl,
        padding: spacing.lg,
        alignItems: 'center',
    },
    percentileContent: {
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: spacing.md,
        gap: spacing.sm,
    },
    statCard: {
        width: (SCREEN_WIDTH - spacing.md * 2 - spacing.sm * 3) / 2,
        alignItems: 'center',
        padding: spacing.md,
    },
    breakdownCard: {
        marginHorizontal: spacing.md,
        padding: spacing.lg,
    },
    breakdownTitle: {
        marginBottom: spacing.md,
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.light,
    },
    totalRow: {
        borderBottomWidth: 0,
        marginTop: spacing.sm,
        paddingTop: spacing.md,
        borderTopWidth: 2,
        borderTopColor: colors.neutral[200],
    },
    actions: {
        padding: spacing.md,
        gap: spacing.md,
    },
    bottomPadding: {
        height: spacing['2xl'],
    },
});

export default MockTestResultScreen;
