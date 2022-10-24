import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllPlots, savePlotData } from '../../services/database/plotData';

export const plotDataSlice = createSlice({
    name: 'plotData',
    initialState: {
        isLoading: false,
        allPlots: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlot.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPlot.fulfilled, (state, action) => {
            state.isLoading = false;

        });
        builder.addCase(getPlot.rejected, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getPlots.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPlots.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allPlots = action.payload;

        });
        builder.addCase(getPlots.rejected, (state, action) => {
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

export const getPlot = createAsyncThunk(
    "plotData/getPlot",
    async (gangId) => {
        try {
            const response = await getPlot(gangId);


            return response;


        } catch (error) {
            console.log('Error getting plot data. Error = ', error);
        }
    }
);

export const getPlots = createAsyncThunk(
    "plotData/getPlots",
    async (gangId) => {
        try {
            const response = await getAllPlots(gangId);
            
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
            return { ...formData, id };
        } catch (error) {
            console.log('Error getting plot data. Error = ', error);
        }
    }
);

export default plotDataSlice.reducer