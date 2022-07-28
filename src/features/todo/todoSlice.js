import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addTodo, getTodos } from '../../services/database/todos'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveTodo.fulfilled, (state, action) => {
        console.log('saveTodo fulfilled called, action.payload = ', action.payload);
        
        
    });

    builder.addCase(saveTodo.rejected, (state, action) => {
        console.log('saveTodo rejected called');
        
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
        console.log('fetch called. action = ', action.payload);
        
    });
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = todoSlice.actions;

export const saveTodo = createAsyncThunk(
    "todo/addTodo",
    async (newTodo, {rejectWithValue}) => {
        console.log('Save todo called');
        
        
        try {
            const response = await addTodo(newTodo);
            console.log('response.data = ', response);
            
                        
        } catch (error) {
            console.log('Error adding todo. Error = ', error);
            return rejectWithValue();
            
        }        
    }
);

export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    async (undefined, {rejectWithValue}) => {
        console.log('fetch todos called');
        
        
        try {
            const response = await getTodos();
            response.forEach((item) => {
                console.log('response.item = ', item.data());
                console.log('response.item = ', item.id);
                
            })
            // might have to ormat the data then return it........ TODO
            return response;
            
                        
        } catch (error) {
            console.log('Error adding todo. Error = ', error);
            return rejectWithValue();
            
        }        
    }
);

export default todoSlice.reducer