import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import PageTitle from '../components/elements/PageTitle'
import HoursDiaryContainer from '../components/hoursDiary/HoursDiaryContainer'

const HoursDiary = () => {
  return (
    <>
      <PageTitle title="Hours Dairy" />
      <Container sx={{ mt: "30px", backgroundColor: "backDrop.dark", padding: "20px", borderRadius: "5px" }} maxWidth="lg">
        <HoursDiaryContainer />
      </Container>
    </>
  )
}

export default HoursDiary