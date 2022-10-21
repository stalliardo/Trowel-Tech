import { Box } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const TabItem = ({to, text}) => {
  return (
   <Box sx={{ height: "50px", mr: "40px", display: "flex", px: "10px", alignItems: "center"}}>
     <NavLink to={to} style={({isActive}) => {
        return {
            textDecoration: "none",
            color: isActive ? "black" : "#bdbdbd",
            
        }
     }}>
        {text}
    </NavLink>
   </Box>
  )
}

export default TabItem