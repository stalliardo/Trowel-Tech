import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import WeekCard from './WeekCard';

const dummyData = [
    {
        weekEnding: "2022-10-10",
        totalHours: "190",
        totalGross: "1000"
    },
    {
        weekEnding: "2022-10-10",
        totalHours: "190",
        totalGross: "1000"
    },
    {
        weekEnding: "2022-10-10",
        totalHours: "190",
        totalGross: "1000"
    },
    {
        weekEnding: "2022-10-10",
        totalHours: "190",
        totalGross: "1000"
    },
    {
        weekEnding: "2022-10-10",
        totalHours: "190",
        totalGross: "1000"
    },
    {
        weekEnding: "2022-10-10",
        totalHours: "190",
        totalGross: "1000"
    }
]

const DisplayPreviousWeeks = () => {
    return (
        <Box>
            <Typography variant="h5">Previous Six Weeks</Typography>

            <Box sx={{display: "flex", justifyContent: "space-between", flexBasis: "33%", flexWrap: "wrap"}}>
                {
                    dummyData.map((data, index) => {
                        return (
                            <WeekCard key={index} weekEnding={data.weekEnding} hours={data.totalHours} gross={data.totalGross}/>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default DisplayPreviousWeeks;

// TODO
    // Add a the select menu for selecting older weeks


// Will need to get the latest 6 weeks from the allWeeks array.
// Extract the latest 6 based on date
// Will then loop over these and return a card for each, maximum 6

// How can i optimise this as this is a semi heavy computation
    // Only want to call once and then only when the hoursDairy.allWeeks array changes