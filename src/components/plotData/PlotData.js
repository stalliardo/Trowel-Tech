import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Home from './Home';
import Edit from './Edit';
import CircularIndicator from '../loadingIndicator/CircularIndicator'

const PlotData = () => {

  const data = false;

  const [isEditing, setIsEditing] = useState(false);
  const isLoading = false;

  // const isLoading = useSelector(state => state.plotData.isLoading);

  return isLoading ? <CircularIndicator style={{mt: "100px"}}/> : isEditing ? <Edit/> : <Home />;
    
  
}

export default PlotData