import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,

    },
    reducers: {
        logUserOut: (state, action) => {
            console.log('log out called');
            
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(saveTodo.fulfilled, (state, action) => {
    //         state.todos.push(action.payload)


    //     });

    //     builder.addCase(saveTodo.rejected, (state, action) => {
    //         console.log('saveTodo rejected called');

    //     });

    //     builder.addCase(fetchTodos.fulfilled, (state, action) => {
    //         state.todos = action.payload;


    //     });
    // }
})

// Action creators are generated for each case reducer function
export const { logUserOut } = userSlice.actions;



// export const fetchTodos = createAsyncThunk(
//     "todo/fetchTodos",
//     async (undefined, { rejectWithValue }) => {
//         console.log('fetch todos called');

//         const response = await getTodos();

//         const serializedData = [];

//         response.forEach((item) => {
//             serializedData.push(item.data());
//         });

//         return serializedData;
//     }
// );

export default userSlice.reducer