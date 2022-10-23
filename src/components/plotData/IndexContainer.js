import React from 'react'

import { Container, Typography } from '@mui/material'

import Filter from '../../components/plotData/Filter'

const IndexContainer = () => {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "backDrop.dark", height: "100vh", pt: "20px", mt: "20px" }}>
        <Typography textAlign="left" variant='h5' mb="15px">Plots</Typography>
        <Filter />
  </Container>
  )
}

export default IndexContainer