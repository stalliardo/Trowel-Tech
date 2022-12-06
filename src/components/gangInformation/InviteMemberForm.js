import React, { useState } from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

const InviteMemberForm = () => {

    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        if(e.target.value.length > 2) {
            setSearchButtonDisabled(false);
        } else {
            setSearchButtonDisabled(true);
        }

        setSearchValue(e.target.value);
    }

    const onSearch = () => {
        // TODO
        
    }
    
    return (
        <Container maxWidth="xl" sx={{ mt: "30px", padding: "20px", backgroundColor: "backDrop.dark", borderRadius: "5px" }}>
            <Box textAlign="left">
                <Typography variant='h5' textAlign="left" mb="10px">Invite Members</Typography>
                <Paper elevation={4}>
                    <Box sx={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
                        <TextField label="Members Username" onChange={handleChange} sx={{width: "30%"}}/>
                        <Button variant="contained" disabled={searchButtonDisabled} onClick={onSearch}>Search</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default InviteMemberForm