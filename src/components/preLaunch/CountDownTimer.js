import { Button, Grid, Input, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds }) => {


    return <Container sx={{height: "100vh"}}>
        <Grid
        container
        
        sx={{  height: "300px", pb: "0px" }}
        >
        <Grid container sx={{ justifyContent: "center", mt: "50px" }}>
            <Typography sx={{fontSize: "40px", color: "white"}}>Trowel Tech is coming soon!</Typography>
        </Grid>
       <Grid item xs={3} sx={{ borderRadius: "20px", alignContent: "center"}}>
            <Typography sx={{color: "white", fontSize: "50px"}}>{days}</Typography>
            <Typography sx={{color: "white", fontSize: "20px"}}>Days</Typography>
        </Grid>
        <Grid item xs={3} sx={{ borderRadius: "20px", alignContent: "center"}}>
            <Typography sx={{color: "white", fontSize: "50px"}}>{hours}</Typography>
            <Typography sx={{color: "white", fontSize: "20px"}}>Hours</Typography>
        </Grid>
        <Grid item xs={3} sx={{borderRadius: "20px", alignContent: "center"}}>
            <Typography sx={{color: "white", fontSize: "50px"}}>{minutes}</Typography>
            <Typography sx={{color: "white", fontSize: "20px"}}>Minutes</Typography>
        </Grid>
        <Grid item xs={3} sx={{borderRadius: "20px", alignContent: "center"}}>
            <Typography sx={{color: "white", fontSize: "50px"}}>{seconds}</Typography>
            <Typography sx={{color: "white", fontSize: "20px"}}>Seconds</Typography>
        </Grid>

        {/* <Grid container justifyContent="center" sx={{mt: "100px"}}>
            <Input disableUnderline placeholder='Enter your email address' sx={{ background:"white", borderRadius: "5px", height: "40px", width: {xs: "90%", md: "40%"} }}/>
            <Button variant='contained' sx={{height:"40px", ml: "20px"}}>Subscribe</Button>
        </Grid> */}
    </Grid>
    </Container>
};

const CountDownTimer = () => {
    return (
        <Countdown
            date='2022-12-17T18:00:00'
            renderer={renderer}
        />
    )
}

export default CountDownTimer

