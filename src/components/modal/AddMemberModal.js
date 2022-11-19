import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import SelectMenu from '../selectMenu/SelectMenu';

const memberTypeOptions = ["Split", "Day Rate"];
const skillMenuItems = ["Bricklayer", "Hod Carrier"];



const AddMemberModal = (props) => {
    
    const initialFormData = { firstName: "", lastName: "", memberType: "", dayRate: "0", skill: "" };
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6}>
                    <TextField name='firstName' label="First Name" onChange={handleChange} autoFocus fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name='lastName' label="Last Name" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <SelectMenu
                        value={formData.memberType}
                        label="Member Type"
                        name="memberType"
                        menuItems={memberTypeOptions}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField name='dayRate' label="Day Rate £" onChange={handleChange} fullWidth type="number" />
                </Grid>

                <Grid item xs={12}>
                    <SelectMenu
                        value={formData.skill}
                        label="Skill"
                        name="skill"
                        menuItems={skillMenuItems}
                        handleChange={handleChange}
                    />
                </Grid>
            </Grid>

            <Button type='submit' variant='contained' fullWidth sx={{ mt: "20px" }}>
                {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Add Member"}
            </Button>
        </form>
    )
}

export default AddMemberModal