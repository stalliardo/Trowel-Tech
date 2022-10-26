import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getOnePlot, getAllPlots, savePlotData, editPlot } from '../../services/database/plotData';

export const plotDataSlice = createSlice({
    name: 'plotData',
    initialState: {
        isLoading: false,
        allPlots: [],
        singlePlotData: null,
    },
    reducers: {
        setSinglePlot: (state, action) => {
            state.singlePlotData = state.allPlots.find((plot) => plot.id === action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPlot.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPlot.fulfilled, (state, action) => {
            state.isLoading = false;
            state.singlePlotData = action.payload;
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

        builder.addCase(edit.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(edit.fulfilled, (state, action) => {
            state.isLoading = false;

        });
        builder.addCase(edit.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
})

export const { setSinglePlot } = plotDataSlice.actions;

export const getPlot = createAsyncThunk(
    "plotData/getPlot",
    async (plotId) => {
        try {
            const response = await getOnePlot(plotId);

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

export const edit = createAsyncThunk(
    "plotData/edit",
    async (formData) => {
        try {
            await editPlot(formData);
            // return { ...formData, id };
        } catch (error) {
            console.log('Error getting plot data. Error = ', error);
        }
    }
);

export default plotDataSlice.reducer