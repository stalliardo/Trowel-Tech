import { Avatar, Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SelectMenu from '../selectMenu/SelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getData, createGangInformationDocument, updateGangInformationDocument, deleteMember } from '../../features/gangInfo/gangInformationSlice';
import MembersTable from '../membersTable/MembersTable';

const GangInformation = () => {

    const dispatch = useDispatch();

    const userDoc = useSelector((state) => state.user.currentUser);
    console.log("userDoc = ", userDoc);


    useEffect(() => {
        if (userDoc && userDoc.gangId) {
            console.log("USE EFFECT CALLED userDoc = ", userDoc);
            dispatch(getData(userDoc.gangId)).unwrap().then(() => {
            }).catch((e) => {
                console.log("Error getting data. Error: ", e);
            }).finally(() => {
                console.log("finally called");
            })
        } else {
        }
    }, [userDoc, dispatch])



    // console.log("userDoc from gangInfo = ", userDoc);

    const gangData = useSelector((state) => state.gangInformation);
    console.log("gangData bloew = ", gangData);


    // Will have to set is loading 

    // fetch the gangData from the db
    // set is loading to false



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
        // How the fuck am i gonna do this???
        // Send the row data to the database function then use arrayRemove
        console.log("row = ", row);
        // Now dispatch the deleteMember action
        const data = {row, id: userDoc.gangId}
        dispatch(deleteMember(data)).unwrap().then(() => {

        }).catch((e) => {

            console.log("Error deleting user. Error: ", e);
        })
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();

        // Need to determine here whether creating, updating or deleting.

        // before calling dispatch check if a gangId is currently present
        // Then if so call the update method not the create method

        console.log("gangData.members = ", gangData.members);


        if (userDoc.gangId) { // doc exists so update exisiting...
            console.log("UPDATE CALLED");
            dispatch(updateGangInformationDocument({formData, gangId: userDoc.gangId})).unwrap().then((response) => {
                console.log("response = ", response);
            }).catch((e) => {
                console.log("e = ", e);
            })
        } else {
            dispatch(createGangInformationDocument({ ...formData, creatorId: userDoc.id })).unwrap().then((response) => {
                console.log("response = ", response);
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


// TODO
// Disable states for buttons
// Conditional logic for showing no members text
// Import the user data from the store
// Add firebase logic for when a user adds members or enters a gang name

// Database
// Checks to enable the save button:
    // First name, last name, member type, day rate and skill fields all provided
// User clicks add memeber button
// Need to create a member slice to handle the fulfilled rejected and pending states
// Also need a new database/gangInformation file to handle all database calls
// Add the new document to the database
// Then return the serialized data to the page with the gang name and an array of members
// Then populate the table with the members that have just been added
