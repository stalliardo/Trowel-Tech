import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TabItem = ({ to, text }) => {
    const queryParam = useSelector(state => state.plotData.queryParam);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box sx={{ height: "50px", mr: {xs: "10px", sm: "20px"}, display: "flex", px: "10px", alignItems: "center" }}>
            <NavLink to={`${to}${queryParam ? `/${queryParam}` : ""}`} style={({ isActive }) => {
                return {
                    textDecoration: "none",
                    color: isActive ? "black" : "#bdbdbd",
                    fontSize: matches ? "18px" : "10px"
                }
            }}>
                {text}
            </NavLink>
        </Box>
    )
}

export default TabItem