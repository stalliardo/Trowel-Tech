import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import WeekCard from './WeekCard';
import moment from 'moment/moment';
import { formatDate } from '../../utils/dateUtils';
import { extractLastSixWeeks } from '../../utils/hoursDiaryUtils';

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

    const allWeeks = useSelector(state => state.hoursDiary.allWeeks);
    const [lastSixWeeks, setLastSixWeeks] = useState([]);

    // 1 - If only one week, display message "There is only week available and this is being displayed in the table above"
    // 2 - allWeeks.length > 1 then display those weeks in the grid
    // 3 - no weeks at all message: "No weeks found! As you save weeks the previous six will be displayed here"

    useEffect(() => {

        if (allWeeks.length > 1) {

            // console.log("todays date = ", new Date(), " Formattetd = ", formatDate(new Date()));
            // console.log("all weeks = ", allWeeks);

            const lastSix = extractLastSixWeeks(allWeeks);

            // need to loop and extract the last 6 weeks here and then set the lastSixWeeks array
        }

    }, [allWeeks]);


    return (
        <Box>
            <Typography variant="h5">Previous Six Weeks</Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", flexBasis: "33%", flexWrap: "wrap" }}>
                {allWeeks.length > 0 &&
                    allWeeks.length === 1 ?
                    <Box>
                        <Typography variant='subtitle'>There was only one week found! That week is being displayed in the table above.</Typography>
                    </Box>
                    :
                    allWeeks.map((data, index) => {
                        return (
                            <WeekCard key={index} weekEnding={data.weekEnding} hours={data.totalHours} gross={data.totalGross} />
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