import { Box } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


const TabItem = ({ to, text }) => {
    const queryParam = useSelector(state => state.plotData.queryParam);

    return (
        <Box sx={{ height: "50px", mr: "40px", display: "flex", px: "10px", alignItems: "center" }}>
            <NavLink to={`${to}${queryParam ? `/${queryParam}` : ""}`} style={({ isActive }) => {
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