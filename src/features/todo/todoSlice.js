import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addTodo, getTodos } from '../../services/database/todos'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        loading: false,
        todos: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveTodo.fulfilled, (state, action) => {
            state.todos.push(action.payload)


        });

        builder.addCase(saveTodo.rejected, (state, action) => {
            console.log('saveTodo rejected called');

        });

        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;


        });
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = todoSlice.actions;

export const saveTodo = createAsyncThunk(
    "todo/addTodo",
    async (newTodo, { rejectWithValue }) => {
        try {
            const response = await addTodo(newTodo);
            const serializedData = { id: response.id, ...newTodo };

            return serializedData;
            console.log('response.data = ', response);


        } catch (error) {
            console.log('Error adding todo. Error = ', error);
            return rejectWithValue();

        }
    }
);

export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    async (undefined, { rejectWithValue }) => {
        console.log('fetch todos called');

        const response = await getTodos();

        const serializedData = [];

        response.forEach((item) => {
            serializedData.push(item.data());
        });

        return serializedData;
    }
);

export default todoSlice.reducer