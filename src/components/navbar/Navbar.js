import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserData, logOut, noUserFound } from '../../features/user/userSlice'




import { Avatar, Menu, MenuItem, Tooltip, AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, ListItemButton, Toolbar, Typography, Button } from '@mui/material';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';


const drawerWidth = 280;
const navItemsMobile = ['Home', 'Members',  'Plot Data', 'About', 'Contact', 'Profile', 'Settings', 'Sign Out'];
const navItemsDesktop = ['Home', 'Members',  'Plot Data', 'About', 'Contact', ];
const settings = ['Profile', 'Settings', 'Sign Out'];


const Navbar = (props) => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userDoc = useSelector((state) => state.user);

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
        navigate("/");
    }


    const handleCloseUserMenu = (link) => {
      if(link === "Settings" ||  "Profile" || "Sign Out") {
        if(link === "Sign Out") {
          dispatch(logOut())
          navigate("/");
        } else {
          // navigate to route...
        
          navigate(link)
        }
      }
      setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavItemClicked = (link) => {
       if(link === "Sign Out") {
        dispatch(logOut());
        navigate("/home");
       } else {
        if(link === "Plot Data") {
          navigate("Plot-Data");
        } else {
          navigate(link)
        }
       }

       console.log("nav item clicked. item: ", link);

       // handle navigation...


        
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ pt: "20px", background: "linear-gradient(131deg, rgba(1,179,217,1) 0%, rgba(3,2,74,1) 100%)", height: "100vh" }}>
            <Box sx={{display: "flex", alignItems: "center", pl: "10px"}}>
                <Avatar sx={{ bgcolor: "primary.light", height: "60px", width: "60px" }}>DS</Avatar>
                <Typography variant='p' color="white" ml="20px" fontSize="20px" letterSpacing="2px">Stalliardo</Typography>
            </Box>

            <Divider color="white"  sx={{mt: "20px"}}/>
            <List>
                {navItemsMobile.map((item, index) => {
                 return (
                  <div key={`div ${item}`}>
                      <ListItem key={item} disablePadding sx={{color: "white", letterSpacing: "2px"}}>
                          <ListItemButton onClick={() => handleNavItemClicked(item)}>
                              <ListItemText primary={item}/>
                          </ListItemButton> 
                      </ListItem>  
                      { item === "Contact" ? <Divider key={`divider ${item}`} color="white"/> : null}
                  </div>
              )       
            })}
            </List>
    </Box>
  );
  
    return (
        <Box sx={{ display: 'flex' }}>
        <AppBar component="nav" position='static'>
          <Toolbar>
            {userDoc.currentUser ? <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: 'block', md: "none" } }}
            >
              <MenuIcon />
            </IconButton> : null}
            <Typography
              variant="h6"
              component="div"
              fontFamily="Russo One" 
              letterSpacing="2px"
              sx={{ flexGrow: 0, display: "block" }}
            >
              Trowel Tech
            </Typography>




            <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, ml: "30px", mt: "8px"}}>
              {navItemsDesktop.map((item) => (
                <Button key={item} sx={{ color: "white", fontSize: "12px" }} onClick={() => handleNavItemClicked(item)}>
                  {item}
                </Button>
              ))}
            </Box>



            <Box sx={{ display: {xs: 'none', md:"block"}, flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "primary.main", height: "50px", width: "50px", letterSpacing: "2px" }}>DS</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>





          </Toolbar>
        </AppBar>
        {
            userDoc.currentUser ? <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
          </Box> : null
        }
      </Box>
    )
}

export default Navbar;