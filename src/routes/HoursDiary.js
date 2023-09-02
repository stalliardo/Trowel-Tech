import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import PageTitle from '../components/elements/PageTitle'
import HoursDiaryContainer from '../components/hoursDiary/HoursDiaryContainer'

const HoursDiary = () => {
  return (
    <>
      <Box mt="30px">
        {/* TODO Are we keeping page titles? */}
        <PageTitle title="Hours Dairy"/>
      </Box>
      {/* <Container sx={{ mt: "30px", padding: "20px", borderRadius: "5px" }} maxWidth="xl"> */}
      <Container sx={{ mt: "30px", backgroundColor: "backDrop.dark", padding: "20px", borderRadius: "5px" }} maxWidth="xl"> 
        <HoursDiaryContainer />
      </Container>
    </>
  )
}

export default HoursDiary