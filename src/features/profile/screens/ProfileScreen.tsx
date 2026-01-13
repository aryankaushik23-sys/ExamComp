// Profile Screen - User profile and settings
import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Typography, Card, Button } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows, gradients } from '../../../theme';
import { useAppSelector, useAppDispatch } from '../../../store';
import { setLanguage } from '../../../store/slices/settingsSlice';
import { RootStackNavigationProp } from '../../../app/navigation/types';

interface MenuItemProps {
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
    rightElement?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightElement,
}) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.menuItemIcon}>
            <Typography variant="h3">{icon}</Typography>
        </View>
        <View style={styles.menuItemContent}>
            <Typography variant="bodyLarge">{title}</Typography>
            {subtitle && (
                <Typography variant="caption" color={colors.text.secondary}>{subtitle}</Typography>
            )}
        </View>
        {rightElement || (showArrow && (
            <Typography variant="h3" color={colors.text.tertiary}>›</Typography>
        ))}
    </TouchableOpacity>
);

export const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const settings = useAppSelector((state) => state.settings);
    const quizHistory = useAppSelector((state) => state.quiz.quizHistory);
    const testHistory = useAppSelector((state) => state.mockTest.testHistory);

    const language = settings.language;

    const totalStudyHours = Math.floor(user.totalStudyTime / 60);
    const totalQuizzes = quizHistory.length;
    const totalTests = testHistory.length;

    const handleLanguageToggle = () => {
        dispatch(setLanguage(language === 'en' ? 'hi' : 'en'));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <LinearGradient
                    colors={gradients.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <View style={styles.avatarContainer}>
                        <Typography variant="displayLarge" color={colors.neutral[0]}>👤</Typography>
                    </View>
                    <Typography variant="h1" color={colors.neutral[0]} style={styles.userName}>
                        {user.name}
                    </Typography>
                    <Typography variant="bodyMedium" color={colors.neutral[200]}>
                        {language === 'hi' ? 'JEE उम्मीदवार' : 'JEE Aspirant'}
                    </Typography>

                    {/* Streak Badge */}
                    <View style={styles.streakBadge}>
                        <Typography variant="h3">🔥</Typography>
                        <Typography variant="labelLarge" color={colors.neutral[0]}>
                            {user.streak} {language === 'hi' ? 'दिन की स्ट्रीक' : 'Day Streak'}
                        </Typography>
                    </View>
                </LinearGradient>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <Card variant="elevated" style={styles.statCard}>
                        <Typography variant="h1" color={colors.primary[500]}>{totalStudyHours}</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'घंटे पढ़ाई' : 'Hours Studied'}
                        </Typography>
                    </Card>
                    <Card variant="elevated" style={styles.statCard}>
                        <Typography variant="h1" color={colors.secondary[500]}>{totalQuizzes}</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'प्रश्नोत्तरी' : 'Quizzes'}
                        </Typography>
                    </Card>
                    <Card variant="elevated" style={styles.statCard}>
                        <Typography variant="h1" color={colors.accent[500]}>{totalTests}</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'मॉक टेस्ट' : 'Mock Tests'}
                        </Typography>
                    </Card>
                </View>

                {/* Language Toggle */}
                <Card variant="elevated" style={styles.languageCard}>
                    <View style={styles.languageRow}>
                        <View style={styles.languageInfo}>
                            <Typography variant="h4">🌐 {language === 'hi' ? 'भाषा' : 'Language'}</Typography>
                            <Typography variant="caption" color={colors.text.secondary}>
                                {language === 'hi' ? 'हिंदी' : 'English'}
                            </Typography>
                        </View>
                        <View style={styles.languageToggle}>
                            <Typography variant="labelMedium" color={language === 'en' ? colors.primary[500] : colors.text.tertiary}>
                                EN
                            </Typography>
                            <Switch
                                value={language === 'hi'}
                                onValueChange={handleLanguageToggle}
                                trackColor={{ false: colors.primary[200], true: colors.primary[200] }}
                                thumbColor={colors.primary[500]}
                            />
                            <Typography variant="labelMedium" color={language === 'hi' ? colors.primary[500] : colors.text.tertiary}>
                                हि
                            </Typography>
                        </View>
                    </View>
                </Card>

                {/* Menu Items */}
                <View style={styles.menuSection}>
                    <Typography variant="labelMedium" color={colors.text.secondary} style={styles.menuSectionTitle}>
                        {language === 'hi' ? 'सीखना' : 'LEARNING'}
                    </Typography>
                    <Card variant="outlined" style={styles.menuCard}>
                        <MenuItem
                            icon="📊"
                            title={language === 'hi' ? 'मेरी प्रगति' : 'My Progress'}
                            subtitle={language === 'hi' ? 'विस्तृत विश्लेषण देखें' : 'View detailed analytics'}
                            onPress={() => { }}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon="📥"
                            title={language === 'hi' ? 'डाउनलोड' : 'Downloads'}
                            subtitle={language === 'hi' ? 'ऑफ़लाइन सामग्री प्रबंधित करें' : 'Manage offline content'}
                            onPress={() => navigation.navigate('Downloads')}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon="🎯"
                            title={language === 'hi' ? 'अध्ययन लक्ष्य' : 'Study Goals'}
                            subtitle={language === 'hi' ? 'दैनिक लक्ष्य निर्धारित करें' : 'Set your daily targets'}
                            onPress={() => { }}
                        />
                    </Card>
                </View>

                <View style={styles.menuSection}>
                    <Typography variant="labelMedium" color={colors.text.secondary} style={styles.menuSectionTitle}>
                        {language === 'hi' ? 'सेटिंग्स' : 'SETTINGS'}
                    </Typography>
                    <Card variant="outlined" style={styles.menuCard}>
                        <MenuItem
                            icon="🔔"
                            title={language === 'hi' ? 'सूचनाएं' : 'Notifications'}
                            onPress={() => { }}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon="🎨"
                            title={language === 'hi' ? 'थीम' : 'Theme'}
                            subtitle={settings.theme === 'system' ? 'System' : settings.theme}
                            onPress={() => { }}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon="♿"
                            title={language === 'hi' ? 'अभिगम्यता' : 'Accessibility'}
                            onPress={() => { }}
                        />
                    </Card>
                </View>

                <View style={styles.menuSection}>
                    <Typography variant="labelMedium" color={colors.text.secondary} style={styles.menuSectionTitle}>
                        {language === 'hi' ? 'सहायता' : 'SUPPORT'}
                    </Typography>
                    <Card variant="outlined" style={styles.menuCard}>
                        <MenuItem
                            icon="❓"
                            title={language === 'hi' ? 'सहायता केंद्र' : 'Help Center'}
                            onPress={() => { }}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon="📝"
                            title={language === 'hi' ? 'फीडबैक भेजें' : 'Send Feedback'}
                            onPress={() => { }}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon="ℹ️"
                            title={language === 'hi' ? 'ऐप के बारे में' : 'About App'}
                            subtitle="Version 1.0.0"
                            onPress={() => { }}
                        />
                    </Card>
                </View>

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
        paddingVertical: spacing['2xl'],
        paddingHorizontal: spacing.md,
        alignItems: 'center',
        borderBottomLeftRadius: borderRadius['2xl'],
        borderBottomRightRadius: borderRadius['2xl'],
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    userName: {
        marginBottom: spacing.xs,
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        marginTop: spacing.md,
        gap: spacing.sm,
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.md,
        marginTop: -spacing.xl,
        gap: spacing.sm,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: spacing.md,
    },
    languageCard: {
        marginHorizontal: spacing.md,
        marginTop: spacing.lg,
        padding: spacing.md,
    },
    languageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    languageInfo: {
        flex: 1,
    },
    languageToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    menuSection: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing.md,
    },
    menuSectionTitle: {
        marginBottom: spacing.sm,
        marginLeft: spacing.sm,
    },
    menuCard: {
        padding: 0,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    menuItemIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        backgroundColor: colors.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    menuItemContent: {
        flex: 1,
    },
    menuDivider: {
        height: 1,
        backgroundColor: colors.border.light,
        marginLeft: 72,
    },
    bottomPadding: {
        height: spacing['3xl'],
    },
});

export default ProfileScreen;
