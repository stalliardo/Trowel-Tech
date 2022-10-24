import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import CircularIndicator from '../../components/loadingIndicator/CircularIndicator'
import { Container } from '@mui/material';

import { getPlots } from '../../features/plotData/plotDataSlice';

import NoDataPrompt from '../../components/plotData/NoDataPrompt'
import IndexContainer from '../../components/plotData/IndexContainer';


const Home = () => {
  const data = useSelector(state => state.plotData.allPlots)
  const user = useSelector(state => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.gangId) {
      console.log("dispatch called");
      dispatch(getPlots(user.gangId)).unwrap().then((response) => {
        console.log("Then called + response = ", response);
      })
    } 
  }, [])

  const isLoading = useSelector(state => state.plotData.isLoading);

  return (
      isLoading ? <CircularIndicator style={{mt: "100px"}}/> : data.length ? <IndexContainer data={data}/> : <NoDataPrompt />
  )
}

export default Home;