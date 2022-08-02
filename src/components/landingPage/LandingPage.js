import { Grid, Typography } from '@mui/material'
import { Container, width } from '@mui/system'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import image from '../../images/meeting.jpg'

import React from 'react'
import { useNavigate } from 'react-router-dom';

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


  return (
    // <div style={{ background: "linear-gradient(rgb(199, 226, 252), rgb(255, 255, 255))", height: "100vh" }}>
    <div>
      <Container maxWidth="lg">

        <Grid container paddingX="4rem">
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
          <Grid item md={3} sx={{ backgroundColor: "#98a8d6", borderRadius: "10px", padding: "4px 20px 20px", marginTop: "20px" }}>
            <Typography variant='h6' fontWeight="500" textAlign="left" sx={{ paddingTop: "2rem" }}>What is Only Trades - Bricklayers</Typography>
            <Typography textAlign="left" variant="subtitle1" fontSize="16px" mt="20px">Collaborate, manage, and save precious time. Just because you work on site doesn't mean you can't utilize the power of todays technology.</Typography>
            <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Learn more</Button>
          </Grid>

          <Grid item md={3} sx={{ backgroundColor: "#7690db", borderRadius: "10px", padding: "4px 20px 20px", marginTop: "20px" }}>
            <Typography variant='h6' fontWeight="500" textAlign="left" sx={{ paddingTop: "2rem" }}>View our pricing plans</Typography>
            <Typography textAlign="left" variant="subtitle1" fontSize="16px" mt="20px">Collaborate, manage, and save precious time. Just because you work on site doesn't mean you can't utilize the power of todays technology.</Typography>
            <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Compare Pricing</Button>
          </Grid>

          <Grid item md={3} sx={{ backgroundColor: "#3d65d9", borderRadius: "10px", padding: "4px 20px 20px", marginTop: "20px" }}>
            <Typography variant='h6' fontWeight="500" textAlign="left" sx={{ paddingTop: "2rem" }}>Take a tour</Typography>
            <Typography textAlign="left" variant="subtitle1" fontSize="16px" mt="20px">Collaborate, manage, and save precious time. Just because you work on site doesn't mean you can't utilize the power of todays technology.</Typography>
            <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Take a tour</Button>
          </Grid>

        </Grid>


        <hr style={{ margin: "40px 0" }} />

        <Grid container paddingX="4rem" justifyContent="space-between">
          <Typography variant='h4' fontWeight="500" textAlign="center" sx={{ paddingTop: "5rem" }}>It's more than work. It's a way of working quicker, smarter and ultimately, more economically.</Typography>
          <Typography variant="subtitle1" fontSize="20px" mt="20px">Start by creating your gang, add members either day work or price work. Record hours, lift prices, performance charts and more. Let's move building into the 21st century.</Typography>
          <Container>
            <Button variant='contained' sx={{ mt: "20px" }} onClick={onGoToSignUp}>Let's go baby</Button>
          </Container>
        </Grid>

        <hr style={{ margin: "40px 0" }} />


      </Container>
      <div>
        TODO - FOOTER
      </div>
    </div>
  )
}

export default LandingPage


{/* <div style={{ background: "linear-gradient(rgb(199, 226, 252), rgb(255, 255, 255))", height: "100vh" }}>
      <Container maxWidth="xl" sx={{ border: "1px solid red", }}>
        <Container maxWidth="xl" sx={{ border: "1px solid red", mt: "30px", mb: "40px" }}>
          <Typography variant='h2'>Welcome to the Only Trades - Price Gang site etc </Typography>
        </Container>
        <Grid maxWidth="md" container sx={{ margin: "auto" }} justifyContent="space-around" mt="30px">
          <Grid item sx={{ mt: "20px" }}>
            <Card sx={{ backgroundColor: "#031236", width: "400px", height: "220px" }}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="warning.light" gutterBottom>
                  Create Gang
                </Typography>
                <Typography variant='subtitle2' sx={{ fontSize: 14 }} color="#c4c4c4" gutterBottom>
                  Use this option to create your gang. You will first be asked to enter your details, then the details of the other gang members.
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "space-around", width: "80%", margin: "0 auto 10px auto" }}>
                <Button size="medium" variant='contained' onClick={onCreateGang}>Let's go</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sx={{ mt: "20px" }}>
            <Card sx={{ backgroundColor: "#031236", width: "400px", height: "220px" }}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="warning.light" gutterBottom>
                  Join Gang
                </Typography>
                <Typography variant='subtitle2' sx={{ fontSize: 14 }} color="text.subText" gutterBottom>
                  Use this option to join a gang. You may have received an invitation code or you can search for your gang manually.
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "space-around", width: "80%", margin: "20px auto 10px auto" }}>
                <Button size="medium" variant='contained'>Let's go</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div> */}




