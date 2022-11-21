import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'

import React from 'react'

import { useNavigate } from 'react-router-dom'

const JoinOrCreatePrompt = () => {
    const navigate = useNavigate();

    const onCreateClicked = () => {
        navigate("gang-information");
    }   

    const onJoinClicked = () => {
    }

    return (
        <Container maxWidth="lg" sx={{ mt: "60px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h3" >Welcome to Trowel Tech</Typography>
            <Typography variant="h5" mt="20px" >Lets get you set up. If creating a gang press the button below.</Typography>
            <Button variant='contained' sx={{ width: "220px", my: "30px" }} onClick={onCreateClicked}>Create Gang</Button>
            <Typography variant="h5" textAlign="start" mt="30px">Or join an existing gang. If using this option you should have received an invite code.</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", width: "60%", mt: "20px" }}>
                <Typography textAlign="left">Invite Code</Typography>
                <TextField variant='outlined' sx={{ backgroundColor: "white" }} />
                <Button variant='contained' sx={{ width: "220px", my: "30px" }} onClick={onJoinClicked}>Submit</Button>
            </Box>
        </Container>
    )
}

export default JoinOrCreatePrompt