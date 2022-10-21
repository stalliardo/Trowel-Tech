import { Container } from '@mui/material'
import React from 'react'
import OverviewContainer from '../../components/plotData/OverviewContainer'

const Edit = () => {
  return (
    <Container maxWidth="lg" sx={{backgroundColor: "backDrop.dark", height: "100vh", pt: "20px", mt: "20px"}}>
      <OverviewContainer />
    </Container>
  )
}

export default Edit