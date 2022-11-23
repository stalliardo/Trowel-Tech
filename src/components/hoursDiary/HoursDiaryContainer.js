import React, { useEffect, useState} from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput';


const HoursDiaryContainer = () => {

    const [weekEnding, setWeekEnding] = useState("");
    const [editDate, setEditDate] = useState(weekEnding ? false : true);

    const handleDateChange = (e) => {
        console.log('date = ', e.target.value);
        setWeekEnding(e.target.value);
        setEditDate(false);
        
    }

    // useEffect(() => {
    //     setWeekEnding()
    // })

  return (
    <Box sx={{border: "1px solid green"}}>
        <Box display="flex">
           <Box>
           <Typography textAlign="left" variant='h5'>WeekEnding: </Typography>    
            {
                editDate ? <OutlinedInput variant="outlined" type='date' value={weekEnding} onChange={handleDateChange}/> : weekEnding
            }
           </Box>
        </Box>
    </Box>
  )
}

export default HoursDiaryContainer;

// TODO:
    // Week ending date/title show a date picker?
    // Display the weeklyRecords in the extendableTable
    // Need the ability to add a new week

// Initial display:
    // hours table NEW:
        // How will the users be loaded 
        // Will need to get them from the gangInformation state, then populate the table with those users

    // Hours table current:
        // Will check if there is a currentWeek loaded in state, if not will get the data from the DB and load the state

