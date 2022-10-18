import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import trowelTechLogo from '../../images/trowel-tech-default.png'
import trowelTechLogoCover from '../../images/cover.png'
import CountDown from 'react-countdown';
import CountDownTimer from './CountDownTimer';

const PreLaunch = () => {
  return (
    <div>
      <Container maxWidth="xl" sx={{mt: "20px"}}>
      {/* <img src={trowelTechLogoCover} width="100%" alt="meeting.jpg" style={{ marginTop: "0px" }}/> */}
      
       <CountDownTimer />
      </Container>
    </div>
  )
}

export default PreLaunch