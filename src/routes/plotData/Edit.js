import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useNavigate,  } from 'react-router-dom'

import { Box, Button, Container, Paper } from '@mui/material'

import CircularIndicator from '../../components/loadingIndicator/CircularIndicator'
import OverviewContainer from '../../components/plotData/OverviewContainer'
import TabContainer from '../../components/tabs/TabContainer'
import { clearSinglePlotData } from '../../features/plotData/plotDataSlice'

const defaultNavItems = [
  {
      to: "information",
      text: "Plot Information"
  },
  {
      to: "lift-breakdown",
      text: "Lift Breakdown"
  },
  {
      to: "deductions",
      text: "Deductions"
  },
  {
      to: "financials",
      text: "Financials"
  },
]

const Edit = () => {
  // TODO download .XLS button?
  const queryParam = useSelector(state => state.plotData.queryParam);

  let navItems = [];

  if(!queryParam) {
    navItems = defaultNavItems.filter(item => item.to === "information");
  } else {
    navItems = defaultNavItems;
  }
  
  const isLoading = useSelector(state => state.plotData.isLoadingSinglePlot);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackClicked = () => {
    dispatch(clearSinglePlotData());
    navigate("/plot-data");
  }
  
  return (
      isLoading ? <CircularIndicator style={{mt: "100px"}} /> :
    <Container maxWidth="lg" sx={{ backgroundColor: "backDrop.dark", height: "100vh", pt: "20px", mt: "20px" }}>
      <Box component="div" sx={{ display: "flex" }}>
        <Button variant='contained' onClick={handleBackClicked}>Back</Button>
      </Box>
      <OverviewContainer />

      <Paper elevation={3} sx={{ mt: "50px", textAlign: "left", }}>
          <TabContainer navItems={navItems}/>
          <Box sx={{padding: "20px"}} >
            <Outlet />
          </Box>
        </Paper>
    </Container>
  
  )
}

export default Edit;