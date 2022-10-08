import { Avatar, Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SelectMenu from '../selectMenu/SelectMenu';
import { useDispatch } from 'react-redux';
import { createGang } from '../../features/gangInfo/gangInformationSlice';
import MembersTable from '../membersTable/MembersTable';

const GangInformation = () => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const skillMenuItems = ["Bricklayer", "Hod Carrier"];
    const memberTypeOptions = ["Split", "Day Rate"];

    const [gangName, setGangName] = useState(""); // <- Will this not initially check the gangInfo Doc?
    const initialGangName = ""; // <- this def will need to check for an exisiting name

    const [gangNameSaveButtonDisabled, setGangNameSaveButtonDisabled] = useState(true);

    const initialFormData = {firstName: "", lastName: "", memberType: "", dayRate: "0", skill: ""};
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setGangNameSaveButtonDisabled(initialGangName === gangName);
    }, [gangName])


    const handleGangNameChange = (e) => {
        setGangName((e.target.value));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        
        dispatch(createGang(formData)).unwrap().then((response) => {
            console.log("response = ", response);
        }).catch((e) => {
            console.log("e = ", e);
        })
    }

    return (
        <Container maxWidth="lg" sx={{ mt: "30px", pt: "30px", pb: "100px"}}>
            <Typography fontFamily="'Russo one'" textAlign="center" variant="h4">Gang Information</Typography>
            <Container sx={{ mt: "20px" }}>
                <Container disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <TextField variant='outlined' label="Gang Name (Optional)" sx={{ width: "80%"}} onChange={handleGangNameChange}/>
                    <Button variant='contained' sx={{ width: "15%", height: "40px" }} disabled={gangNameSaveButtonDisabled}>Save</Button>
                </Container>
            </Container>

            <Container sx={{ mt: "20px" }}>
                <Typography variant='h4' >Members:</Typography>
                <Box sx={{width: "100%", height: "200px", border: "1px solid red"}}>
                    <MembersTable/>
                </Box>
                <Typography variant='h6'>No members have been added yet. Please use the form below to add memebers to the gang.</Typography>

                <Container disableGutters maxWidth="sm" sx={{ ml: "0", mr: "auto" }}>
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
                                    <TextField name='dayRate' label="Day Rate £" onChange={handleChange} fullWidth type="number"/>
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
