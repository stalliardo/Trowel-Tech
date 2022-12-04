import React from 'react'

import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { loadCurrentWeek } from '../../features/hoursDiary/hoursDiarySlice';
import { formatDate } from '../../utils/dateUtils';

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
    "&:hover": { cursor: "pointer", backgroundColor: "lightGrey" }
}

const WeekCard = ({data}) => {
    const dispatch = useDispatch();

    const handleCardClicked = () => {
        dispatch(loadCurrentWeek(data));
    }

    return (
        <Paper elevation={3} sx={paperStyles} onClick={handleCardClicked}>
            <CardItem title="Week Ending" value={formatDate(data.weekEnding)} />
            <CardItem title="Total Hours" value={data.hours} />
            <CardItem title="Total Gross" value={`£${data.gross}`} />
        </Paper>
    )
}

export default WeekCard;