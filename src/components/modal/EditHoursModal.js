import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const rowData = [
    { name: "mon", label: "Monday" },
    { name: "tue", label: "Tuesday" },
    { name: "wed", label: "Wednesday" },
    { name: "thu", label: "Thursday" },
    { name: "fri", label: "Friday" },
    { name: "sat", label: "Saturday" },
    { name: "sun", label: "Sunday" },
];

const EditHoursModal = ({ data, modalClosed }) => {
    const GridItem = ({ name, label, onChange }) => {
        return (
            <Grid item xs={12}>
                <TextField  name={name} label={label} InputProps={{ inputProps: { min: 0 } }} required={true} onChange={onChange} fullWidth type="number" />
            </Grid>
        )
    }

    const [formData, setFormData] = useState(data);
    const isLoading = useSelector(state => state.hoursDiary.isLoading);

    const handleCancel = () => {
        modalClosed()
    }

    const handleChange = (e) => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} >
            <Grid container rowSpacing={2} sx={{ width: { xs: "90%", md: "50%" }, margin: "auto" }}>
                {
                    rowData.map((row) => <GridItem key={row.name} name={row.name} label={row.label} />)
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