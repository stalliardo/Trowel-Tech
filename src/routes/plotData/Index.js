import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import CircularIndicator from '../../components/loadingIndicator/CircularIndicator'
import { Container } from '@mui/material';

import { getPlotData } from '../../features/plotData/plotDataSlice';

import NoDataPrompt from '../../components/plotData/NoDataPrompt'


const Home = () => {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.gangId) {
      console.log("dispatch called");
      dispatch(getPlotData(user.gangId)) // TODO
    } 
  }, )

  const isLoading = false; // TODO

  return (
      isLoading ? <CircularIndicator style={{mt: "100px"}}/> : data.length ? <Container>Data found</Container> : <NoDataPrompt />
  )
}

export default Home;