import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

import React, { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TabItem = ({ to, text, requiresQueryParam = true }) => {
    const queryParam = useSelector(state => state.plotData.queryParam);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (requiresQueryParam && !queryParam && location.pathname !== "/plot-data/edit/information") {
            navigate("/plot-data");
        }
    }, [location]);

    const Ui = () => {
        return <Box sx={{ height: "50px", mr: { xs: "10px", sm: "20px" }, display: "flex", px: "10px", alignItems: "center" }}>
            <NavLink to={`${to}${queryParam ? `/${queryParam}` : ""}`} style={({ isActive }) => {
                return {
                    textDecoration: "none",
                    color: isActive ? "black" : "#bdbdbd",
                    fontSize: matches ? "16px" : "10px"
                }
            }}>
                {text}
            </NavLink>
        </Box>
    }

    if (requiresQueryParam && queryParam) return <Ui />
    if (!requiresQueryParam) return <Ui />;
}

export default TabItem;