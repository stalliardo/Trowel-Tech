import { Avatar, Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SelectMenu from '../selectMenu/SelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getData, createGangInformationDocument, updateGangInformationDocument, deleteMember, setIsLoading } from '../../features/gangInfo/gangInformationSlice';
import MembersTable from '../membersTable/MembersTable';

const GangInformation = () => {

    const dispatch = useDispatch();

    const userDoc = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (userDoc && userDoc.gangId) {
            dispatch(getData(userDoc.gangId)).unwrap().then(() => {
            }).catch((e) => {
                console.log("Error getting data. Error: ", e);
            });
        } else {
            console.log("ELSE CALLED !!!!!!!!");
            dispatch(setIsLoading(false));
        }

     
    }, [])

    const gangData = useSelector((state) => state.gangInformation);
    const isLoading = useSelector((state) => state.gangInformation.isLoading)

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const skillMenuItems = ["Bricklayer", "Hod Carrier"];
    const memberTypeOptions = ["Split", "Day Rate"];

    const initialFormData = { firstName: "", lastName: "", memberType: "", dayRate: "0", skill: "" };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDeleteMember = (row) => {
        const data = {row, id: userDoc.gangId}
        dispatch(deleteMember(data)).unwrap().then(() => {
        }).catch((e) => {
            console.log("Error deleting user. Error: ", e);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userDoc.gangId) {
            console.log("UPDATE CALLED");
            dispatch(updateGangInformationDocument({formData, gangId: userDoc.gangId})).unwrap().then((response) => {
            }).catch((e) => {
                console.log("e = ", e);
            })
        } else {
            dispatch(createGangInformationDocument({ ...formData, creatorId: userDoc.id })).unwrap().then((response) => {
            }).catch((e) => {
                console.log("e = ", e);
            })
        }
    }

    return (
        isLoading ? <Box sx={{ width: "fit-content", margin: "auto", mt: "100px" }}><CircularProgress size={70} /></Box> : <Container maxWidth="lg" sx={{ mt: "30px", pt: "30px", pb: "100px" }}>
            <Typography fontFamily="'Russo one'" textAlign="center" variant="h4">Gang Information</Typography>

            <Container sx={{ mt: "20px" }}>
                <Typography variant='h4' >Members:</Typography>
                {/* TODO */}
                {/* {gangData ? <Typography variant='h6'>No members have been added yet. Please use the form below to add memebers to the gang.</Typography> : null} */}

                <Box sx={{ width: "100%", border: "1px solid red" }}>
                    <MembersTable 
                        data={gangData} 
                        onDeleteClicked={handleDeleteMember}
                        />
                </Box>

                <Container disableGutters maxWidth="sm" sx={{ ml: "0", mr: "auto", mt: "30px" }}>
                    <Paper elevation={6} sx={{ padding: "30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar sx={{ backgroundColor: "red", }}>
                            <GroupAddOutlinedIcon />
                        </Avatar>
                        <Typography variant='h5' sx={{ mt: "10px", mb: "20px" }}>
                            Add Members
                        </Typography>
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

                            <Button type='submit' variant='contained' fullWidth sx={{ mt: "20px" }} disabled={buttonDisabled}>
                                {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Add Member"}
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Container>
        </Container>
    )
}

export default GangInformation


// TODOS

// make sure all form fields are entered

// Implement the edit functionality

// 