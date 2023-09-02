import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addWeek, deleteWeekDoc, editWeek, getAllWeeks, getUsersForWeek } from '../../services/database/hoursDiary';
import { extractCurrentWeek } from '../../utils/hoursDiaryUtils';
import { handlePendingAndRejected } from '../../utils/reduxUtils';

export const hoursDiarySlice = createSlice({
    name: 'hoursDiary',
    initialState: {
        isLoading: false,
        currentWeek: {},
        allWeeks: [],
        allWeeksForUser: [],
    },
    reducers: {
        clearCurrentWeek: (state) => {
            state.currentWeek = {};
        },

        loadCurrentWeek: (state, action) => {
            state.currentWeek = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getWeeks.pending, (state, action) => handlePendingAndRejected(state, action))
            .addCase(getWeeks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allWeeks = action.payload;

                if (action.payload.length) {
                    state.currentWeek = extractCurrentWeek(action.payload);
                }
            })
            .addCase(getWeeks.rejected, (state, action) => handlePendingAndRejected(state, action))
            .addCase(saveWeek.pending, (state, action) => handlePendingAndRejected(state, action))
            .addCase(saveWeek.rejected, (state, action) => handlePendingAndRejected(state, action))
            .addCase(saveWeek.fulfilled, (state, action) => {
                state.currentWeek = action.payload;
                state.allWeeks.push(action.payload);
                state.isLoading = false;
            })
            .addCase(updateWeek.pending, (state, action) => handlePendingAndRejected(state, action))
            .addCase(updateWeek.rejected, (state, action) => handlePendingAndRejected(state, action))
            .addCase(updateWeek.fulfilled, (state, action) => {
                const index = state.currentWeek.users.findIndex(i => i.id === action.payload.formData.id);
                if(index > -1) {                    
                    state.currentWeek.users[index] = action.payload.formData;
                }
                state.isLoading = false;
            })
            .addCase(getUsersForCurrentWeek.pending, (state, action) => handlePendingAndRejected(state, action))
            .addCase(getUsersForCurrentWeek.rejected, (state, action) => handlePendingAndRejected(state, action))
            .addCase(getUsersForCurrentWeek.fulfilled, (state, action) => {
                state.currentWeek.users = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteWeek.pending, (state, action) => handlePendingAndRejected(state, action))
            .addCase(deleteWeek.rejected, (state, action) => handlePendingAndRejected(state, action))
            .addCase(deleteWeek.fulfilled, (state, action) => {
                state.allWeeks = state.allWeeks.filter(w => w.id !== action.payload);

                if(state.allWeeks.length) {
                    state.currentWeek = extractCurrentWeek(state.allWeeks);
                } else {
                    state.currentWeek = {};
                    state.allWeeks = [];
                }
                state.isLoading = false;
            })
    }
});

export const {clearCurrentWeek, loadCurrentWeek} = hoursDiarySlice.actions;

export default hoursDiarySlice.reducer;

export const getWeeks = createAsyncThunk(
    "hoursDiary/getWeeks",
    async (gangId) => {
        try {
            return await getAllWeeks(gangId);
        } catch (error) {
            throw error;
        }
    }
)

export const saveWeek = createAsyncThunk(
    "hoursDiary/saveWeek",
    async (data) => {
        try {
            const weekId = await addWeek(data);
            return { id: weekId, gangId: data.gangId, weekEnding: data.weekEnding, users: data.users };
        } catch (error) {
            throw error;
        }
    }
)

export const updateWeek = createAsyncThunk(
    "hoursDiary/updateWeek",
    async (data) => {
        try {
            await editWeek(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const getUsersForCurrentWeek = createAsyncThunk(
    "hoursDiary/getUsersForCurrentWeek",
    async (weekId) => {
        try {
            return await getUsersForWeek(weekId);
        } catch (error) {
            throw error;
        }
    }
)

export const deleteWeek = createAsyncThunk(
    "hoursDiary/deleteWeek",
    async (data) => {
        try {
            await deleteWeekDoc(data);
            return data.weekId;
        } catch (error) {
            throw error;
        }
    }
)