// JEE Math Prep App - Redux Store Configuration
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import slices
import userSlice from './slices/userSlice';
import topicsSlice from './slices/topicsSlice';
import quizSlice from './slices/quizSlice';
import mockTestSlice from './slices/mockTestSlice';
import settingsSlice from './slices/settingsSlice';

// Combine all reducers
const rootReducer = combineReducers({
    user: userSlice,
    topics: topicsSlice,
    quiz: quizSlice,
    mockTest: mockTestSlice,
    settings: settingsSlice,
});

// Configure store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for non-serializable data
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: __DEV__,
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
