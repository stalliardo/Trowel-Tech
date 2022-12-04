import React, { useEffect, useRef, useState } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CircularIndicator from '../loadingIndicator/CircularIndicator';

import HoursDiaryTable from './HoursDiaryTable';

import { isObjectEmpty } from '../../utils/dataChecks';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../features/gangInfo/gangInformationSlice';
import { clearCurrentWeek, deleteWeek, getUsersForCurrentWeek, getWeeks, loadCurrentWeek } from '../../features/hoursDiary/hoursDiarySlice';

import { useWeekData } from '../../custom-hooks/hoursDiaryHooks';
import AddWeekPrompt from './AddWeekPrompt';
import { formatDate } from '../../utils/dateUtils';

// TODO
// Download CSV icon
// Change the date format to a more uk friendly one

const HoursDiaryContainer = () => {
    const userDoc = useSelector((state) => state.user.currentUser);
    const gangInformation = useSelector(state => state.gangInformation);
    const hoursDiaryData = useSelector(state => state.hoursDiary);

    const [weekEnding, setWeekEnding] = useState(hoursDiaryData.currentWeek?.weekEnding);
    const [editDate, setEditDate] = useState(weekEnding === "");
    const [isLoading, setIsLoading] = useState(true);
    const [showAddWeek, setShowAddWeek] = useState(false);
    const [isEditingWeek, setIsEditingWeek] = useState(false);

    const weekData = useWeekData(hoursDiaryData.currentWeek?.users);
    const previousWeek = useRef();
    const dispatch = useDispatch();

    const handleDateChange = (e) => {
        setWeekEnding(e.target.value);
    }

    const handleWeekEndingAdded = () => {
        setEditDate(false);
    }

    const handleAddNewWeek = () => {
        previousWeek.current = hoursDiaryData.currentWeek;
        dispatch(clearCurrentWeek());
        setIsEditingWeek(true);
    }

    const handleDeleteWeek = () => {
        previousWeek.current = {};
        const confirmation = window.confirm("Are you sure you want to delete this week?");

        if (confirmation) {
            dispatch(deleteWeek({ weekId: hoursDiaryData.currentWeek.id || hoursDiaryData.currentWeek.weekId, users: hoursDiaryData.currentWeek.users }));
        }
    }

    const onAddWeek = () => {
        setShowAddWeek(true);
    }

    const handleGoBack = () => {
        dispatch(loadCurrentWeek(previousWeek.current));
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
        setShowAddWeek(false);
        if (hoursDiaryData.currentWeek.weekEnding) {
            setWeekEnding(hoursDiaryData.currentWeek.weekEnding);
            setEditDate(false);
        }

        if (isObjectEmpty(hoursDiaryData.currentWeek)) {
            setWeekEnding("");
            setEditDate(true);
        }
    }, [hoursDiaryData.currentWeek]);

    useEffect(() => {
        if (hoursDiaryData.currentWeek.id) {
            dispatch(getUsersForCurrentWeek(hoursDiaryData.currentWeek.id)).finally(() => {
                setIsLoading(false)
            })
        }
    }, [hoursDiaryData.currentWeek?.id]);

    if (isLoading || hoursDiaryData.isLoading) return <CircularIndicator />;
    if (isObjectEmpty(hoursDiaryData.currentWeek) && !showAddWeek && isObjectEmpty(previousWeek.current)) {
        return <AddWeekPrompt addWeekClicked={onAddWeek} />;
    } else if (showAddWeek || (!isObjectEmpty(hoursDiaryData.currentWeek) || !isObjectEmpty(previousWeek.current))) {
        return (
            <>
                <Box display="flex" justifyContent="space-between" mb="20px" alignItems={{ xs: "flex-start", md: "flex-end" }} flexDirection={{ xs: "column", md: "row" }}>
                    <Box display="flex" alignItems="flex-end">
                        <Typography textAlign="left" variant='h5' >Week Ending: &nbsp;</Typography>
                        {
                            editDate ?
                                <>
                                    <OutlinedInput variant="outlined" type='date' sx={{ height: "40px" }} value={weekEnding} onChange={handleDateChange} />
                                    {
                                        weekEnding && <Tooltip title="Add Week Ending">
                                            <IconButton color='primary' onClick={handleWeekEndingAdded}><DoneIcon /></IconButton>
                                        </Tooltip>
                                    }

                                </>
                                :
                                <Typography variant='h5'>{formatDate(weekEnding)}</Typography>
                        }
                    </Box>
                    {
                        !isObjectEmpty(hoursDiaryData.currentWeek) && <Typography mt="20px" textAlign="left" variant="h5">Total gross for all members: £{weekData.grossTotal}</Typography>
                    }
                    {
                        !editDate &&
                        <Box display="flex" alignItems="flex-end">
                            {isObjectEmpty(hoursDiaryData.currentWeek) && <Box sx={{ mb: "8px" }}><Typography variant='subtitle' color="red">Not Saved</Typography></Box>}
                            {
                                !isObjectEmpty(hoursDiaryData.currentWeek) ?
                                    <>
                                        <Tooltip title="New Week">
                                            <IconButton color='primary' onClick={handleAddNewWeek}><AddCircleOutlinedIcon /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Week">
                                            <IconButton color='error' onClick={handleDeleteWeek}><DeleteIcon /></IconButton>
                                        </Tooltip>
                                    </>
                                    :
                                    <Tooltip title="Go Back">
                                        <IconButton color='primary' onClick={handleGoBack}><ArrowBackIcon /></IconButton>
                                    </Tooltip>
                            }
                        </Box>
                    }
                </Box>
                {
                    editDate ? <Typography textAlign="left" variant='h6'>Awaiting week ending date...</Typography> : <HoursDiaryTable weekEnding={weekEnding} isEditing={isEditingWeek} />
                }
            </>
        )
    }
}

export default HoursDiaryContainer;