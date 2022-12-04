import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import WeekCard from './WeekCard';

import { extractLastSixWeeks } from '../../utils/hoursDiaryUtils';

const DisplayPreviousWeeks = () => {
    const allWeeks = useSelector(state => state.hoursDiary.allWeeks);
    const [lastSixWeeks, setLastSixWeeks] = useState([]);
    const currentWeek = useSelector(state => state.hoursDiary.currentWeek);

    useEffect(() => {
        if (allWeeks.length > 1) {
            const lastSix = extractLastSixWeeks(allWeeks, currentWeek.id); 

            if(lastSix.length) {
                setLastSixWeeks(lastSix);
            }
        }

    }, [allWeeks, currentWeek]);

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
                    lastSixWeeks.map((data, index) => {
                        return (
                            <WeekCard key={index} data={data}/>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default DisplayPreviousWeeks;