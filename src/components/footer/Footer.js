import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import { Container } from '@mui/system'

const Footer = () => {

    const handleFooterLinkClicked = () => {
        // TODO
        console.log("footer clciked");
    }

    const FooterLink = (props) => {
        return (
            <Typography color="white" sx={{ mr: "20px", width: "fit-content" }} onClick={handleFooterLinkClicked}>{props.text}</Typography>
        )
    }

    return (
        <Box component="div" sx={{ background: "darkblue", height: "fit-content", width: "100%", mt: "60px" }}>
            <Container maxWidth="lg" sx={{ height: "inherit"}}>
                <Grid container sx={{ flexDirection: { sm: "column", md: "row" }, mb: "20px" }} >

                    <Grid item container sx={{ mr: "40px", mt: { xs: "20px" }, alignItems: "baseline", flexDirection: "column" }} xs={12} md={2}>
                        <Typography color="white" variant='h6'>Contact us</Typography>
                        <Typography color="white" variant='subtitle2' fontWeight="100" sx={{ ml: { xs: "20px", md: "0px" } }}>Feel free to get in touch</Typography>
                    </Grid>
                    <Grid item container sx={{ mr: "40px", mt: { xs: "20px" }, alignItems: "baseline", flexDirection: "column" }} xs={12} md={2}>
                        <Typography color="white" variant='h6'>About</Typography>
                        <Typography color="white" variant='subtitle2' fontWeight="100" sx={{ ml: { xs: "20px", md: "0px" } }}>Find out what we're about</Typography>
                    </Grid>
                </Grid>

            </Container>

            <Container maxWidth="lg" sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                <FooterLink text="Privacy Policy" />
                <FooterLink text="Terms" />
                <FooterLink text="Cookie Settings" />
            </Container>
        </Box>
    )
}

export default Footer;