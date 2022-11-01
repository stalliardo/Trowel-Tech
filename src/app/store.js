import { configureStore } from '@reduxjs/toolkit'
import gangInformationSlice from '../features/gangInfo/gangInformationSlice';
import notificationSlice from '../features/notifications/notificationSlice';
import plotDataSlice from '../features/plotData/plotDataSlice';
import todoReducer from '../features/todo/todoSlice'
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userSlice,
    gangInformation: gangInformationSlice,
    plotData: plotDataSlice,
    notification: notificationSlice
  },
});