// Settings Slice - Manages app settings and preferences
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large';

export interface DownloadedContent {
    id: string;
    type: 'video' | 'quiz' | 'notes';
    title: string;
    topicId: string;
    sizeBytes: number;
    downloadedAt: string;
}

export interface SettingsState {
    theme: ThemeMode;
    fontSize: FontSize;
    language: 'en' | 'hi';
    notifications: {
        dailyReminder: boolean;
        reminderTime: string; // HH:mm format
        quizReminders: boolean;
        mockTestAlerts: boolean;
    };
    offline: {
        enabled: boolean;
        wifiOnly: boolean;
        downloadedContent: DownloadedContent[];
        totalStorageUsed: number; // in bytes
    };
    accessibility: {
        reduceMotion: boolean;
        hapticFeedback: boolean;
        screenReader: boolean;
    };
    studyGoals: {
        dailyStudyMinutes: number;
        weeklyQuizzes: number;
        monthlyMockTests: number;
    };
}

const initialState: SettingsState = {
    theme: 'system',
    fontSize: 'medium',
    language: 'en',
    notifications: {
        dailyReminder: true,
        reminderTime: '09:00',
        quizReminders: true,
        mockTestAlerts: true,
    },
    offline: {
        enabled: true,
        wifiOnly: true,
        downloadedContent: [],
        totalStorageUsed: 0,
    },
    accessibility: {
        reduceMotion: false,
        hapticFeedback: true,
        screenReader: false,
    },
    studyGoals: {
        dailyStudyMinutes: 60,
        weeklyQuizzes: 5,
        monthlyMockTests: 4,
    },
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.theme = action.payload;
        },

        setFontSize: (state, action: PayloadAction<FontSize>) => {
            state.fontSize = action.payload;
        },

        setLanguage: (state, action: PayloadAction<'en' | 'hi'>) => {
            state.language = action.payload;
        },

        updateNotificationSettings: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
            state.notifications = { ...state.notifications, ...action.payload };
        },

        updateOfflineSettings: (state, action: PayloadAction<Partial<Omit<SettingsState['offline'], 'downloadedContent' | 'totalStorageUsed'>>>) => {
            state.offline = { ...state.offline, ...action.payload };
        },

        addDownloadedContent: (state, action: PayloadAction<DownloadedContent>) => {
            state.offline.downloadedContent.push(action.payload);
            state.offline.totalStorageUsed += action.payload.sizeBytes;
        },

        removeDownloadedContent: (state, action: PayloadAction<string>) => {
            const index = state.offline.downloadedContent.findIndex(c => c.id === action.payload);
            if (index >= 0) {
                state.offline.totalStorageUsed -= state.offline.downloadedContent[index].sizeBytes;
                state.offline.downloadedContent.splice(index, 1);
            }
        },

        updateAccessibilitySettings: (state, action: PayloadAction<Partial<SettingsState['accessibility']>>) => {
            state.accessibility = { ...state.accessibility, ...action.payload };
        },

        updateStudyGoals: (state, action: PayloadAction<Partial<SettingsState['studyGoals']>>) => {
            state.studyGoals = { ...state.studyGoals, ...action.payload };
        },

        resetSettings: () => initialState,
    },
});

export const {
    setTheme,
    setFontSize,
    setLanguage,
    updateNotificationSettings,
    updateOfflineSettings,
    addDownloadedContent,
    removeDownloadedContent,
    updateAccessibilitySettings,
    updateStudyGoals,
    resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
