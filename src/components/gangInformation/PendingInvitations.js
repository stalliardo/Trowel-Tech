import React from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

const PendingInvitations = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: "30px", padding: "20px", backgroundColor: "backDrop.dark", borderRadius: "5px" }}>
            <Box textAlign="left">
                <Typography variant='h5' textAlign="left" mb="10px">Pending Invitations</Typography>
                <Paper elevation={4}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
                        {/* <TextField label="Members Username" onChange={handleChange} sx={{ width: "30%" }} /> */}
                        {/* <Button variant="contained" disabled={searchButtonDisabled} onClick={onSearch} sx={{ height: "40px" }}>Search</Button> */}
                    </Box>
                   
                </Paper>
            </Box>
        </Container>
    )
}

export default PendingInvitations