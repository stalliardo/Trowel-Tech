import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import WeekCard from './WeekCard';

import { sortWeeks } from '../../utils/hoursDiaryUtils';

const DisplayPreviousWeeks = () => {
    const hoursDiaryData = useSelector(state => state.hoursDiary);
    const [allWeeks, setAllWeeks] = useState([]);

    useEffect(() => {
        if (hoursDiaryData.allWeeks.length > 1) {
            const filteredWeeks = hoursDiaryData.allWeeks.filter(week => week.id !== hoursDiaryData.currentWeek.id);
            const sortedWeeks = sortWeeks(filteredWeeks);

            sortedWeeks.forEach((week) => {
                delete week.formattedDate;
            })

            setAllWeeks(sortedWeeks);
        }

    }, [hoursDiaryData.allWeeks, hoursDiaryData.currentWeek]);

    if (!hoursDiaryData.isLoading && hoursDiaryData.allWeeks.length) {
        return (
            <Box>
                <Typography variant="h5">Previous Weeks</Typography>

                <Box sx={{ display: "flex", flexDirection: {sm: "column", md: "row"}, justifyContent: "flex-start", flexBasis: "33%", flexWrap: "wrap", maxHeight: "350px", overflowY: "scroll" }}>
                    {hoursDiaryData.allWeeks.length > 0 &&
                        hoursDiaryData.allWeeks.length === 1 ?
                        <Box>
                            <Typography variant='subtitle'>There was only one week found! That week is being displayed in the table above.</Typography>
                        </Box>
                        :
                        allWeeks.map((data, index) => {
                            return (
                                <WeekCard key={index} data={data} />
                            )
                        })
                    }
                </Box>
            </Box>
        )
    }
}

export default DisplayPreviousWeeks;