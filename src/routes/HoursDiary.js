import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import PageTitle from '../components/elements/PageTitle'
import HoursDiaryContainer from '../components/hoursDiary/HoursDiaryContainer'

const HoursDiary = () => {
  return (
    <Container sx={{border: "1px solid red", mt: "30px"}} maxWidth="lg">
        <PageTitle title="Hours Dairy"/>
        <HoursDiaryContainer />
    </Container>
  )
}

export default HoursDiary