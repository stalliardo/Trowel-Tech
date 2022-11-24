import React, { useEffect, useState} from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import HoursDiaryTable from './HoursDiaryTable';


const HoursDiaryContainer = () => {

    const [weekEnding, setWeekEnding] = useState("");
    const [editDate, setEditDate] = useState(weekEnding ? false : true);

    const handleDateChange = (e) => {
        setWeekEnding(e.target.value);

        console.log("weekending = ", weekEnding);

        setEditDate(false);
    }

  return (
    <>
        
        <Box display="flex" justifyContent="space-between" mb="20px">
            <Box display="flex" alignItems="flex-end">
                <Typography textAlign="left" variant='h5'>WeekEnding: &nbsp;</Typography>    
                {
                    editDate ? <OutlinedInput variant="outlined" type='date' sx={{height: "40px"}} value={weekEnding} onChange={handleDateChange}/>
                    : <Typography variant='h5'>{weekEnding}</Typography>
                }
            </Box>
            {
                weekEnding !== "" && 
                <Box display="inline">
                    <Button variant='contained' sx={{width: "150px", height: "40px", mr: "20px"}} onClick={() => setEditDate(true)}>Edit Date</Button>
                    <Button variant='contained' sx={{width: "150px", height: "40px"}} onClick={() => setEditDate(true)}>Save Week</Button>
                </Box>
            }
        </Box>
    
        {
            weekEnding === "" ? <Typography variant='h6'>Awaiting week ending date...</Typography> : <HoursDiaryTable weekEnding={weekEnding}/>
        }
    
    </>

    
  )
}

export default HoursDiaryContainer;

// TODO

// this is the comp that should check for a current week, if none load the table