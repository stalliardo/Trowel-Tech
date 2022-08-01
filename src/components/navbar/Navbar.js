import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(useSelector((state) => state.currentUser));

    console.log('currentUser from nav = ', currentUser);
    
    
    useEffect(() => {
        setCurrentUser()

    })

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: "darkblue" }}>
                    {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton> */}


                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h6" component="div" sx={{}}>
                                Only Trades - Price Gangs
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button color="inherit">{currentUser ? "Log Out" : "Log In"}</Button>

                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;




