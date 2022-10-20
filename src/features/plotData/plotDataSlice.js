import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPlots } from '../../services/database/plotData';

export const plotDataSlice = createSlice({
    name: 'plotData',
    initialState: {
        isLoading: false,
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlotData.fulfilled, (state, action) => {
            


        });

        // builder.addCase(saveTodo.rejected, (state, action) => {
        //     console.log('saveTodo rejected called');

        // });

        // builder.addCase(fetchTodos.fulfilled, (state, action) => {
        //     state.todos = action.payload;


        // });
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

export default plotDataSlice.reducer