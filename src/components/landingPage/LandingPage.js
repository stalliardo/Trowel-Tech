import { Box, Grid, Typography } from '@mui/material'
import { Container, width } from '@mui/system'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import image from '../../images/meeting.jpg'
import gangImage from '../../images/gang.jpg'
import individualImage from '../../images/individual.jpg'

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
        <Grid container sx={{ paddingX: { sm: "20px", md: "40px" }, flexDirection: {xs: "column-reverse", md: "row"} }}>
          <Grid item container md={8}>
            <Typography variant='h3' fontWeight="500" sx={{ paddingTop: {md: "5rem", xs: "0"}, textAlign: {sm: "center", md: "left"} }}>Only Trades - Bricklayers helps modernize the way you work!</Typography>
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
            text="OTB is an online tool for bricklayers. Record hours, lift prices, calculate wages and so much more."
            title="What is OTPG"
            icon="help_outlined"
            clickHandler={onLearnMoreClicked}
          />
          <PromptCard
            backgroundColor="#7690db"
            buttonText="Compare Pricing"
            text="Whether you're an individual or in a price gang we've got you covered. Find out which option is best for you"
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






        {/* Price gang container */}
        <Grid container sx={{ paddingX: { sm: "20px", md: "40px" }, flexDirection: {xs: "column", md: "row"} }} justifyContent="space-between" alignItems="center">


          <Grid item md={4}>
            <img src={gangImage} height={300} width={300} alt="meeting.jpg" style={{ marginTop: "-40px" }} />
          </Grid>

          <Grid item md={8}>
            <Typography variant='h4' fontWeight="500" textAlign="center" sx={{ paddingTop: "3rem" }}>Price gangs. It's more than work. It's a way of working quicker, smarter and ultimately, more economically.</Typography>
            <Typography variant="subtitle1" fontSize="20px" mt="20px">Start by creating your gang, add members either day work or price work. Record hours, lift prices, performance charts and more. Let's move building into the 21st century.</Typography>
            <Container>
              <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Let's go baby</Button>
            </Container>
          </Grid>
        </Grid>


        <hr style={{ margin: "60px 0 40px" }} />

        {/* individual container */}
        <Grid container sx={{ paddingX: { sm: "20px", md: "40px" }, flexDirection: { xs: "column-reverse", md: "row"} }} justifyContent="space-between">


        

          <Grid item md={8}>
            <Typography variant='h4' fontWeight="500" textAlign="center" sx={{ paddingTop: "1rem" }}>Individuals. Log your hours and make sure you're getting the correct pay </Typography>
            <Typography variant="subtitle1" fontSize="20px" mt="20px">Register for your free account, enter some salary information and calculate your earnings as you go. No more guessing what you're going to be paid.</Typography>
            <Container>
              <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Let's go baby</Button>
            </Container>
          </Grid>


          <Grid item md={4}>
            <img src={individualImage} height={200} width={200} alt="meeting.jpg" style={{ marginTop: "0px" }} />
          </Grid>
        </Grid>







      </Container>




      {/* Footer */}
      <Box component="div" sx={{ background: "darkblue", height: "12rem", width: "100%", mt: "60px" }}>
        <Container maxWidth="lg" sx={{ height: "inherit", pt: "30px" }}>
          <Grid container>
            <Grid item container sx={{ mr: "40px" }} xs={12} md={2} flexDirection="column">
              <Typography color="white" variant='h6'>Site Logo Here</Typography>
              <Button sx={{ color: "whitesmoke", width: "105px" }}>Log in</Button>
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

          <Grid container justifyContent="space-around" sx={{ backgroundColor: { xs: "red", xl: "green", md: "yellow" } }}>
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