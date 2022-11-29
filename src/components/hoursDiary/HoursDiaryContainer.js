import React, { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';


import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import HoursDiaryTable from './HoursDiaryTable';

import { isObjectEmpty } from '../../utils/dataChecks';
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../features/gangInfo/gangInformationSlice';
import { getUsersForCurrentWeek, getWeeks } from '../../features/hoursDiary/hoursDiarySlice';
import CircularIndicator from '../loadingIndicator/CircularIndicator';

import { useWeekData } from '../../custom-hooks/hoursDiaryHooks';

// TODOS:
// Add a delete week button - DONE
// Change the buttons to display an icon instead of text to save space - DONE
// Will maybe remove the hours-dairy route and just display all the data on the homepage for extra content
// What happens when a user changes the date on an existing week?
    // Theres currently no way of saving the new date...

const HoursDiaryContainer = () => {
    const [weekEnding, setWeekEnding] = useState("");
    const [editDate, setEditDate] = useState(weekEnding === "");
    const [isLoading, setIsLoading] = useState(true);

    const userDoc = useSelector((state) => state.user.currentUser);
    const gangInformation = useSelector(state => state.gangInformation);
    const hoursDiaryData = useSelector(state => state.hoursDiary);

    const weekData = useWeekData(hoursDiaryData.currentWeek.users);

    const dispatch = useDispatch();

    const handleDateChange = (e) => {
        setWeekEnding(e.target.value);
        setEditDate(false);
    }

    const handleAddNewWeek = () => {
        // TODO
    }

    const handleDeleteWeek = () => {
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
                <Box display="flex" justifyContent="space-between" mb="20px" alignItems="flex-end">
                    <Box display="flex" alignItems="flex-end">
                        <Typography textAlign="left" variant='h5'>Week Ending: &nbsp;</Typography>
                        {
                            editDate ? <OutlinedInput variant="outlined" type='date' sx={{ height: "40px" }} value={weekEnding} onChange={handleDateChange} />
                                :
                                <>
                                    <Typography variant='h5'>{weekEnding}</Typography> <Tooltip title="Edit Date">
                                        <IconButton color='primary' onClick={() => setEditDate(true)}><EditIcon /></IconButton>
                                    </Tooltip>
                                </>
                        }
                    </Box>
                    {
                        // TEST
                        !isObjectEmpty(hoursDiaryData.currentWeek) && <Typography mt="20px" textAlign="left" variant="h5">Total gross for all members: £{weekData.grossTotal}</Typography>
                    }
                    {
                        weekEnding !== "" &&
                        <Box display="inline">
                            <Tooltip title="New week">
                                <IconButton color='primary' onClick={handleAddNewWeek}><AddCircleOutlinedIcon /></IconButton>
                            </Tooltip>
                            <Tooltip title="Delete week">
                                <IconButton color='error' onClick={handleDeleteWeek}><DeleteIcon /></IconButton>
                            </Tooltip>
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