import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExtendableTable from '../table/ExtendableTable'

import { deleteInvitation } from '../../services/database/gangInformation'
import { filterInvitations } from '../../features/gangInfo/gangInformationSlice'

const PendingInvitations = ({ invitations }) => {
    const [tableData, setTableData] = useState({
        head: ["Recipient Name", "Senders Name", "Status", "Actions"],
        rows: [{ name: "Jamie Gibbs", sender: "Darren Stallard", status: "Pending" }]
    });
    const [formattedData, setFormattedData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const data = [];
        
        invitations.forEach((invite) => {
            data.push({
                name: invite.recipientsName,
                sender: invite.sendersName,
                status: invite.status,
                recipientId: invite.recipientId,
                gangId: invite.gangId,
                id: invite.id
            });
        });

        setFormattedData(data);

    }, [invitations]);

    useEffect(() => {
        setTableData({
            head: tableData.head,
            rows: formattedData
        });
    }, [formattedData]);

    const handleDelete = (row) => {
        const confirmation = window.confirm("Are you sure you want to delete this invite? The recipient will no longer see your invitation!");

        if(confirmation) {
            deleteInvitation(row.id).then(() => {
                dispatch(filterInvitations(row.id));
            })
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: "30px", padding: "20px", backgroundColor: "backDrop.dark", borderRadius: "5px" }}>
            <Box textAlign="left">
                <Typography variant='h5' textAlign="left" mb="10px">Pending Invitations</Typography>
                <ExtendableTable data={tableData} deleteButton={true} handleDelete={handleDelete} disallowedKeys={["gangId", "recipientId"]} />
            </Box>
        </Container>
    )
}

export default PendingInvitations;