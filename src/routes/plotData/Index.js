import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getPlots, setQueryParam } from '../../features/plotData/plotDataSlice';

import NoDataPrompt from '../../components/plotData/NoDataPrompt'
import IndexContainer from '../../components/plotData/IndexContainer';
import CircularIndicator from '../../components/loadingIndicator/CircularIndicator'

const Index = () => {
  const data = useSelector(state => state.plotData.allPlots)
  const user = useSelector(state => state.user.currentUser);
  const filteredPlots = useSelector(state => state.plotData.filteredPlots);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.gangId) {
      dispatch(getPlots(user.gangId));
      dispatch(setQueryParam(null));
    } 
  }, []);

  const isLoading = useSelector(state => state.plotData.isLoading);

  return (
      isLoading ? <CircularIndicator style={{mt: "100px"}}/> : data.length ? <IndexContainer data={filteredPlots || data}/> : <NoDataPrompt />
  )
}

export default Index;