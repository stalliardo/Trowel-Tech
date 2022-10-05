import { Avatar, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Container } from '@mui/system'
import React, { useState } from 'react'

const GangInformation = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <Container maxWidth="lg" sx={{ mt: "30px", border: "1px solid red" }}>
            <Typography textAlign="center" variant="h4">Gang Information</Typography>
            {/* <Typography textAlign="center" variant="subtitle1"></Typography> */}

            <Container sx={{ mt: "20px" }}>
                {/* <Typography variant='subtitle2' fontSize="20px">Gang Name:</Typography> */}
                <Container disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <TextField variant='outlined' label="Gang Name (Optional)" sx={{ width: "60%" }} />
                    <Button variant='contained' sx={{ width: "15%" }}>Save</Button>
                </Container>
            </Container>


            <Container sx={{ border: "1px solid green", mt: "20px" }}>
                <Typography variant='subtitle2' fontSize="20px">Members:</Typography>
                <Typography>No members have been added yet. Please use the form below to add memebers to the gang.</Typography>

                <Container disableGutters maxWidth="sm" sx={{ml: "0", mr: "auto"}}>
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
                                    <TextField name='memberType' label="Member Type" onChange={handleChange} fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='dayRate' label="Day Rate" onChange={handleChange}  fullWidth />
                                </Grid>
                            </Grid>

                            <Button type='submit' variant='contained' fullWidth sx={{ mt: "20px" }} disabled={buttonDisabled}>
                                {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Save"}
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Container>
        </Container>
    )
}

export default GangInformation