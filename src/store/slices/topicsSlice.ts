// Topics Slice - Manages JEE Mathematics topics and learning progress
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SubTopic {
    id: string;
    name: string;
    nameHi: string;
    isCompleted: boolean;
    videoCount: number;
    quizCount: number;
}

export interface Topic {
    id: string;
    name: string;
    nameHi: string;
    icon: string;
    color: string;
    description: string;
    descriptionHi: string;
    subtopics: SubTopic[];
    order: number;
}

export interface TopicsState {
    topics: Topic[];
    currentTopicId: string | null;
    currentSubtopicId: string | null;
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: TopicsState = {
    topics: [],
    currentTopicId: null,
    currentSubtopicId: null,
    isLoading: false,
    error: null,
    searchQuery: '',
};

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        setTopics: (state, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
        },

        setCurrentTopic: (state, action: PayloadAction<string | null>) => {
            state.currentTopicId = action.payload;
        },

        setCurrentSubtopic: (state, action: PayloadAction<string | null>) => {
            state.currentSubtopicId = action.payload;
        },

        markSubtopicComplete: (state, action: PayloadAction<{ topicId: string; subtopicId: string }>) => {
            const topic = state.topics.find((t) => t.id === action.payload.topicId);
            if (topic) {
                const subtopic = topic.subtopics.find((s) => s.id === action.payload.subtopicId);
                if (subtopic) {
                    subtopic.isCompleted = true;
                }
            }
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setTopics,
    setCurrentTopic,
    setCurrentSubtopic,
    markSubtopicComplete,
    setSearchQuery,
    setLoading,
    setError,
} = topicsSlice.actions;

export default topicsSlice.reducer;
