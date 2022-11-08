import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const liftDeductionsSlice = createSlice({
    name: 'liftDeduction',
    initialState: {
        
    },
    reducers: {
        // setUser: (state, action) => {
        //     state.currentUser = action.payload;
        // },

    },
    extraReducers: (builder) => {
        // builder.addCase(signUpUser.pending, (state) => {
        //     state.isLoading = true;
        // });

        // builder.addCase(signUpUser.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.currentUser = action.payload;
        // });

        // builder.addCase(signUpUser.rejected, (state) => {
        //     state.isLoading = false;
        // });

       
    }
})

// export const { setUser, noUserFound, setGangId } = liftDeductionsSlice.actions;

export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async (formData) => {

        try {
            // const credential = await signUpUserWithEmailAndPassword(formData);
            // TEST -> is this still required?
           

            // return serializedUser;
        } catch (error) {
            throw error;
        }
    }
);



export default liftDeductionsSlice.reducer