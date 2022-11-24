import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { saveWeek } from '../../features/hoursDiary/hoursDiarySlice'

const rowData = [
    { name: "mon", label: "Monday" },
    { name: "tue", label: "Tuesday" },
    { name: "wed", label: "Wednesday" },
    { name: "thu", label: "Thursday" },
    { name: "fri", label: "Friday" },
    { name: "sat", label: "Saturday" },
    { name: "sun", label: "Sunday" },
];

const EditHoursModal = ({ data, modalClosed, weekEnding, gangId, membersData }) => {

    console.log("members data passed through = ", membersData);
    const GridItem = ({ name, label, value, onChange }) => {
        console.log("value = ", value);
        return (
            <Grid item xs={12}>
                <TextField  name={name} label={label} value={value} InputProps={{ inputProps: { min: 0 } }} required={true} onChange={onChange} fullWidth type="number" />
            </Grid>
        )
    }

    const [formData, setFormData] = useState(data);
    const isLoading = useSelector(state => state.hoursDiary.isLoading);
    
    const dispatch = useDispatch();

    const handleCancel = () => {
        modalClosed()
    }

    const handleChange = (e) => {
        console.log("e.target = ", e.target);
        console.log("e.value = ", e.target.value);

        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        // Going to need to pass all members not just the one being edited

        const filteredMembers = membersData.filter(member => member.id.userId !== formData.id.userId);

        console.log("filtered members = ", filteredMembers);

        const dataObject = {...formData, gangId, weekEnding, dayRate: formData.id.dayRate, userId: formData.id.userId, nonEditedMembers: filteredMembers};

        delete dataObject.id;

        console.log("formData = ", formData);
        console.log("dataObjectc = ", dataObject);
        
        dispatch(saveWeek(dataObject)).unwrap().then((response) => {
            console.log("response = ", response);
        }).catch((e) => {
            console.log("error = ", e);
        })



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