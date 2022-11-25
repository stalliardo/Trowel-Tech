import React, { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import HoursDiaryTable from './HoursDiaryTable';

import { isObjectEmpty } from '../../utils/dataChecks';
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../features/gangInfo/gangInformationSlice';
import { getUsersForCurrentWeek, getWeeks } from '../../features/hoursDiary/hoursDiarySlice';
import CircularIndicator from '../loadingIndicator/CircularIndicator';

const HoursDiaryContainer = () => {
    const [weekEnding, setWeekEnding] = useState("");
    const [editDate, setEditDate] = useState(weekEnding === "");
    const [isLoading, setIsLoading] = useState(true);

    const userDoc = useSelector((state) => state.user.currentUser);
    const gangInformation = useSelector(state => state.gangInformation);
    const hoursDiaryData = useSelector(state => state.hoursDiary);

    const dispatch = useDispatch();

    const handleDateChange = (e) => {
        setWeekEnding(e.target.value);
        setEditDate(false);
    }

    const onNewWeekClicked = () => {
        // TODO
    }

    useEffect(() => {
        if (isObjectEmpty(hoursDiaryData.currentWeek) && userDoc?.gangId) {
            dispatch(getWeeks(userDoc.gangId)).unwrap().then((data) => {
                if (!data.length && !gangInformation.members.length && userDoc?.gangId) {
                    dispatch(getData(userDoc.gangId)).unwrap();
                }
            }).catch((e) => {
                // TODO
            }).finally(() => {
                if (isObjectEmpty(hoursDiaryData.currentWeek)) setIsLoading(false);
            })
        }
    }, []);

    useEffect(() => {
        if (hoursDiaryData.currentWeek.weekEnding) {
            setWeekEnding(hoursDiaryData.currentWeek.weekEnding);
            setEditDate(false);
        }
    }, [hoursDiaryData])

    useEffect(() => {
        if (hoursDiaryData.currentWeek.id) {
            dispatch(getUsersForCurrentWeek(hoursDiaryData.currentWeek.id)).finally(() => {
                setIsLoading(false)
            })
        }
    }, [hoursDiaryData.currentWeek.id])

    return (
        isLoading ? <CircularIndicator /> :
            <>
                <Box display="flex" justifyContent="space-between" mb="20px">
                    <Box display="flex" alignItems="flex-end">
                        <Typography textAlign="left" variant='h5'>WeekEnding: &nbsp;</Typography>
                        {
                            editDate ? <OutlinedInput variant="outlined" type='date' sx={{ height: "40px" }} value={weekEnding} onChange={handleDateChange} />
                                : <Typography variant='h5'>{weekEnding}</Typography>
                        }
                    </Box>
                    {
                        weekEnding !== "" &&
                        <Box display="inline">
                            <Button variant='contained' sx={{ width: "150px", height: "40px", mr: "20px" }} onClick={() => setEditDate(true)}>Edit Date</Button>
                            <Button variant='contained' sx={{ width: "150px", height: "40px" }} onClick={onNewWeekClicked}>New Week</Button>
                        </Box>
                    }
                </Box>

                {
                    weekEnding === "" ? <Typography variant='h6'>Awaiting week ending date...</Typography> : <HoursDiaryTable weekEnding={weekEnding} />
                }
            </>
    )
}

export default HoursDiaryContainer;