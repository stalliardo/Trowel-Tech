import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import { Container } from '@mui/system'

const Footer = () => {
    return (
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
    )
}

export default Footer