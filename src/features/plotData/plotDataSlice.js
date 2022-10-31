import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getOnePlot, getAllPlots, savePlotData, editPlot, deletePlot, addInformationDataToDoc } from '../../services/database/plotData';

export const plotDataSlice = createSlice({
    name: 'plotData',
    initialState: {
        isLoading: false,
        allPlots: [],
        singlePlotData: null,
        queryParam: null,
        filteredPlots: null,
    },
    reducers: {
        setSinglePlot: (state, action) => {
            state.singlePlotData = state.allPlots.find((plot) => plot.id === action.payload);
        },

        setQueryParam: (state, action) => {
            state.queryParam = action.payload;
        },

        filterPlots: (state, action) => {
            const filteredPlots = state.allPlots.filter(plot => plot[action.payload.key] === action.payload.value);

            if (filteredPlots.length) {
                state.filteredPlots = filteredPlots;
            } 
        },
        clearFilters: (state) => {
            state.filteredPlots = null;
        },
        clearSinglePlotData: (state) => {
            state.singlePlotData = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPlot.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPlot.fulfilled, (state, action) => {
            state.isLoading = false;
            state.singlePlotData = action.payload;
        });
        builder.addCase(getPlot.rejected, (state) => {
            state.isLoading = false;
        });
        /////////////////////////////////////////////////////////////////////////////////
        builder.addCase(getPlots.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPlots.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allPlots = action.payload;
        });
        builder.addCase(getPlots.rejected, (state) => {
            state.isLoading = false;
        });
        /////////////////////////////////////////////////////////////////////////////////
        builder.addCase(addPlotData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addPlotData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allPlots.push(action.payload);
            state.singlePlotData = action.payload;
        });
        builder.addCase(addPlotData.rejected, (state) => {
            state.isLoading = false;
        });
        /////////////////////////////////////////////////////////////////////////////////
    builder.addCase(edit.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(edit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.singlePlotData = action.payload;
            state.allPlots = state.allPlots.filter(plot => plot.id !== action.payload.id);
            state.allPlots.push(action.payload);
        });
        builder.addCase(edit.rejected, (state) => {
            state.isLoading = false;
        });
        /////////////////////////////////////////////////////////////////////////////////
        builder.addCase(deletePlotData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deletePlotData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allPlots = state.allPlots.filter(plot => plot.id !== action.payload);
        });
        builder.addCase(deletePlotData.rejected, (state) => {
            state.isLoading = false;
        });
        /////////////////////////////////////////////////////////////////////////////////
        builder.addCase(addInformation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addInformation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.singlePlotData.information = action.payload.formData;
            
            state.allPlots = state.allPlots.filter(plot => plot.id !== action.payload.plotData.id);
            
            const plotDataWithInformationObject = {...action.payload.plotData};
            plotDataWithInformationObject.information = action.payload.formData;
            
            state.allPlots.push(plotDataWithInformationObject);
        });
        builder.addCase(addInformation.rejected, (state) => {
            state.isLoading = false;
        });
    }
})

export const { setSinglePlot, setQueryParam, filterPlots, clearFilters, clearSinglePlotData } = plotDataSlice.actions;

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
        console.log("formData from edit = ", formData);
        try {
            await editPlot(formData);
            return formData;
        } catch (error) {
            console.log('Error getting plot data. Error = ', error);
        }
    }
);

export const deletePlotData = createAsyncThunk(
    "plotData/deletePlotData",
    async (id) => {
        try {
            await deletePlot(id);
            return id;
        } catch (error) {
            console.log('Error getting plot data. Error = ', error);
        }
    }
);

export const addInformation = createAsyncThunk(
    "plotData/addInformation",
    async (data) => {
        console.log("infromation data = ", data.formData);
        try {
            await addInformationDataToDoc(data.plotData, data.formData);
            //need to return the formData so it can be added to the local state
            return data;
        } catch (error) {
            console.log('Error getting plot data. Error = ', error);
        }
    }
);

export default plotDataSlice.reducer