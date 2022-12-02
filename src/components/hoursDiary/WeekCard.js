import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';

const CardItem = (data) => {
    return (
        <Box display="flex" sx={{ justifyContent: "space-between" }}>
            <Typography variant="subtitle">{data.title}</Typography>
            <Typography variant="subtitle">{data.value}</Typography>
        </Box>
    )
}

const paperStyles = {
    width: "30%",
    height: "80px", 
    margin: "none", 
    padding: "6px 10px", 
    mt: "20px", 
    "&:hover": {cursor: "pointer", backgroundColor: "lightGrey"}
}


const WeekCard = (props) => {
    return (
        <Paper elevation={12} sx={paperStyles}>
           <CardItem title="Week Ending" value={props.weekEnding}/>
           <CardItem title="Total Hours" value={props.hours}/>
           <CardItem title="Total Gross" value={props.gross}/>
        </Paper>
    )
}

export default WeekCard;