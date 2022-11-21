import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteDeduction, getDeductions } from '../../services/database/liftDeductions';

export const financialsSlice = createSlice({
    name: 'financials',
    initialState: {
        deductionData: [],   
    },

    reducers: {
        addToDeductionArray: (state, action) => {
            state.deductionData.push(action.payload);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllDeductions.pending, (state) => {});

        builder.addCase(getAllDeductions.fulfilled, (state, action) => {
            state.deductionData = action.payload;
        });

        builder.addCase(getAllDeductions.rejected, (state) => {
            
        });

        //////////////////////////////////////////////////////////////////////////////////////////

        builder.addCase(deleteOneDeduction.fulfilled, (state, action) => {
            state.deductionData = state.deductionData.filter(element => element.id !== action.payload);
        });

        builder.addCase(deleteOneDeduction.rejected, (state, action) => {
            // TODO
        });

        
    }
})

export const { addToDeductionArray } = financialsSlice.actions;

export const getAllDeductions = createAsyncThunk(
    "financials/getAllDeductions",
    async (plotId) => {
        try {
            const deductions = await getDeductions(plotId);
            return deductions;
        } catch (error) {
            throw error;
        }
    }
)

export const deleteOneDeduction = createAsyncThunk(
    "financials/deleteOneDeduction",
    async (data) => {
        try {
            await deleteDeduction({...data});
            return data.deductionId;
        } catch (error) {
            throw error;
        }
    }
)

export default financialsSlice.reducer