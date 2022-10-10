import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserData, logOut, noUserFound } from '../../features/user/userSlice'

const Navbar = () => {

    const dispatch = useDispatch();
    const userDoc = useSelector((state) => state.user)

    const auth = getAuth();


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {    
            if (user) {
                if (!userDoc.currentUser) {
                    console.log("getting user called");
                    dispatch(getUserData(user.uid)).unwrap().catch((e) => {
                        console.log("Error getting user data. Error = ", e);
                    })
                }
            } else {
                dispatch(noUserFound())
            }
        })
    }, [userDoc.currentUser])

    const onLogOutClicked = () => {
        dispatch(logOut());
    }

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
                            <Typography variant="h6" component="div" fontFamily="Russo One" letterSpacing="2px">
                                Trowel Tech
                            </Typography>
                        </Grid>
                        <Grid item>
                            {
                                userDoc.currentUser && <Button color="inherit" onClick={onLogOutClicked}>Log Out</Button>
                            }
                        </Grid>
                        {/* TODO add the users name to the nav bar */}
                        {/* <Grid item>
                            {
                                userDoc.currentUser && <Typography>{userDoc.currentUser.name}</Typography>                       
                            }
                        </Grid> */}
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;