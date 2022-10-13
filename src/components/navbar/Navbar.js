import React, { useEffect } from 'react'
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

import { Avatar, Grid, useThemeProps } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserData, logOut, noUserFound } from '../../features/user/userSlice'




import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 280;
const navItems = ['Home', 'About', 'Contact'];

function Navbar(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavItemClicked = (link) => {
        console.log("nav item clicked. Link = ", link);
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ pl: "20px", pt: "20px", background: "linear-gradient(131deg, rgba(1,179,217,1) 0%, rgba(3,2,74,1) 100%)", height: "100vh" }}>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Avatar sx={{ bgcolor: "primary.light", height: "60px", width: "60px" }}>DS</Avatar>
                <Typography variant='p' color="white" ml="20px" fontSize="20px" letterSpacing="2px">Stalliardo</Typography>
            </Box>

        <Divider sx={{pb: "20px"}}/>
        <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding sx={{color: "white", letterSpacing: "2px"}}>
            <ListItemButton onClick={() => handleNavItemClicked(item)}>
              <ListItemText component="a" primary={item}/>
            </ListItemButton>
          </ListItem>
        ))}
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
              sx={{ mr: 2, display: { sm: 'none' } }}
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
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
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
                display: { xs: 'block', sm: 'none' },
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

// TODO:

    // Check if the user is present, if so add links for account, home, gang information, members
    // Change GangInformation to Members as all that is in there is a members table and add members form

    // Links required:
        // - Gang info
        // - Tools
        // - Statistics
        // - Hours Diary

    // How will the links be displayed on all devices?

    // Create an Avatar with the initials displayed
    // This will also have a drop down menu containing:
        // "signed in as full name"
        // "Your Account"
        // "Help"
        // "Settings"
        // "Sign Out"
    
    // Other links will be displayed to the right of the trowel tech text. These links will be the ones noted above in the links required

    // Will also have an alert icon to the left of the avatar (future feature)
