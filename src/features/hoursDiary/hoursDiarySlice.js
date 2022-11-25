import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addWeek, editWeek, getAllWeeks, getUsersForWeek } from '../../services/database/hoursDiary';
import { extractCurrentWeek } from '../../utils/hoursDiaryUtils';

export const hoursDiarySlice = createSlice({
    name: 'hoursDiary',
    initialState: {
        isLoading: false,
        currentWeek: {},
        allWeeks: [],
        allWeeksForUser: [],
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(getWeeks.pending, (state) => {
            state.isLoading = true;

        })
            .addCase(getWeeks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allWeeks = action.payload;

                if (action.payload.length) {
                    state.currentWeek = extractCurrentWeek(action.payload);
                }
            })
            .addCase(getWeeks.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveWeek.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveWeek.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveWeek.fulfilled, (state, action) => {
                state.currentWeek = action.payload;
                state.isLoading = false;
            })
            .addCase(updateWeek.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateWeek.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateWeek.fulfilled, (state, action) => {
                const index = state.currentWeek.users.findIndex(i => i.id === action.payload.formData.id);
                if(index > -1) {                    
                    state.currentWeek.users[index] = action.payload.formData;
                }
                state.isLoading = false;
            })
            .addCase(getUsersForCurrentWeek.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersForCurrentWeek.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getUsersForCurrentWeek.fulfilled, (state, action) => {
                state.currentWeek.users = action.payload;
                state.isLoading = false;
            })
    }
});

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
            return { weekId, users: data.users };
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