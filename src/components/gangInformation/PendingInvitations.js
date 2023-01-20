import React, { useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExtendableTable from '../table/ExtendableTable'

const PendingInvitations = ({ invitations }) => {

    const [tableData, setTableData] = useState({
        head: ["Recipient Name", "Senders Name", "Status", "Actions"],
        rows: [{ name: "Jamie Gibbs", sender: "Darren Stallard", status: "Pending" }]
    });

    const handleCancelInvitation = () => {
        console.log("cancel invita called");
    };

    useEffect(() => {
        const formattedData = [];

        invitations.forEach((invite) => {
            formattedData.push({
                name: invite.recipientsName,
                sender: invite.sendersName,
                status: invite.status,
                recipientId: invite.recipientsId,
                gangId: invite.gangId
            })
        });

        setTableData({
            head: tableData.head,
            rows: formattedData
        });
    }, [invitations])

    return (
        <Container maxWidth="xl" sx={{ mt: "30px", padding: "20px", backgroundColor: "backDrop.dark", borderRadius: "5px" }}>
            <Box textAlign="left">
                <Typography variant='h5' textAlign="left" mb="10px">Pending Invitations</Typography>
                <ExtendableTable data={tableData} deleteButton={true} handleDelete={handleCancelInvitation} disallowedKeys={["gangId", "recipientId"]} />
            </Box>
        </Container>
    )
}

export default PendingInvitations