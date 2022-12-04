import React from 'react'

import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { loadCurrentWeek } from '../../features/hoursDiary/hoursDiarySlice';
import { formatDate } from '../../utils/dateUtils';

const CardItem = (data) => {
    return (
        <Box display="flex" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" color="text.subText">{data.title}</Typography>
            <Typography variant="h3">{data.value}</Typography>
        </Box>
    )
}

const paperStyles = {
    width: {xs: "100%", md: "30%"},
    height: "80px",
    marginRight: "10px",
    padding: "14px 16px 0px",
    mt: "10px",
    "&:hover": { cursor: "pointer", backgroundColor: "lightGrey" }
}

const WeekCard = ({data}) => {

    console.log("data = ", data);
    const dispatch = useDispatch();

    const handleCardClicked = () => {
        dispatch(loadCurrentWeek(data));
    }

    return (
        <Paper elevation={3} sx={paperStyles} onClick={handleCardClicked}>
            <CardItem title="Week Ending:" value={formatDate(data.weekEnding)} />
            {/* <CardItem title="Total Hours" value={data.hours} />
            <CardItem title="Total Gross" value={`£${data.gross}`} /> */}
        </Paper>
    )
}

export default WeekCard;