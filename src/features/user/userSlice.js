import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signUpUserWithEmailAndPassword, getUserDoc } from '../../services/database/auth';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false,
        isLoadingUserData: true,
    },
    reducers: {
        logUserOut: (state, action) => {
        },

        setUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state, action) => {
            state.isLoading = true;


        });

        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });

        builder.addCase(signUpUser.rejected, (state, action) => {
            state.isLoading = false;
        });

        // getUserData....
        builder.addCase(getUserData.pending, (state, action) => {
            state.isLoadingUserData = true;
        });

        builder.addCase(getUserData.fulfilled, (state, action) => {
            
            state.isLoadingUserData = false;
            state.currentUser = action.payload;
        });

        builder.addCase(getUserData.rejected, (state, action) => {
            state.isLoadingUserData = false;
        });

    }
})

// Action creators are generated for each case reducer function
export const { logUserOut, setUser } = userSlice.actions;



export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async (formData) => {

        try {
            const credential = await signUpUserWithEmailAndPassword(formData);
            // TEST -> is this still required?
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

export const getUserData = createAsyncThunk(
    "user/getUserData",
    async(userId) => {
        try {
            const userData = await getUserDoc(userId);
            return userData;
        } catch (error) {
            throw(error);
        }
    }
)

export default userSlice.reducer