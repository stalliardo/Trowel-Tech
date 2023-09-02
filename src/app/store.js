import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gangInformationSlice from '../features/gangInfo/gangInformationSlice';
import financialsSlice from '../features/financials/financialsSlice';
import notificationSlice from '../features/notifications/notificationSlice';
import plotDataSlice from '../features/plotData/plotDataSlice';
import userSlice from '../features/user/userSlice';
import hoursDiarySlice from '../features/hoursDiary/hoursDiarySlice';

const combinedReducers = combineReducers({
  user: userSlice,
  gangInformation: gangInformationSlice,
  plotData: plotDataSlice,
  notification: notificationSlice,
  financials: financialsSlice,
  hoursDiary: hoursDiarySlice
})

const rootReducer = (state, action) => {
  if(action.type === "user/logOut/pending" || action.type === "user/logOut/fulfilled") {
    return combinedReducers(undefined, action);
  }

  return combinedReducers(state, action)
}

export const store = configureStore({
  reducer: rootReducer
});