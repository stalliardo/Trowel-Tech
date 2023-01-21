import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getInvitations, logOut } from '../../features/user/userSlice';

import { Avatar, Menu, MenuItem, Tooltip, AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, ListItemButton, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

const drawerWidth = 280;
const navItemsMobile = ['Home', 'Members', 'Plot Data', 'About', 'Contact', 'Profile', 'Settings', 'Sign Out'];
const navItemsDesktop = ['Home', 'Members', 'Plot Data', 'About', 'Contact'];
const settings = ['Profile', 'Settings', 'Sign Out'];

const Navbar = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotiification, setAnchorElNotification] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDoc = useSelector((state) => state.user.currentUser);
  const invitations = useSelector(state => state.user.invitations);

  useEffect(() => {
    if (userDoc && !invitations.length) {
      console.log("userdoc.id = ", userDoc.id);
      dispatch(getInvitations(userDoc.id));
    }
  }, [userDoc]);

  const extractInitials = (name) => {
    const names = name.split(" ");
    const initials = names.shift().charAt(0) + names.pop().charAt(0);

    return initials;
  };

  const handleCloseUserMenu = (link) => {
    if (link === "Settings" || "Profile" || "Sign Out") {
      if (link === "Sign Out") {
        dispatch(logOut())
        navigate("/");
      } else {
        navigate(link)
      }
    }
    setAnchorElUser(null);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotifications = (event) => {
    setAnchorElNotification(event.currentTarget);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavItemClicked = (link) => {
    if (link === "Sign Out") {
      dispatch(logOut());
      navigate("/");
    }
    if (link === "Plot Data") {
      navigate("plot-data");
    }
    else if (link === "Home") {
      navigate("/");
    } else {
      navigate(link);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ pt: "20px", background: "linear-gradient(131deg, rgba(1,179,217,1) 0%, rgba(3,2,74,1) 100%)", height: "100vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", pl: "10px" }}>
        {userDoc ? <Avatar sx={{ bgcolor: "primary.light", height: "60px", width: "60px" }}>{extractInitials(userDoc.name)}</Avatar> : null}
        {userDoc ? <Typography variant='p' color="white" ml="20px" fontSize="14px" letterSpacing="2px">{userDoc.name}</Typography> : null}
      </Box>

      <Divider color="white" sx={{ mt: "20px" }} />
      <List>
        {navItemsMobile.map((item, index) => {
          return (
            <div key={`div ${item}`}>
              <ListItem key={item} disablePadding sx={{ color: "white", letterSpacing: "2px" }}>
                <ListItemButton onClick={() => handleNavItemClicked(item)}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
              {item === "Contact" ? <Divider key={`divider ${item}`} color="white" /> : null}
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
          {userDoc ? <IconButton
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

          <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, ml: "30px", mt: "8px" }}>
            {userDoc ? navItemsDesktop.map((item) => (
              <Button key={item} sx={{ color: "white", fontSize: "12px" }} onClick={() => handleNavItemClicked(item)}>
                {item}
              </Button>
            )) : null}
          </Box>

          <Box sx={{ display: { xs: 'none', md: "block" }, flexGrow: 0 }}>
            <Tooltip title="Notifications">
              <IconButton onClick={handleOpenNotifications} sx={{ p: 0 }}>
                {userDoc ?
                  <Badge badgeContent={invitations.length} color="error">
                    <NotificationsIcon sx={{ color: "white" }} />
                  </Badge>
                  : null}
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userDoc ? <Avatar sx={{ bgcolor: "primary.main", height: "50px", width: "50px", letterSpacing: "2px" }}>{extractInitials(userDoc.name)}</Avatar> : null}
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
                <MenuItem key={setting} divider={true} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Menu
              sx={{ mt: '45px' }}
              id="notification-menu"
              anchorEl={anchorElNotiification}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNotiification)}
              onClose={handleCloseNotificationMenu}
            >
              {invitations.map((invite, index) => (
                <MenuItem key={index} divider={true} onClick={() => handleCloseUserMenu(invite)}>
                  <Typography textAlign="center">{`${invite.sendersName} wants you to join their gang`}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {
        userDoc ?
          <Box component="nav">
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