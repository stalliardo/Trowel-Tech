import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { saveWeek, updateWeek } from '../../features/hoursDiary/hoursDiarySlice'
import { isObjectEmpty } from '../../utils/dataChecks'

const rowData = [
    { name: "mon", label: "Monday" },
    { name: "tue", label: "Tuesday" },
    { name: "wed", label: "Wednesday" },
    { name: "thu", label: "Thursday" },
    { name: "fri", label: "Friday" },
    { name: "sat", label: "Saturday" },
    { name: "sun", label: "Sunday" },
];

const GridItem = ({ name, label, value, onChange }) => {
    return (
        <Grid item xs={12}>
            <TextField  name={name} label={label} value={value} InputProps={{ inputProps: { min: 0 } }} required={true} onChange={onChange} fullWidth type="number" />
        </Grid>
    )
}

const EditHoursModal = ({ data, modalClosed, weekEnding, gangId, membersData }) => {    
    const [formData, setFormData] = useState(data);
    const isLoading = useSelector(state => state.hoursDiary.isLoading); 
    const hoursDiaryData = useSelector(state => state.hoursDiary);
    
    const dispatch = useDispatch();

    const handleCancel = () => {
        modalClosed()
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let dataObject = {};

        console.log('formData top = ', formData);
        
        
        if(isObjectEmpty(hoursDiaryData.currentWeek)) { // <- CREATEING
            const filteredMembers = membersData.filter(member => member.id !== formData.id);
            dataObject = {
                gangId,
                weekEnding,
                users: [formData, ...filteredMembers]
            };
            dispatch(saveWeek(dataObject)).unwrap().then(() => {
                modalClosed();
            }).catch((e) => {
                console.log('error updating user. Error : ', e);
                
                // TODO
            })
        } else { // <- UPDATING
           console.log('update called');
           

            dataObject = {
                weekId: hoursDiaryData.currentWeek.id,
                formData
            }

            dispatch(updateWeek(dataObject)).unwrap().then(() => {
                modalClosed();
            }).catch((e) => {
                console.log('error updating user. Error : ', e);
                
                // TODO
            })
            
        }

        // need to determine if creating or updating, can do this via the weekId
        // Whatdo i want to do if this is an update???
            // Well dont need to loop all the members now as they are already in the sub collection
            // only need to update the record for the edited user via their docID
        
        
    }

    return (
        <form onSubmit={handleSubmit} >
            <Grid container rowSpacing={2} sx={{ width: { xs: "90%", md: "50%" }, margin: "auto" }}>
                {
                    rowData.map((row) => <GridItem key={row.name} name={row.name} value={formData[row.name]} label={row.label} onChange={handleChange}/>)
                }
                <Grid container justifyContent="space-between">
                    <Button variant='contained' type="submit" sx={{ mt: "20px", width: { xs: "100%", md: "40%" } }}>{isLoading ? <CircularProgress style={{ color: "white" }} /> : "Save"}</Button>
                    <Button variant='contained' color="warning" sx={{ mt: "20px", width: { xs: "100%", md: "40%" } }} onClick={handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default EditHoursModal