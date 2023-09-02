import { Box, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'

import Button from '@mui/material/Button';
import buildersImage from '../../images/builders-edited.png'
import gangImage from '../../images/gang.jpg'
import individualImage from '../../images/individual.jpg'
import trowelTechLogo from '../../images/trowel-tech-default.png'
import trowelTechLogoCover from '../../images/cover.png'

import React from 'react'
import { useNavigate } from 'react-router-dom';
import PromptCard from './PromptCard';

const LandingPage = () => {
  const navigate = useNavigate();

  const onCreateGang = () => {
    navigate("/auth");
  }

  const onJoinGang = () => {

  }

  const onGoToSignUp = () => {
    // TODO navigate tot he auth page
    navigate("/auth");
  }

  const onLearnMoreClicked = () => {

  }

  const onPricingPlansClicked = () => {

  }

  const onTakeATourClicked = () => {

  }

  return (
    <div>
      <Container maxWidth="xl" sx={{mt: "20px"}}>
      <img src={trowelTechLogoCover} width="100%" alt="meeting.jpg" style={{ marginTop: "0px" }}/>
        <Grid container sx={{ paddingX: { xs: "20px", md: "40px" }, flexDirection: { xs: "column-reverse", md: "row" } }}>
          <Grid item container md={8}>
            <Typography variant='h3' fontWeight="500" sx={{ paddingTop: { md: "5rem", xs: "0" }, textAlign: { sm: "center", md: "left" } }}>Trowel Tech helps modernize the way you work!</Typography>
            <Typography fontFamily="'Linden Hill'" textAlign="left" variant="subtitle1" fontSize="22px" mt="20px">Collaborate, manage, and save precious time. Just because you work on site doesn't mean you can't utilize the power of todays technology.</Typography>
            <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Sign up for free</Button>
          </Grid>
          <Grid item md={4}>
            <img src={buildersImage} height={200} alt="meeting.jpg" style={{ marginTop: "40px" }} />
          </Grid>
        </Grid>
        <hr style={{ margin: "60px 0 35px" }} />
        <Grid container paddingX="2rem" justifyContent="space-between">
          <PromptCard
            backgroundColor="#abb5d1"
            buttonText="Learn more"
            text="Trowel Tech is an online tool for bricklayers. Record hours, lift prices, calculate wages and so much more."
            title="What is Trowel Tech"
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
        <hr style={{ margin: "70px 0 40px" }} />
        <Grid container sx={{ paddingX: { sm: "20px", md: "40px" }, flexDirection: { xs: "column", md: "row" } }} justifyContent="space-between" alignItems="center">
          <Grid item md={4}>
            <img src={gangImage} height={200} alt="meeting.jpg" style={{ marginTop: "-40px" }} />
          </Grid>
          <Grid item md={8}>
            <Typography variant='h4' fontWeight="500" textAlign="center" sx={{ paddingTop: "1rem" }}>Price gangs. It's more than work. It's a way of working quicker, smarter and ultimately, more economically.</Typography>
            <Typography fontFamily="'Linden Hill'" variant="subtitle1" fontSize="20px" mt="20px">Start by creating your gang, add members either day work or price work. Record hours, lift prices, performance charts and more. Let's move building into the 21st century.</Typography>
            <Container>
              <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Let's go</Button>
            </Container>
          </Grid>
        </Grid>
        <hr style={{ margin: "60px 0 40px" }} />
        <Grid container sx={{ paddingX: { sm: "20px", md: "40px" }, flexDirection: { xs: "column-reverse", md: "row" } }} justifyContent="space-between">
          <Grid item md={8}>
            <Typography variant='h4' fontWeight="500" textAlign="center" sx={{ paddingTop: "1rem" }}>Individuals. Log your hours and make sure you're getting the correct pay. </Typography>
            <Typography fontFamily="'Linden Hill'" variant="subtitle1" fontSize="20px" mt="20px">Register for your free account, enter some salary information and calculate your earnings as you go. No more guessing what you're going to be paid.</Typography>
            <Container>
              <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Sign me up</Button>
            </Container>
          </Grid>
          <Grid item md={4}>
            <img src={individualImage} height={200} width={200} alt="meeting.jpg" style={{ marginTop: "0px" }} />
          </Grid>
        </Grid>
        <hr style={{ margin: "60px 0 40px" }} />
          <Container sx={{ background: "linear-gradient(131deg, rgba(1,179,217,1) 0%, rgba(3,2,74,1) 100%)", height: "fit-content", paddingY: "30px" }}>
            <Typography variant="h1" fontFamily="Russo One" sx={{ color: "white" }}>Trowel Tech</Typography>
            <Typography variant="subtitle1" sx={{ color: "white", fontSize: "20px", letterSpacing: "4px", mt: "20px" }}>Sign up and modernize your work flow</Typography>
            <Button variant='outlined' sx={{color: "white", mt: "20px"}} onClick={onGoToSignUp}>Join us</Button>
          </Container>
      </Container>
    </div>
  )
}

export default LandingPage

// TODOs

// Fix nav color
// Fix nav gap on small screens
// Change promt card background Color
// Change footer backgroundColor