import { Grid, Typography } from '@mui/material'
import { Container, width } from '@mui/system'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import React from 'react'

const LandingPage = () => {
  return (
    <Container maxWidth="xl" sx={{ border: "1px solid red", mt: "30px" }}>

      <Container maxWidth="xl" sx={{ border: "1px solid red", mt: "30px", mb: "40px" }}>

        <Typography variant='h2'>Welcome to the Only Trades - Price Gang site etc </Typography>

      </Container>

      <Grid maxWidth="md" container sx={{ margin: "auto" }} justifyContent="space-around" mt="30px">
        <Grid item sx={{mt: "20px"}}>
          <Card sx={{ backgroundColor: "#031236", width: "400px", height: "240px" }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="warning.light" gutterBottom>
                Create Gang
              </Typography>

              <Typography variant='subtitle2' sx={{ fontSize: 14 }} color="#c4c4c4" gutterBottom>
                Use this option to create your gang. You will be asked to add the other members of your price gang, their details and so on.
              </Typography>


            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-around", width: "80%", margin: "0 auto 10px auto" }}>
              <Button size="medium" variant='contained'>Let's go</Button>
              <Button size="medium">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item sx={{mt: "20px"}}>
          <Card sx={{ backgroundColor: "#031236", width: "400px", height: "240px" }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="warning.light" gutterBottom>
                Join Gang
              </Typography>

              <Typography variant='subtitle2' sx={{ fontSize: 14 }} color="text.subText" gutterBottom>
                Use this option to join a gang. The gang may already be created and you have received an invitation code.
              </Typography>


            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-around", width: "80%", margin: "0 auto 10px auto" }}>
              <Button size="medium" variant='contained'>Let's go</Button>
              <Button size="medium">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>

    </Container>




  )
}

export default LandingPage