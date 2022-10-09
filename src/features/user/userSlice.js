import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signUpUserWithEmailAndPassword, getUserDoc, logUserOut, signInUserWithEmailAndPassword } from '../../services/database/auth';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false,
        isLoadingUserData: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },

        noUserFound: (state, action) => {
            state.isLoadingUserData = false;
        },

        setGangId: (state, action) => {
            state.currentUser = {...state.currentUser, gangId: action.payload}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });

        builder.addCase(signUpUser.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(signIn.rejected, (state) => {
            state.isLoading = false;
            console.log("sign in failed");
        });

        // getUserData....
        builder.addCase(getUserData.pending, (state) => {
            state.isLoadingUserData = true;
        });

        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.isLoadingUserData = false;
            state.currentUser = action.payload;
        });

        builder.addCase(getUserData.rejected, (state) => {
            state.isLoadingUserData = false;
        });

        // log out....
        builder.addCase(logOut.fulfilled, (state) => {
            state.currentUser = null;
        });
    }
})

export const { setUser, noUserFound, setGangId } = userSlice.actions;

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

export const signIn = createAsyncThunk(
    "user/signIn",
    async (formData) => {
        try {
            await signInUserWithEmailAndPassword(formData);
            console.log("thunk sign in successful");
        } catch (error) {
            throw error;
        }
    }
);

export const getUserData = createAsyncThunk(
    "user/getUserData",
    async (userId) => {
        try {
            const userData = await getUserDoc(userId);
            return userData;
        } catch (error) {
            throw (error);
        }
    }
)

export const logOut = createAsyncThunk(
    "user/logOut",
    async () => {
        try {
            await logUserOut();
        } catch (error) {
            throw (error);
        }
    }
)

export default userSlice.reducer