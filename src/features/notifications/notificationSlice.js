import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        isOpen: false,
        message: "",
        alertType: "success",
        duration: 5000,
    },
    reducers: {
        showToast: (state, action) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.duration = action.payload.duration || state.duration;
            state.alertType = action.payload.alertType || state.alertType;
        }, 
        closeToast: (state) => {
            state.isOpen = false;
        }
    },
})

export const { showToast, closeToast } = notificationSlice.actions;

export default notificationSlice.reducer;