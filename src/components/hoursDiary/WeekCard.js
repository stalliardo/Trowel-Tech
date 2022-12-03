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
    mt: "10px", 
    "&:hover": {cursor: "pointer", backgroundColor: "lightGrey"}
}


const WeekCard = (props) => {

    // WIll need to pass in the real data from the allweeks/last 6 weeks array.
    // When clicked can then add this card to the currentWeek Object

    const handleCardClicked = () => {
        console.log("CLicked");
    }


    return (
        <Paper elevation={3} sx={paperStyles} onClick={handleCardClicked}>
           <CardItem title="Week Ending" value={props.weekEnding}/>
           <CardItem title="Total Hours" value={props.hours}/>
           <CardItem title="Total Gross" value={`£${props.gross}`}/>
        </Paper>
    )
}

export default WeekCard;