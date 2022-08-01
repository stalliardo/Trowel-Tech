import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signUpUserWithEmailAndPassword } from '../../services/database/auth';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false

    },
    reducers: {
        logUserOut: (state, action) => {
            console.log('log out called');

        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state, action) => {
            state.isLoading = true;


        });

        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            console.log('action payload = ', action.payload);



        });

        builder.addCase(signUpUser.rejected, (state, action) => {
            state.isLoading = false;


        });

    }
})

// Action creators are generated for each case reducer function
export const { logUserOut } = userSlice.actions;



export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async (formData) => {

        try {
            const credential = await signUpUserWithEmailAndPassword(formData);

            console.log('credential = ', credential);
            

            const serializedUser = {
                name: formData.firstName + " " + formData.lastName,
                email: formData.email,
                uid: credential.user.uid
            }

            return serializedUser;
        } catch (error) {
            throw error;
        }
    }
);

export default userSlice.reducer