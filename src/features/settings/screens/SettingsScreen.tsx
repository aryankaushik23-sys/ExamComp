// Settings Screen - App settings and preferences
import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography, Card } from '../../../shared/components';
import { colors, spacing, borderRadius } from '../../../theme';
import { useAppSelector, useAppDispatch } from '../../../store';
import { setTheme, setFontSize, updateNotificationSettings } from '../../../store/slices/settingsSlice';
import { RootStackNavigationProp } from '../../../app/navigation/types';

export const SettingsScreen: React.FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.settings);
    const language = settings.language;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Typography variant="h3">←</Typography>
                </TouchableOpacity>
                <Typography variant="h2">{language === 'hi' ? 'सेटिंग्स' : 'Settings'}</Typography>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.container}>
                <Card variant="outlined" style={styles.section}>
                    <Typography variant="labelMedium" color={colors.text.secondary} style={styles.sectionTitle}>
                        {language === 'hi' ? 'सूचनाएं' : 'NOTIFICATIONS'}
                    </Typography>

                    <View style={styles.settingRow}>
                        <Typography variant="bodyLarge">{language === 'hi' ? 'दैनिक अनुस्मारक' : 'Daily Reminder'}</Typography>
                        <Switch
                            value={settings.notifications.dailyReminder}
                            onValueChange={(value) => { dispatch(updateNotificationSettings({ dailyReminder: value })); }}
                            trackColor={{ false: colors.neutral[300], true: colors.primary[200] }}
                            thumbColor={settings.notifications.dailyReminder ? colors.primary[500] : colors.neutral[400]}
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <Typography variant="bodyLarge">{language === 'hi' ? 'प्रश्नोत्तरी अनुस्मारक' : 'Quiz Reminders'}</Typography>
                        <Switch
                            value={settings.notifications.quizReminders}
                            onValueChange={(value) => { dispatch(updateNotificationSettings({ quizReminders: value })); }}
                            trackColor={{ false: colors.neutral[300], true: colors.primary[200] }}
                            thumbColor={settings.notifications.quizReminders ? colors.primary[500] : colors.neutral[400]}
                        />
                    </View>
                </Card>

                <Card variant="outlined" style={styles.section}>
                    <Typography variant="labelMedium" color={colors.text.secondary} style={styles.sectionTitle}>
                        {language === 'hi' ? 'प्रदर्शन' : 'DISPLAY'}
                    </Typography>

                    <View style={styles.settingRow}>
                        <Typography variant="bodyLarge">{language === 'hi' ? 'थीम' : 'Theme'}</Typography>
                        <View style={styles.themeOptions}>
                            {(['light', 'dark', 'system'] as const).map((theme) => (
                                <TouchableOpacity
                                    key={theme}
                                    style={[styles.themeOption, settings.theme === theme && styles.themeOptionActive]}
                                    onPress={() => dispatch(setTheme(theme))}
                                >
                                    <Typography
                                        variant="labelSmall"
                                        color={settings.theme === theme ? colors.neutral[0] : colors.text.primary}
                                    >
                                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                    </Typography>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.settingRow}>
                        <Typography variant="bodyLarge">{language === 'hi' ? 'फ़ॉन्ट आकार' : 'Font Size'}</Typography>
                        <View style={styles.themeOptions}>
                            {(['small', 'medium', 'large'] as const).map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[styles.themeOption, settings.fontSize === size && styles.themeOptionActive]}
                                    onPress={() => dispatch(setFontSize(size))}
                                >
                                    <Typography
                                        variant="labelSmall"
                                        color={settings.fontSize === size ? colors.neutral[0] : colors.text.primary}
                                    >
                                        {size.charAt(0).toUpperCase()}
                                    </Typography>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.light,
    },
    headerSpacer: {
        width: 24,
    },
    container: {
        flex: 1,
        padding: spacing.md,
    },
    section: {
        marginBottom: spacing.lg,
        padding: spacing.md,
    },
    sectionTitle: {
        marginBottom: spacing.md,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    themeOptions: {
        flexDirection: 'row',
        gap: spacing.xs,
    },
    themeOption: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        backgroundColor: colors.neutral[100],
    },
    themeOptionActive: {
        backgroundColor: colors.primary[500],
    },
});

export default SettingsScreen;
