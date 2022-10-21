import { Box, Container, Paper } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import OverviewContainer from '../../components/plotData/OverviewContainer'
import TabContainer from '../../components/tabs/TabContainer'

const Edit = () => {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "backDrop.dark", height: "100vh", pt: "20px", mt: "20px" }}>
      <OverviewContainer />

      <Paper elevation={3} sx={{ mt: "50px", textAlign: "left", }}>
          <TabContainer />
          <Box sx={{padding: "10px 20px"}} >
            <Outlet />
          </Box>
        </Paper>
    </Container>
  )
}

export default Edit