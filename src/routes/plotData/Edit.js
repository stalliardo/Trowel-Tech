import { Box, Container, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import CircularIndicator from '../../components/loadingIndicator/CircularIndicator'
import OverviewContainer from '../../components/plotData/OverviewContainer'
import TabContainer from '../../components/tabs/TabContainer'

const Edit = () => {
  
  // TODO download .XLS button?
  
  const isLoading = useSelector(state => state.plotData.isLoadingSinglePlot);
  
  return (
      isLoading ? <CircularIndicator style={{mt: "100px"}} /> :
    <Container maxWidth="lg" sx={{ backgroundColor: "backDrop.dark", height: "100vh", pt: "20px", mt: "20px" }}>
      <OverviewContainer />

      <Paper elevation={3} sx={{ mt: "50px", textAlign: "left", }}>
          <TabContainer />
          <Box sx={{padding: "20px"}} >
            <Outlet />
          </Box>
        </Paper>
    </Container>
  
  )
}

export default Edit