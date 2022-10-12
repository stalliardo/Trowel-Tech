import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CircularIndicator = (props) => {
    return <Box display="flex" justifyContent="center" sx={props.style}><CircularProgress/></Box>
}

export default CircularIndicator;