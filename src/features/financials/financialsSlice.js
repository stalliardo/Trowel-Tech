import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDeductions } from '../../services/database/liftDeductions';

export const financialsSlice = createSlice({
    name: 'financials',
    initialState: {
        deductionData: [],   
    },

    extraReducers: (builder) => {
        builder.addCase(getAllDeductions.pending, (state) => {});

        builder.addCase(getAllDeductions.fulfilled, (state, action) => {
            state.deductionData = action.payload;
            console.log("deductions from fulfilled = ", state.deductionData);
        });

        builder.addCase(getAllDeductions.rejected, (state) => {
            
        });
    }
})

export const getAllDeductions = createAsyncThunk(
    "financials/getAllDeductions",
    async (plotId) => {
        try {
            const deductions = await getDeductions(plotId);
            return deductions;
        } catch (error) {
            return error;
        }
    }
)

export default financialsSlice.reducer