import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPlots, savePlotData } from '../../services/database/plotData';

export const plotDataSlice = createSlice({
    name: 'plotData',
    initialState: {
        isLoading: false,
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlotData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPlotData.fulfilled, (state, action) => {
            state.isLoading = false;
        
        });
        builder.addCase(getPlotData.rejected, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(addPlotData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addPlotData.fulfilled, (state, action) => {
            state.isLoading = false;
        
        });
        builder.addCase(addPlotData.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
})

// export const { increment, decrement, incrementByAmount } = plotDataSlice.actions;

export const getPlotData = createAsyncThunk(
    "plotData/getPlotData",
    async (gangId) => {
        try {
            const response = await getPlots(gangId);
            

            return response;


        } catch (error) {
            console.log('Error getting plot data. Error = ', error);
        }
    }
);

export const addPlotData = createAsyncThunk(
    "plotData/addPlotData",
    async (formData) => {
        try {
            const id = await savePlotData(formData);
            return {...formData, id};
        } catch (error) {
            console.log('Error getting plot data. Error = ', error);
        }
    }
);

export default plotDataSlice.reducer