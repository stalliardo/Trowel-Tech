import { configureStore } from '@reduxjs/toolkit'
import gangInformationSlice from '../features/gangInfo/gangInformationSlice';
import financialsSlice from '../features/financials/financialsSlice';
import notificationSlice from '../features/notifications/notificationSlice';
import plotDataSlice from '../features/plotData/plotDataSlice';
import userSlice from '../features/user/userSlice';
import hoursDiarySlice from '../features/hoursDiary/hoursDiarySlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    gangInformation: gangInformationSlice,
    plotData: plotDataSlice,
    notification: notificationSlice,
    financials: financialsSlice,
    hoursDiary: hoursDiarySlice
  },
});