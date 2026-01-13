// User Slice - Manages user authentication and profile state
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProgress {
    topicId: string;
    completedLessons: number;
    totalLessons: number;
    quizzesTaken: number;
    averageScore: number;
}

export interface UserState {
    id: string | null;
    name: string;
    email: string | null;
    isAuthenticated: boolean;
    preferredLanguage: 'en' | 'hi';
    progress: UserProgress[];
    totalStudyTime: number; // in minutes
    streak: number; // consecutive days
    lastActiveDate: string | null;
}

const initialState: UserState = {
    id: null,
    name: 'Student',
    email: null,
    isAuthenticated: false,
    preferredLanguage: 'en',
    progress: [],
    totalStudyTime: 0,
    streak: 0,
    lastActiveDate: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        },

        setPreferredLanguage: (state, action: PayloadAction<'en' | 'hi'>) => {
            state.preferredLanguage = action.payload;
        },

        updateProgress: (state, action: PayloadAction<UserProgress>) => {
            const existingIndex = state.progress.findIndex(
                (p) => p.topicId === action.payload.topicId
            );
            if (existingIndex >= 0) {
                state.progress[existingIndex] = action.payload;
            } else {
                state.progress.push(action.payload);
            }
        },

        addStudyTime: (state, action: PayloadAction<number>) => {
            state.totalStudyTime += action.payload;
        },

        updateStreak: (state, action: PayloadAction<{ date: string; increment: boolean }>) => {
            state.lastActiveDate = action.payload.date;
            if (action.payload.increment) {
                state.streak += 1;
            }
        },

        resetStreak: (state) => {
            state.streak = 0;
        },

        logout: () => initialState,
    },
});

export const {
    setUser,
    setPreferredLanguage,
    updateProgress,
    addStudyTime,
    updateStreak,
    resetStreak,
    logout,
} = userSlice.actions;

export default userSlice.reducer;
