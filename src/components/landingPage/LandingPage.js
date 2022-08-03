import { Box, Grid, Typography } from '@mui/material'
import { Container, width } from '@mui/system'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import image from '../../images/meeting.jpg'

import React from 'react'
import { useNavigate } from 'react-router-dom';
import PromptCard from './PromptCard';

import { CurrencyPoundIcon } from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();


  const onCreateGang = () => {
    navigate("/auth");
  }

  const onJoinGang = () => {

  }

  const onGoToSignUp = () => {
    // TODO navigate tot he auth page
  }

  const onLearnMoreClicked = () => {

  }

  const onPricingPlansClicked = () => {

  }

  const onTakeATourClicked = () => {

  }

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container sx={{ paddingX: { sm: "20px", md: "40px"}}}>
          <Grid item container md={8}>
            <Typography variant='h3' fontWeight="500" textAlign="left" sx={{ paddingTop: "5rem" }}>Only Trades Price Gang helps modernize the way you work!</Typography>
            <Typography textAlign="left" variant="subtitle1" fontSize="22px" mt="20px">Collaborate, manage, and save precious time. Just because you work on site doesn't mean you can't utilize the power of todays technology.</Typography>
            <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Sign up for free</Button>
          </Grid>
          <Grid item md={4}>
            <img src={image} height={300} width={300} alt="meeting.jpg" style={{ marginTop: "20px" }} />
          </Grid>
        </Grid>
        <hr style={{ margin: "80px 0" }} />
        <Grid container paddingX="4rem" justifyContent="space-between">
          <PromptCard
            backgroundColor="#abb5d1"
            buttonText="Learn more"
            text="Some text some text some text Some text some text some text"
            title="What is OTPG"
            icon="help_outlined"
            clickHandler={onLearnMoreClicked}
          />
          <PromptCard
            backgroundColor="#7690db"
            buttonText="Compare Pricing"
            text="Some text some text some text"
            title="View our pricing plans"
            icon="sell_outlined"
            clickHandler={onPricingPlansClicked}
          />
          <PromptCard
            backgroundColor="#3d65d9"
            buttonText="Take a tour"
            text="Some text some text some text Some text some text some text Some text some text some text Some text some text some text"
            title="Take a tour"
            icon="explore_outlined"
            clickHandler={onTakeATourClicked}
          />
        </Grid>
        <hr style={{ margin: "40px 0" }} />
        <Grid container sx={{ paddingX: { sm: "20px", md: "40px"}}} justifyContent="space-between">
          <Typography variant='h4' fontWeight="500" textAlign="center" sx={{ paddingTop: "5rem" }}>It's more than work. It's a way of working quicker, smarter and ultimately, more economically.</Typography>
          <Typography variant="subtitle1" fontSize="20px" mt="20px">Start by creating your gang, add members either day work or price work. Record hours, lift prices, performance charts and more. Let's move building into the 21st century.</Typography>
          <Container>
            <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Let's go baby</Button>
          </Container>
        </Grid>
      </Container>
      <Box component="div" sx={{ background: "darkblue", height: "12rem", width: "100%", mt: "60px" }}>
        <Container maxWidth="lg" sx={{ height: "inherit", pt: "30px" }}>
          <Grid container>
            <Grid item container sx={{ mr: "40px" }} xs={12} md={2} flexDirection="column">
              <Typography color="white" variant='h6'>Site Logo Here</Typography>
              <Button sx={{color: "whitesmoke", width: "105px"}}>Log in</Button>
            </Grid>
            <Grid item container sx={{ mr: "40px" }} xs={12} md={2}>
              <Typography color="white" variant='h6'>Contact us</Typography>
              <Typography color="white" variant='subtitle2' fontWeight="100">Feel free to get in touch</Typography>
            </Grid>
            <Grid item container sx={{ mr: "40px" }} xs={12} md={2}>
              <Typography color="white" variant='h6'>About</Typography>
              <Typography color="white" variant='subtitle2' fontWeight="100">Find out why we're here</Typography>
            </Grid>
          </Grid>

          <hr style={{ margin: "20px 0" }} />

          <Grid container justifyContent="space-around" sx={{backgroundColor: {xs: "red", xl: "green", md: "yellow"}}}>
            <Typography color="white">Privacy Policy</Typography>
            <Typography color="white">Terms</Typography>
            <Typography color="white">Cookies Settings</Typography>
            <Typography color="white">Facebook</Typography>
            <Typography color="white">Twitter</Typography>
            <Typography color="white">Insta</Typography>
            <Typography color="white">Linked In</Typography>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default LandingPage


// TODOS
  // Add hover to footer Elements, is this achievable through the typography itself