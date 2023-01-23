import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'

import React from 'react'

import { useNavigate } from 'react-router-dom'
import PageTitle from '../elements/PageTitle'

const JoinOrCreatePrompt = () => {
    const navigate = useNavigate();

    const onCreateClicked = () => {
        navigate("members");
    }   

    return (
        <Container maxWidth="xl" sx={{ mt: "60px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <PageTitle title="Welcome to Trowel Tech!"/>
            <Typography variant="p" mt="20px" fontSize="20px">Lets get you set up. If creating a gang press the button below.</Typography>
            <Button variant='contained' sx={{ width: "220px", my: "30px" }} onClick={onCreateClicked}>Create Gang</Button>
            <Typography variant="p" textAlign="start" mt="10px" fontSize="20px">Or join an existing gang. Ask one of the members to send you an invite via your username. Any invites will be displayed in the dropdown when clicking your initials in the nav bar.</Typography>
            {/* <Box sx={{ display: "flex", flexDirection: "column", width: "60%", mt: "20px" }}>
                <Typography textAlign="left">Invite Code</Typography>
                <TextField variant='outlined' sx={{ backgroundColor: "white" }} />
                <Button variant='contained' sx={{ width: "220px", my: "30px" }} onClick={onJoinClicked}>Submit</Button>
            </Box> */}
        </Container>
    )
}

export default JoinOrCreatePrompt