import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SelectMenu from '../selectMenu/SelectMenu';

import { useDispatch } from 'react-redux';

import { createGangInformationDocument, updateGangInformationDocument } from '../../features/gangInfo/gangInformationSlice';
import { setGangId } from '../../features/user/userSlice';
import { showToast } from '../../features/notifications/notificationSlice';

const memberTypeOptions = ["Split", "Day Rate"];
const skillMenuItems = ["Bricklayer", "Hod Carrier"];

const AddMemberModal = (props) => {

    const initialFormData = { firstName: "", lastName: "", memberType: "", dayRate: "0", skill: "" };
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (props.userDoc.gangId) {
            dispatch(updateGangInformationDocument({ formData, gangId: props.userDoc.gangId })).unwrap().then((response) => {
                props.modalClosed();
            }).catch((e) => {
                dispatch(showToast({ message: `An error occured. Please try again later.`, duration: 3000, alertType: "error" }));

            })
        } else {
            dispatch(createGangInformationDocument({ ...formData, creatorId: props.userDoc.id })).unwrap().then((response) => {
                dispatch(setGangId(response.gangId));
                props.modalClosed();
            }).catch((e) => {
                dispatch(showToast({ message: `An error occured. Please try again later.`, duration: 3000, alertType: "error" }));
            })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleCancelClicked = () => {
        props.modalClosed();
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6}>
                    <TextField name='firstName' label="First Name" required onChange={handleChange} autoFocus fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name='lastName' label="Last Name" required onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <SelectMenu
                        value={formData.memberType}
                        label="Member Type"
                        name="memberType"
                        menuItems={memberTypeOptions}
                        handleChange={handleChange}
                        required={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField name='dayRate' label="Day Rate £" InputProps={{inputProps: { min: 0 }}} required={true} onChange={handleChange} fullWidth type="number" />
                </Grid>

                <Grid item xs={12}>
                    <SelectMenu
                        value={formData.skill}
                        label="Skill"
                        name="skill"
                        menuItems={skillMenuItems}
                        handleChange={handleChange}
                        required={true}
                    />
                </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: "space-between" }}>
                <Button variant='contained' type="submit" sx={{ mt: "20px", width: { xs: "100%", md: "40%" } }}>{isLoading ? <CircularProgress style={{ color: "white" }} /> : "Save"}</Button>
                <Button variant='contained' color="warning" sx={{ mt: "20px", width: { xs: "100%", md: "40%" } }} onClick={handleCancelClicked}>Cancel</Button>
            </Grid>
        </form>
    )
}

export default AddMemberModal