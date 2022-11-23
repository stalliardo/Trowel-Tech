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
                weekEnding !== "" && <Button variant='contained' sx={{width: "150px", height: "40px"}} onClick={() => setEditDate(true)}>Edit Date</Button>
            }
        </Box>
    
        {
            weekEnding === "" ? <Typography variant='h6'>Awaiting week ending date...</Typography> : <HoursDiaryTable />
        }
    
    </>

    
  )
}

export default HoursDiaryContainer;

// TODO:
    // Week ending date/title show a date picker?
    // Display the weeklyRecords in the extendableTable
    // Need the ability to add a new week
    // Format the date to a more uk friendly style

// Initial display:
    // hours table NEW:
        // How will the users be loaded 
        // Will need to get them from the gangInformation state, then populate the table with those users

    // Hours table current:
        // Will check if there is a currentWeek loaded in state, if not will get the data from the DB and load the state

