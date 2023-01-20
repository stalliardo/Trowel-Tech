import React, { useState} from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import ExtendableTable from '../table/ExtendableTable'



const PendingInvitations = () => {
    const [tableData, setTableData] = useState({
        head: ["Recipient Name", "Senders Name", "Status", "Actions"],
        rows: [{name: "Jamie Gibbs", sender: "Darren Stallard", status: "Pending"}]
    })
    const handleCancelInvitation = () => {
        console.log("cancel invita called");
    }
    return (
        <Container maxWidth="xl" sx={{ mt: "30px", padding: "20px", backgroundColor: "backDrop.dark", borderRadius: "5px" }}>
            <Box textAlign="left">
                <Typography variant='h5' textAlign="left" mb="10px">Pending Invitations</Typography>
                {/* <Paper elevation={4}> */}
                    <ExtendableTable data={tableData} deleteButton={true} handleDelete={handleCancelInvitation}/>
                   
                {/* </Paper> */}
            </Box>
        </Container>
    )
}

export default PendingInvitations