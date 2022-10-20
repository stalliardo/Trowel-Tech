import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Home from '../../routes/plotData/Home';
import Edit from '../../routes/plotData/Edit';
import CircularIndicator from '../../components/loadingIndicator/CircularIndicator'
import { getPlotData } from '../../features/plotData/plotDataSlice';
import { useNavigate } from 'react-router-dom';

const PlotData = () => {

  const [data, setData] = useState(null);
  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {

    if (user && user.gangId) {
      console.log("dispatch called");
      dispatch(getPlotData(user.gangId))
    } else {
      // If the user hasnt created a gang prompt to do so here
      // pass a prop into the home comp
    }

  }, )

  const [isEditing, setIsEditing] = useState(false);
  const isLoading = false;

  // const isLoading = useSelector(state => state.plotData.isLoading);

  return isLoading ? <CircularIndicator style={{mt: "100px"}}/> : isEditing ? <Edit/> : <Home data={data || []}/>
  
}

export default PlotData;