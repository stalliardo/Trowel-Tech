import { Avatar, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Container } from '@mui/system'
import React, { useState } from 'react'
import SelectMenu from '../selectMenu/SelectMenu';

const GangInformation = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [skill, setSkill] = useState("");
    const skillMenuItems = ["Bricklayer", "Hod Carrier"];

    const [memberType, setMemberType] = useState("");
    const memberTypeOptions = ["Split", "Day Rate"];

    const handleSkillChange = (event) => {
        console.log("skill changed to: ", event.target.value);
        setSkill(event.target.value);
    }

    const handleMemberTypeChange = (event) => {
        setMemberType(event.target.value);
    }


    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <Container maxWidth="lg" sx={{ mt: "30px", pt: "30px", pb: "100px"}}>
            <Typography fontFamily="'Russo one'" textAlign="center" variant="h4">Gang Information</Typography>
            <Container sx={{ mt: "20px" }}>
                <Container disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <TextField variant='outlined' label="Gang Name (Optional)" sx={{ width: "80%"}} />
                    <Button variant='contained' sx={{ width: "15%", height: "40px" }}>Save</Button>
                </Container>
            </Container>

            <Container sx={{ mt: "20px" }}>
                <Typography variant='h4' >Members:</Typography>
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
                                    value={memberType} 
                                    label="Member Type" 
                                    menuItems={memberTypeOptions} 
                                    handleChange={handleMemberTypeChange}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='dayRate' label="Day Rate" onChange={handleChange} fullWidth type="number"/>
                                </Grid>
                                
                                <Grid item xs={12}>
                                <SelectMenu 
                                    value={skill} 
                                    label="Skill" 
                                    menuItems={skillMenuItems} 
                                    handleChange={handleSkillChange}
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
