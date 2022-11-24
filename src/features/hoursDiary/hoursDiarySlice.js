import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addWeek, getAllWeeks } from '../../services/database/hoursDiary';

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
            console.log("fulfilled called. data = ", action.payload);
            state.isLoading = false;
            state.allWeeks = action.payload;

            // TODO gonna need a utility file for extracting a users weeks and the current week, hours calculations etc...
            // Then when the users weeks is required call the reducer which will load the weeks

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
            console.log("fulfilled called. payload = ", action.payload);
            // Will then need to update the currentWeek on succussful save
            state.currentWeek = action.payload;
            state.isLoading = false;
        })
    }
});

export default hoursDiarySlice.reducer;

export const getWeeks = createAsyncThunk(
    "hoursDiary/getWeeks",
    async(gangId) => {
        try {
           return await getAllWeeks(gangId);
        } catch (error) {
            throw error;
        }
    }
)

export const saveWeek = createAsyncThunk(
    "hoursDiary/saveWeek",
    async(data) => {
        try {
            if(!data.weekId) {
                const week = await addWeek(data);
                return {...week, users: {...data}};
            } else {
                await addWeek(data);
                return data;
            }
        } catch (error) {
            console.log("error while saving week = ", error);
        }
    }
)